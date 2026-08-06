import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  AREAS,
  BEHAVIOURS,
  TARGETS,
  TIE_ORDER,
  buildFormUrl,
  type AreaId,
  type Behaviour,
  type Question,
  type Target,
} from "@/lib/bf-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Behaviour First Target Picker | Find your RAISE target area" },
      {
        name: "description",
        content:
          "Answer six questions about what you notice in one group you teach and find the area of practice your RAISE development target should sit in.",
      },
      { property: "og:title", content: "Behaviour First Target Picker" },
      {
        property: "og:description",
        content:
          "A five-minute activity for tutors: name what you're seeing, and find the area your RAISE target should sit in.",
      },
    ],
  }),
  component: Index,
});

type Step =
  | "welcome"
  | "behaviours"
  | "focal"
  | "questions"
  | "evidence"
  | "context"
  | "closecall"
  | "targets"
  | "reflection";

const FREQUENCY = ["Every session", "Most sessions", "Occasionally"];
const WHO = [
  "The same few individuals every time",
  "A shifting mix, different learners each session",
  "Most of the group at once",
];

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-background px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto w-full max-w-2xl">{children}</div>
    </main>
  );
}

function Heading({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <header className="mb-7">
      <h1 className="bf-display text-2xl leading-tight text-foreground sm:text-3xl">{children}</h1>
      {sub ? <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{sub}</p> : null}
    </header>
  );
}

function Card({
  selected,
  onClick,
  disabled,
  children,
}: {
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={!!selected}
      className={[
        "w-full rounded-xl border p-5 text-left text-sm leading-relaxed transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        selected
          ? "border-accent bg-accent/15 text-foreground shadow-sm"
          : "border-border bg-card text-foreground hover:border-primary/40 hover:shadow-sm",
        disabled && !selected ? "cursor-not-allowed opacity-45 hover:border-border hover:shadow-none" : "",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function PrimaryButton({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="w-full rounded-xl bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
    >
      {children}
    </button>
  );
}

function Index() {
  const [step, setStep] = useState<Step>("welcome");
  const [selected, setSelected] = useState<string[]>([]);
  const [focalId, setFocalId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, AreaId>>({});
  const [qIndex, setQIndex] = useState(0);
  const [evidence, setEvidence] = useState("");
  const [notes, setNotes] = useState("");
  const [frequency, setFrequency] = useState<string | null>(null);
  const [who, setWho] = useState<string | null>(null);
  const [chosenArea, setChosenArea] = useState<AreaId | null>(null);
  const [chosenTarget, setChosenTarget] = useState<Target | null>(null);

  const focal = useMemo(
    () => BEHAVIOURS.find((b) => b.id === focalId) ?? null,
    [focalId],
  );
  const secondary = useMemo<Behaviour | null>(() => {
    if (!focalId) return null;
    const rest = BEHAVIOURS.filter((b) => selected.includes(b.id) && b.id !== focalId);
    return rest[0] ?? null;
  }, [focalId, selected]);

  const questionPlan = useMemo(() => {
    const plan: { q: Question; weight: number }[] = [];
    if (focal) focal.questions.forEach((q) => plan.push({ q, weight: 3 }));
    if (secondary) secondary.questions.slice(0, 2).forEach((q) => plan.push({ q, weight: 1 }));
    return plan;
  }, [focal, secondary]);

  const result = useMemo(() => {
    const totals = {} as Record<AreaId, number>;
    const focalTotals = {} as Record<AreaId, number>;
    TIE_ORDER.forEach((a) => {
      totals[a] = 0;
      focalTotals[a] = 0;
    });
    BEHAVIOURS.filter((b) => selected.includes(b.id)).forEach((b) =>
      b.priors.forEach((a) => (totals[a] += 1)),
    );
    questionPlan.forEach((item, i) => {
      const a = answers[i];
      if (!a) return;
      totals[a] += item.weight;
      if (item.weight === 3) focalTotals[a] += item.weight;
    });
    const ranked = [...TIE_ORDER].sort((x, y) => {
      if (totals[y] !== totals[x]) return totals[y] - totals[x];
      if (focalTotals[y] !== focalTotals[x]) return focalTotals[y] - focalTotals[x];
      return TIE_ORDER.indexOf(x) - TIE_ORDER.indexOf(y);
    });
    const top = ranked[0] as AreaId;
    const runnerUp = ranked[1] as AreaId;
    return { top, runnerUp, margin: totals[top] - totals[runnerUp] };

  }, [selected, answers, questionPlan]);

  function toggleBehaviour(id: string) {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length >= 5
          ? prev
          : [...prev, id],
    );
  }

  function finishContext() {
    if (result.margin <= 2) setStep("closecall");
    else {
      setChosenArea(result.top);
      setStep("targets");
    }
  }

  const key = `${step}-${qIndex}`;

  return (
    <Shell>
      <div key={key} className="bf-step">
        {step === "welcome" && (
          <>
            <Heading>Behaviour First Target Picker</Heading>
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
              <p>
                This activity helps you find the area your RAISE target should sit in.
              </p>
              <p>
                You'll answer a few questions about what you notice in one group you teach. It takes
                about five minutes.
              </p>
              <p>
                At the end you'll get a suggested target to take into the RAISE Target Setting form.
              </p>
            </div>
            <div className="mt-8">
              <PrimaryButton onClick={() => setStep("behaviours")}>Start</PrimaryButton>
            </div>
          </>
        )}

        {step === "behaviours" && (
          <>
            <Heading sub="Think of one group you teach. Choose between three and five that you recognise.">
              What are you seeing?
            </Heading>
            <div className="space-y-3">
              {BEHAVIOURS.map((b) => (
                <Card
                  key={b.id}
                  selected={selected.includes(b.id)}
                  disabled={!selected.includes(b.id) && selected.length >= 5}
                  onClick={() => toggleBehaviour(b.id)}
                >
                  {b.statement}
                </Card>
              ))}
            </div>
            <p className="mt-5 text-xs text-muted-foreground">{selected.length} of 5 selected</p>
            <div className="mt-4">
              <PrimaryButton disabled={selected.length < 3} onClick={() => setStep("focal")}>
                Continue
              </PrimaryButton>
            </div>
          </>
        )}

        {step === "focal" && (
          <>
            <Heading sub="Pick the one that matters most in this group right now.">
              Which of these matters most?
            </Heading>
            <div className="space-y-3">
              {BEHAVIOURS.filter((b) => selected.includes(b.id)).map((b) => (
                <Card
                  key={b.id}
                  selected={focalId === b.id}
                  onClick={() => setFocalId(b.id)}
                >
                  {b.statement}
                </Card>
              ))}
            </div>
            <div className="mt-6">
              <PrimaryButton
                disabled={!focalId}
                onClick={() => {
                  setAnswers({});
                  setQIndex(0);
                  setStep("questions");
                }}
              >
                Continue
              </PrimaryButton>
            </div>
          </>
        )}

        {step === "questions" && questionPlan[qIndex] && (
          <>
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Question {qIndex + 1} of {questionPlan.length}
            </p>
            <Heading>{questionPlan[qIndex].q.stem}</Heading>
            <div className="space-y-3">
              {questionPlan[qIndex].q.options.map((o) => (
                <Card
                  key={o.text}
                  selected={answers[qIndex] === o.area}
                  onClick={() => {
                    setAnswers((prev) => ({ ...prev, [qIndex]: o.area }));
                    setTimeout(() => {
                      if (qIndex + 1 < questionPlan.length) setQIndex(qIndex + 1);
                      else setStep("evidence");
                    }, 180);
                  }}
                >
                  {o.text}
                </Card>
              ))}
            </div>
            {qIndex > 0 && (
              <button
                type="button"
                onClick={() => setQIndex(qIndex - 1)}
                className="mt-6 text-xs text-muted-foreground underline underline-offset-4"
              >
                Back
              </button>
            )}
          </>
        )}

        {step === "evidence" && focal && (
          <>
            <Heading sub={`You said: ${focal.statement} — describe the last time this happened.`}>
              One example
            </Heading>
            <textarea
              value={evidence}
              onChange={(e) => setEvidence(e.target.value)}
              rows={6}
              className="w-full rounded-xl border border-border bg-card p-4 text-sm leading-relaxed text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-ring/40"
              placeholder="What happened, and when?"
            />
            <label className="mt-6 block text-sm font-medium text-foreground">
              Anything else worth noting (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="mt-2 w-full rounded-xl border border-border bg-card p-4 text-sm leading-relaxed text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-ring/40"
            />
            <div className="mt-6">
              <PrimaryButton disabled={evidence.trim().length === 0} onClick={() => setStep("context")}>
                Continue
              </PrimaryButton>
            </div>
          </>
        )}

        {step === "context" && (
          <>
            <Heading>A little context</Heading>
            <p className="mb-3 text-sm font-medium text-foreground">
              How often does this happen with this group?
            </p>
            <div className="space-y-3">
              {FREQUENCY.map((f) => (
                <Card key={f} selected={frequency === f} onClick={() => setFrequency(f)}>
                  {f}
                </Card>
              ))}
            </div>
            <p className="mb-3 mt-8 text-sm font-medium text-foreground">
              When this happens, which learners is it mostly?
            </p>
            <div className="space-y-3">
              {WHO.map((w) => (
                <Card key={w} selected={who === w} onClick={() => setWho(w)}>
                  {w}
                </Card>
              ))}
            </div>
            <div className="mt-6">
              <PrimaryButton disabled={!frequency || !who} onClick={finishContext}>
                Continue
              </PrimaryButton>
            </div>
          </>
        )}

        {step === "closecall" && (
          <>
            <Heading sub="Two areas fit what you've described. Which one is closer to your group?">
              Two areas fit
            </Heading>
            <div className="space-y-3">
              {[result.top, result.runnerUp].map((a) => (
                <Card
                  key={a}
                  selected={chosenArea === a}
                  onClick={() => setChosenArea(a)}
                >
                  <span className="bf-display block text-base text-foreground">{AREAS[a].name}</span>
                  <span className="mt-2 block text-muted-foreground">{AREAS[a].description}</span>
                </Card>
              ))}
            </div>
            <div className="mt-6">
              <PrimaryButton disabled={!chosenArea} onClick={() => setStep("targets")}>
                Continue
              </PrimaryButton>
            </div>
          </>
        )}

        {step === "targets" && chosenArea && (
          <>
            <Heading sub={AREAS[chosenArea].description}>{AREAS[chosenArea].name}</Heading>
            <div className="mb-8 rounded-xl border border-border bg-secondary p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                What good looks like
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground">
                {AREAS[chosenArea].goodLooksLike}
              </p>
            </div>
            <p className="mb-3 text-sm font-medium text-foreground">Choose a target</p>
            <div className="space-y-3">
              {TARGETS[chosenArea].map((t) => (
                <Card
                  key={t.id}
                  selected={chosenTarget?.id === t.id}
                  onClick={() => setChosenTarget(t)}
                >
                  {t.text}
                </Card>
              ))}
            </div>
            <div className="mt-6">
              <PrimaryButton disabled={!chosenTarget} onClick={() => setStep("reflection")}>
                Continue
              </PrimaryButton>
            </div>
          </>
        )}

        {step === "reflection" && chosenArea && chosenTarget && (
          <>
            <Heading>Your target</Heading>
            <div className="rounded-xl border border-accent bg-accent/15 p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-accent-foreground/70">
                {AREAS[chosenArea].name}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-foreground">{chosenTarget.text}</p>
            </div>
            <p className="mt-8 text-sm text-muted-foreground">
              You don't need to answer these now — they're worth sitting with before you meet your
              Innovator.
            </p>
            <ul className="mt-4 space-y-3">
              {chosenTarget.reflections.map((r) => (
                <li
                  key={r}
                  className="rounded-xl border border-border bg-card p-4 text-sm leading-relaxed text-foreground"
                >
                  {r}
                </li>
              ))}
            </ul>
            <a
              href={buildFormUrl(AREAS[chosenArea].name, chosenTarget.text)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 block w-full rounded-xl bg-primary px-6 py-4 text-center text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Open the RAISE Target Setting form
            </a>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Your target will already be filled in. You just need to add your name and department.
            </p>
          </>
        )}
      </div>
    </Shell>
  );
}

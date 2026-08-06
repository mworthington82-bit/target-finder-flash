import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import logoAsset from "@/assets/bradford-college-logo.jpg.asset.json";
import {
  AccessibilityIcon,
  AccessibilityPanel,
  DEFAULT_A11Y,
  TEXT_SCALE,
  type A11ySettings,
} from "@/components/AccessibilityPanel";
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

function SiteHeader({ onOpenPanel }: { onOpenPanel: () => void }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-x-3 gap-y-2 px-4 py-3 sm:px-8">
        <img
          src={logoAsset.url}
          alt="Bradford College"
          className="bf-invert-on-dark h-[1.35em] w-auto max-w-[9rem] shrink object-contain object-left"
        />

        <button
          type="button"
          onClick={onOpenPanel}
          className="inline-flex min-h-11 items-center gap-2 rounded-[12px] border border-border bg-card px-3 py-2 text-sm font-medium text-foreground transition-colors duration-150 hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <AccessibilityIcon className="h-5 w-5" />
          <span>Accessibility</span>
        </button>
      </div>
    </header>
  );
}

function Shell({
  children,
  wide,
  onOpenPanel,
}: {
  children: React.ReactNode;
  wide?: boolean;
  onOpenPanel: () => void;
}) {
  return (
    <div className="relative min-h-dvh bg-background">
      <SiteHeader onOpenPanel={onOpenPanel} />
      <main className="relative min-h-dvh overflow-hidden px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
        <div className="bf-glow pointer-events-none absolute inset-x-0 top-0 h-[420px]" aria-hidden="true" />
        <div className={`relative mx-auto w-full ${wide ? "max-w-3xl" : "max-w-[720px]"}`}>{children}</div>
      </main>
    </div>
  );
}


function Heading({
  children,
  sub,
  size = "md",
}: {
  children: React.ReactNode;
  sub?: string;
  size?: "md" | "lg";
}) {
  return (
    <header className="mb-9">
      <h1
        className={[
          "bf-display text-balance text-foreground",
          size === "lg"
            ? "text-[2.1rem] leading-[1.12] sm:text-[3rem]"
            : "text-[1.75rem] leading-[1.18] sm:text-[2.35rem]",
        ].join(" ")}
      >
        {children}
      </h1>
      {sub ? (
        <p className="mt-4 max-w-[58ch] text-[0.95rem] leading-relaxed text-muted-foreground sm:text-base">
          {sub}
        </p>
      ) : null}
    </header>
  );
}

function CheckMark() {
  return (
    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path
        d="M4 10.5 8.2 14.5 16 6"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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
        "group relative w-full rounded-[13px] border p-5 pr-14 text-left text-[0.95rem] leading-relaxed",
        "transition-all duration-150 ease-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        selected
          ? "border-accent bg-accent/8 text-foreground shadow-[0_2px_10px_-6px_color-mix(in_oklab,var(--accent)_60%,transparent)]"
          : "border-border bg-card text-foreground hover:-translate-y-0.5 hover:border-accent/45 hover:shadow-[0_6px_18px_-14px_var(--foreground)]",
        disabled && !selected ? "cursor-not-allowed opacity-40 hover:translate-y-0 hover:border-border hover:shadow-none" : "",
      ].join(" ")}
    >
      {children}
      <span
        className={[
          "absolute right-4 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full border transition-all duration-150",
          selected
            ? "border-accent bg-accent text-accent-foreground opacity-100"
            : "border-border bg-transparent text-transparent opacity-0 group-hover:opacity-40",
        ].join(" ")}
        aria-hidden="true"
      >
        <CheckMark />
      </span>
    </button>
  );
}

function ProgressBar({ current, total }: { current: number; total: number }) {
  return (
    <div className="mb-10 flex items-center gap-4">
      <div
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={current}
        aria-valuetext={`Question ${current} of ${total}`}
        aria-label="Progress through the questions"
        className="h-[3px] w-full overflow-hidden rounded-full bg-border"
      >
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-300 ease-out"
          style={{ width: `${(current / total) * 100}%` }}
        />
      </div>

      <span className="shrink-0 text-xs font-medium tabular-nums tracking-wide text-muted-foreground">
        {current} of {total}
      </span>
    </div>
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
      className="w-full rounded-[13px] bg-accent px-7 py-4 text-sm font-medium tracking-wide text-accent-foreground transition-all duration-150 hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:bg-primary/15 disabled:text-muted-foreground sm:w-auto"
    >
      {children}
    </button>
  );
}


function Index() {
  const [a11y, setA11y] = useState<A11ySettings>(DEFAULT_A11Y);
  const [panelOpen, setPanelOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setA11y((prev) => ({ ...prev, reduceMotion: true }));
    }
  }, []);

  useEffect(() => {
    const el = document.documentElement;
    el.style.fontSize = `${TEXT_SCALE[a11y.textSize] * 100}%`;
    el.dataset["bfBg"] = a11y.background;
    el.dataset["bfSpacing"] = a11y.spacing;
    el.dataset["bfFont"] = a11y.typeface;
    el.dataset["bfMotion"] = a11y.reduceMotion ? "reduce" : "full";
  }, [a11y]);

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
    <>
      <AccessibilityPanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        settings={a11y}
        onChange={setA11y}
      />
      <Shell wide={step === "targets"} onOpenPanel={() => setPanelOpen(true)}>
      <div key={key} className="bf-step">

        {step === "welcome" && (
          <>
            <div className="pt-6 sm:pt-12">
              <Heading size="lg">Behaviour First Target Picker</Heading>
            </div>
            <div className="max-w-[54ch] space-y-6 text-base leading-8 text-muted-foreground sm:text-[1.0625rem]">
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
            <div className="mt-12">
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
            <ProgressBar current={qIndex + 1} total={questionPlan.length} />
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
              className="w-full rounded-[13px] border border-border bg-card p-5 text-[0.95rem] leading-relaxed text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-accent focus:ring-2 focus:ring-ring/30"
              placeholder="What happened, and when?"
            />
            <label className="mt-8 block text-sm font-medium text-foreground">
              Anything else worth noting (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="mt-3 w-full rounded-[13px] border border-border bg-card p-5 text-[0.95rem] leading-relaxed text-foreground outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-ring/30"
            />
            <div className="mt-10">
              <PrimaryButton disabled={evidence.trim().length === 0} onClick={() => setStep("context")}>
                Continue
              </PrimaryButton>
            </div>
          </>
        )}

        {step === "context" && (
          <>
            <Heading>A little context</Heading>
            <p className="mb-4 text-sm font-medium text-foreground">
              How often does this happen with this group?
            </p>
            <div className="space-y-3">
              {FREQUENCY.map((f) => (
                <Card key={f} selected={frequency === f} onClick={() => setFrequency(f)}>
                  {f}
                </Card>
              ))}
            </div>
            <p className="mb-4 mt-12 text-sm font-medium text-foreground">
              When this happens, which learners is it mostly?
            </p>
            <div className="space-y-3">
              {WHO.map((w) => (
                <Card key={w} selected={who === w} onClick={() => setWho(w)}>
                  {w}
                </Card>
              ))}
            </div>
            <div className="mt-10">
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
                  <span className="bf-display block text-lg text-foreground">{AREAS[a].name}</span>
                  <span className="mt-2 block text-muted-foreground">{AREAS[a].description}</span>
                </Card>
              ))}
            </div>
            <div className="mt-10">

              <PrimaryButton disabled={!chosenArea} onClick={() => setStep("targets")}>
                Continue
              </PrimaryButton>
            </div>
          </>
        )}

        {step === "targets" && chosenArea && (
          <>
            <Heading size="lg" sub={AREAS[chosenArea].description}>
              {AREAS[chosenArea].name}
            </Heading>
            <div className="mb-12 border-l-2 border-accent py-1 pl-6">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                What good looks like
              </p>
              <p className="mt-3 text-[1.0625rem] leading-8 text-foreground">
                {AREAS[chosenArea].goodLooksLike}
              </p>
            </div>
            <p className="mb-4 text-sm font-medium text-foreground">Choose a target</p>
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
            <div className="mt-10">
              <PrimaryButton disabled={!chosenTarget} onClick={() => setStep("reflection")}>
                Continue
              </PrimaryButton>
            </div>
          </>
        )}

        {step === "reflection" && chosenArea && chosenTarget && (
          <>
            <Heading>Your target</Heading>
            <div className="rounded-r-[13px] border-l-2 border-accent bg-accent/8 py-6 pl-6 pr-6">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                {AREAS[chosenArea].name}
              </p>
              <p className="mt-3 text-[1.0625rem] leading-8 text-foreground">{chosenTarget.text}</p>
            </div>
            <p className="mt-12 text-sm leading-relaxed text-muted-foreground">
              You don't need to answer these now — they're worth sitting with before you meet your
              Innovator.
            </p>
            <ol className="mt-8 space-y-8">
              {chosenTarget.reflections.map((r, i) => (
                <li key={r} className="flex gap-5">
                  <span className="mt-1 shrink-0 text-xs font-medium tabular-nums text-muted-foreground/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[1.0625rem] leading-8 text-foreground">{r}</span>
                </li>
              ))}
            </ol>
            <a
              href={buildFormUrl(AREAS[chosenArea].name, chosenTarget.text)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-12 block w-full rounded-[13px] bg-accent px-6 py-4 text-center text-sm font-medium tracking-wide text-accent-foreground transition-all duration-150 hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Open the RAISE Target Setting form
            </a>
            <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
              Your target will already be filled in. You just need to add your name and department.
            </p>
          </>

        )}
      </div>
      </Shell>
    </>
  );

}

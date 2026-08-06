import { useEffect, useRef } from "react";

export type TextSize = "default" | "large" | "larger" | "largest";
export type Spacing = "default" | "relaxed" | "loose";
export type Background = "paper" | "white" | "cream" | "dark";
export type Typeface = "default" | "dyslexic";

export type A11ySettings = {
  textSize: TextSize;
  spacing: Spacing;
  background: Background;
  typeface: Typeface;
  reduceMotion: boolean;
};

export const DEFAULT_A11Y: A11ySettings = {
  textSize: "default",
  spacing: "default",
  background: "paper",
  typeface: "default",
  reduceMotion: false,
};

export const TEXT_SCALE: Record<TextSize, number> = {
  default: 1,
  large: 1.15,
  larger: 1.32,
  largest: 1.5,
};

const TEXT_OPTIONS: { value: TextSize; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "large", label: "Large" },
  { value: "larger", label: "Larger" },
  { value: "largest", label: "Largest" },
];

const SPACING_OPTIONS: { value: Spacing; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "relaxed", label: "Relaxed" },
  { value: "loose", label: "Loose" },
];

const BACKGROUND_OPTIONS: { value: Background; label: string; swatch: string }[] = [
  { value: "paper", label: "Paper", swatch: "#FAF8F5" },
  { value: "white", label: "White", swatch: "#FFFFFF" },
  { value: "cream", label: "Soft cream", swatch: "#F6EEDD" },
  { value: "dark", label: "Dark", swatch: "#111C27" },
];

const TYPEFACE_OPTIONS: { value: Typeface; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "dyslexic", label: "Dyslexia-friendly" },
];

export function AccessibilityIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="6.6" r="1.4" fill="currentColor" />
      <path
        d="M6.8 9.4c3.4 1 6.9 1 10.4 0M12 10.2v4.1m0 0-2.1 4.6M12 14.3l2.1 4.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Fieldset({
  legend,
  hint,
  children,
}: {
  legend: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="border-0 p-0">
      <legend className="mb-1 text-sm font-semibold text-foreground">{legend}</legend>
      {hint ? <p className="mb-3 text-xs text-muted-foreground">{hint}</p> : <div className="mb-3" />}
      {children}
    </fieldset>
  );
}

function Choice({
  selected,
  onSelect,
  children,
  label,
}: {
  selected: boolean;
  onSelect: () => void;
  children: React.ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      aria-label={label}
      onClick={onSelect}
      className={[
        "flex min-h-11 items-center gap-2 rounded-[12px] border px-3 py-2 text-left text-sm transition-colors duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        selected
          ? "border-accent bg-accent/10 font-semibold text-foreground"
          : "border-border bg-card text-foreground hover:border-accent/50",
      ].join(" ")}
    >
      {children}
      {selected ? <span aria-hidden="true" className="ml-auto text-accent">✓</span> : null}
    </button>
  );
}

export function AccessibilityPanel({
  open,
  onClose,
  settings,
  onChange,
}: {
  open: boolean;
  onClose: () => void;
  settings: A11ySettings;
  onChange: (next: A11ySettings) => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const root = panelRef.current;
      if (!root) return;
      const focusables = Array.from(
        root.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => !el.hasAttribute("disabled"));
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previous?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  const set = <K extends keyof A11ySettings>(key: K, value: A11ySettings[K]) =>
    onChange({ ...settings, [key]: value });

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-foreground/40"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Accessibility settings"
        className="bf-slide-in absolute inset-y-0 right-0 flex w-full max-w-[26rem] flex-col overflow-y-auto border-l border-border bg-card p-6 shadow-2xl sm:p-7"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <h2 className="bf-display text-2xl text-foreground">Accessibility</h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-[12px] border border-border px-3 text-sm text-foreground transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
          >
            <span aria-hidden="true">✕</span>
            <span>Close</span>
          </button>
        </div>

        <div className="space-y-7">
          <Fieldset legend="Text size" hint="Make all text bigger or smaller.">
            <div role="radiogroup" aria-label="Text size" className="grid grid-cols-2 gap-2">
              {TEXT_OPTIONS.map((o) => (
                <Choice
                  key={o.value}
                  label={o.label}
                  selected={settings.textSize === o.value}
                  onSelect={() => set("textSize", o.value)}
                >
                  {o.label}
                </Choice>
              ))}
            </div>
          </Fieldset>

          <Fieldset legend="Line spacing" hint="Add more space between lines of text.">
            <div role="radiogroup" aria-label="Line spacing" className="grid grid-cols-2 gap-2">
              {SPACING_OPTIONS.map((o) => (
                <Choice
                  key={o.value}
                  label={o.label}
                  selected={settings.spacing === o.value}
                  onSelect={() => set("spacing", o.value)}
                >
                  {o.label}
                </Choice>
              ))}
            </div>
          </Fieldset>

          <Fieldset legend="Background" hint="Change the page colours.">
            <div role="radiogroup" aria-label="Background" className="grid grid-cols-2 gap-2">
              {BACKGROUND_OPTIONS.map((o) => (
                <Choice
                  key={o.value}
                  label={o.label}
                  selected={settings.background === o.value}
                  onSelect={() => set("background", o.value)}
                >
                  <span
                    aria-hidden="true"
                    className="h-5 w-5 shrink-0 rounded-full border border-border"
                    style={{ background: o.swatch }}
                  />
                  <span>{o.label}</span>
                </Choice>
              ))}
            </div>
          </Fieldset>

          <Fieldset legend="Typeface" hint="Switch to a font that some people find easier to read.">
            <div role="radiogroup" aria-label="Typeface" className="grid gap-2">
              {TYPEFACE_OPTIONS.map((o) => (
                <Choice
                  key={o.value}
                  label={o.label}
                  selected={settings.typeface === o.value}
                  onSelect={() => set("typeface", o.value)}
                >
                  {o.label}
                </Choice>
              ))}
            </div>
          </Fieldset>

          <Fieldset legend="Reduce motion" hint="Turn off screen transitions and hover movement.">
            <button
              type="button"
              role="switch"
              aria-checked={settings.reduceMotion}
              onClick={() => set("reduceMotion", !settings.reduceMotion)}
              className="flex min-h-11 w-full items-center justify-between gap-3 rounded-[12px] border border-border bg-card px-3 py-2 text-sm text-foreground transition-colors hover:border-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
            >
              <span>{settings.reduceMotion ? "On" : "Off"}</span>
              <span
                aria-hidden="true"
                className={[
                  "relative h-6 w-11 shrink-0 rounded-full border transition-colors",
                  settings.reduceMotion ? "border-accent bg-accent" : "border-border bg-muted",
                ].join(" ")}
              >
                <span
                  className={[
                    "absolute top-0.5 h-4 w-4 rounded-full bg-card transition-[left]",
                    settings.reduceMotion ? "left-[1.4rem]" : "left-0.5",
                  ].join(" ")}
                />
              </span>
            </button>
          </Fieldset>
        </div>

        <button
          type="button"
          onClick={() => onChange({ ...DEFAULT_A11Y, reduceMotion: settings.reduceMotion })}
          className="mt-8 self-start rounded-[8px] px-1 py-1 text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
        >
          Reset to default
        </button>
      </div>
    </div>
  );
}

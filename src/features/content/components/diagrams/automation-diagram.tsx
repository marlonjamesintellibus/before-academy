"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";

/**
 * Automation: a trigger starts a fixed chain; each step follows the last with
 * no judgment anywhere (design-system v3 diagram language).
 */
const STEPS = ["Collect the numbers", "Build the report", "Email the team"];

export function AutomationDiagram() {
  const [lit, setLit] = useState(0); // 0 = idle; 1..3 = steps done; 4 = complete
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function trigger() {
    if (lit > 0 && lit <= STEPS.length) return;
    track("diagram_component_opened", { component: "automation-trigger" });
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setLit(STEPS.length + 1);
      return;
    }
    setLit(1);
    STEPS.forEach((_, index) => {
      timers.current.push(setTimeout(() => setLit(index + 2), (index + 1) * 550));
    });
  }

  const done = lit > STEPS.length;

  return (
    <figure
      aria-label="Diagram: a schedule triggers a fixed chain of steps that run one after another"
      className="panel mt-5 p-5"
    >
      <figcaption className="text-caption font-semibold uppercase tracking-wide text-ink-muted">
        A workflow in action
      </figcaption>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-2 rounded-(--radius-chip) bg-navy px-4 py-2 text-caption font-bold text-surface-card">
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <circle cx="7" cy="7" r="6" fill="none" stroke="var(--color-sky)" strokeWidth="1.5" />
            <line x1="7" y1="7" x2="7" y2="3.5" stroke="var(--color-sky)" strokeWidth="1.5" />
            <line x1="7" y1="7" x2="9.5" y2="8" stroke="var(--color-sky)" strokeWidth="1.5" />
          </svg>
          EVERY MONDAY, 9:00
        </span>
        <span aria-hidden="true" className="text-ink-muted">
          →
        </span>
        <ol className="flex flex-1 flex-wrap gap-2">
          {STEPS.map((step, index) => {
            const state = lit > index + 1 ? "done" : lit === index + 1 ? "running" : "waiting";
            return (
              <li
                key={step}
                className={`flex items-center gap-2 rounded-(--radius-control) border px-3 py-2 text-caption font-medium transition-colors duration-(--duration-state) ${
                  state === "done"
                    ? "border-success bg-success-tint text-ink"
                    : state === "running"
                      ? "border-primary bg-primary-tint text-ink"
                      : "border-border bg-surface-card text-ink-muted"
                }`}
              >
                <span aria-hidden="true">
                  {state === "done" ? "✓" : state === "running" ? "•" : index + 1}
                </span>
                {step}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={trigger}
          disabled={lit > 0 && !done}
          className="inline-flex min-h-11 items-center rounded-(--radius-control) border border-primary px-4 py-2 text-body font-semibold text-primary hover:bg-primary-tint disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {done ? "Trigger it again" : "Trigger it now"}
        </button>
        <p className="text-body text-ink-muted" aria-live="polite">
          {done
            ? "Done. Each step followed the last - no decisions were made anywhere."
            : lit > 0
              ? "Running the chain…"
              : "The schedule is the trigger; nothing runs until it fires."}
        </p>
      </div>
    </figure>
  );
}

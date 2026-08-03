"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * The lesson sidebar, shared verbatim between the hand-built first section and
 * the data-driven renderer so the two journeys are identical here rather than
 * lookalikes: desktop = white progress panel (percent, bar, minutes remaining,
 * stage outline, exit); mobile = sticky bar with an Outline toggle.
 */
export function LessonRail({
  stages,
  active,
  completed,
  onSelect,
  variant,
}: {
  stages: readonly { label: string; minutes: number }[];
  active: number;
  completed: number[];
  onSelect: (index: number) => void;
  variant: "mobile" | "desktop";
}) {
  const [outlineOpen, setOutlineOpen] = useState(false);
  const percentage = Math.round((completed.length / stages.length) * 100);
  const minutesRemaining = stages.reduce(
    (total, stage, index) => total + (completed.includes(index) ? 0 : stage.minutes),
    0,
  );

  const outline = (
    <ol className="mt-4 space-y-1" aria-label="Lesson stages">
      {stages.map((stage, index) => {
        const done = completed.includes(index);
        const current = active === index;
        return (
          <li key={stage.label}>
            <button
              type="button"
              aria-current={current ? "step" : undefined}
              onClick={() => {
                onSelect(index);
                setOutlineOpen(false);
              }}
              className={`flex min-h-11 w-full items-center gap-3 rounded-(--radius-control) px-3 py-2 text-left text-body transition-colors focus-visible:outline-2 focus-visible:outline-primary ${
                current
                  ? "bg-primary-tint font-semibold text-primary"
                  : "text-ink-muted hover:bg-surface-alt hover:text-ink"
              }`}
            >
              <span
                aria-hidden="true"
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-caption font-bold ${
                  done
                    ? "bg-success text-white"
                    : current
                      ? "bg-primary text-white"
                      : "bg-surface-alt text-ink-muted"
                }`}
              >
                {done ? "✓" : index + 1}
              </span>
              <span>
                {stage.label}
                <span className="sr-only">{done ? ", completed" : ", not started"}</span>
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );

  if (variant === "mobile") {
    return (
      <nav
        aria-label="Lesson progress"
        className="sticky top-0 z-30 -mx-4 border-y border-border bg-surface-card/95 px-4 py-3 shadow-sm backdrop-blur lg:hidden"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p className="truncate text-caption font-bold text-ink">
              {(stages[active] ?? stages[0])?.label}
            </p>
            <p className="text-caption text-ink-muted">
              Stage {active + 1} of {stages.length} · {percentage}% complete
            </p>
          </div>
          <button
            type="button"
            aria-expanded={outlineOpen}
            aria-controls="mobile-lesson-outline"
            onClick={() => setOutlineOpen((value) => !value)}
            className="min-h-11 rounded-(--radius-control) border border-primary px-3 text-body font-semibold text-primary hover:bg-primary-tint focus-visible:outline-2 focus-visible:outline-primary"
          >
            Outline
          </button>
        </div>
        <div className="progress-track mt-2" aria-hidden="true">
          <div className="progress-fill" style={{ width: `${percentage}%` }} />
        </div>
        <div id="mobile-lesson-outline" hidden={!outlineOpen}>
          {outline}
          <Link
            href="/learn"
            className="mt-3 inline-flex min-h-11 items-center text-body font-semibold text-primary"
          >
            Exit and resume later
          </Link>
        </div>
      </nav>
    );
  }

  return (
    <nav
      aria-label="Lesson progress"
      className="sticky top-6 hidden h-fit w-64 shrink-0 self-start rounded-(--radius-hero) border border-border bg-surface-card p-4 shadow-(--shadow-card) lg:block"
    >
      <p className="eyebrow">Lesson progress</p>
      <p className="mt-2 font-display text-subheading font-bold">{percentage}% complete</p>
      <div className="progress-track mt-3" aria-hidden="true">
        <div className="progress-fill" style={{ width: `${percentage}%` }} />
      </div>
      <p className="mt-2 text-caption text-ink-muted">About {minutesRemaining} min remaining</p>
      {outline}
      <Link
        href="/learn"
        className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-(--radius-control) border border-border px-3 text-body font-semibold text-ink-muted hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
      >
        Exit and resume later
      </Link>
    </nav>
  );
}

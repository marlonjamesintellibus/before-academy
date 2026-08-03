"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { activitySeed } from "@/db/seed/activity-content";
import { CATEGORY_LABELS, SCENARIO_CATEGORIES } from "../activity-types";
import type { ScenarioCategory } from "../activity-types";
import { LESSON_ROUTE } from "@/lib/routes";
import { track } from "@/lib/analytics";

/**
 * Landing demo (experience-plan Phase C): proof before the CTA - real
 * classification scenarios, playable in the hero. The product IS the pitch;
 * the copy just points at it. Two turns are offered before the CTA takes over,
 * because one scenario is a taste and two is a habit.
 */
const DEMO_SCENARIOS = activitySeed.scenarios.slice(0, 3);
const TURNS = 2;

export function LandingDemo({ className = "" }: { className?: string }) {
  const [turn, setTurn] = useState(0);
  const [chosen, setChosen] = useState<ScenarioCategory | null>(null);
  const promptRef = useRef<HTMLParagraphElement>(null);

  const scenario = DEMO_SCENARIOS[turn];
  if (!scenario) return null;

  const correct =
    chosen !== null && (chosen === scenario.correctCategory || scenario.accepted.includes(chosen));
  const lastTurn = turn + 1 >= Math.min(TURNS, DEMO_SCENARIOS.length);

  return (
    <section
      aria-label="Try a real scenario"
      className={`panel p-6 shadow-(--shadow-card-hover) ${className}`}
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="eyebrow">Try one right now</p>
        <p className="text-caption text-ink-muted" aria-live="polite">
          Scenario {turn + 1} of {Math.min(TURNS, DEMO_SCENARIOS.length)}
        </p>
      </div>
      <p ref={promptRef} tabIndex={-1} className="mt-3 text-body font-semibold">
        {scenario.body}
      </p>

      {chosen === null ? (
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Pick the best label">
          {SCENARIO_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => {
                setChosen(category);
                track("interaction_completed", {
                  question_id: "landing-demo",
                  correct:
                    category === scenario.correctCategory || scenario.accepted.includes(category),
                });
              }}
              className="min-h-11 rounded-(--radius-control) border border-primary bg-surface-card px-4 py-2 text-body font-semibold text-primary transition-colors duration-(--duration-state) hover:bg-primary-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {CATEGORY_LABELS[category]}
            </button>
          ))}
        </div>
      ) : (
        <div className="mt-4" aria-live="polite">
          {/* Seed feedback already opens with "Correct." or "Not quite -", so the
              wording carries the verdict and colour only reinforces it. */}
          <p className={`text-body font-semibold ${correct ? "text-success" : "text-warning"}`}>
            {scenario.feedback[chosen]}
          </p>
          {lastTurn ? (
            <>
              <p className="mt-3 text-body text-ink-muted">
                That reasoning, clue by clue and never by label, is the whole skill. Eight more
                scenarios wait inside, with the lesson that makes them easy to read.
              </p>
              <Link
                href={LESSON_ROUTE}
                onClick={() => track("cta_start_clicked", { source: "landing_demo" })}
                className="mt-4 inline-flex min-h-11 items-center rounded-(--radius-control) bg-primary px-5 py-2.5 text-body font-semibold text-surface-card shadow-(--shadow-card) transition-colors duration-(--duration-state) hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Learn to read them all
              </Link>
            </>
          ) : (
            <button
              type="button"
              onClick={() => {
                setTurn(turn + 1);
                setChosen(null);
                requestAnimationFrame(() => promptRef.current?.focus());
              }}
              className="mt-4 inline-flex min-h-11 items-center rounded-(--radius-control) bg-primary px-5 py-2.5 text-body font-semibold text-surface-card shadow-(--shadow-card) transition-colors duration-(--duration-state) hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Try a harder one
            </button>
          )}
        </div>
      )}
    </section>
  );
}

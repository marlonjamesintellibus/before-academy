"use client";

import { useState } from "react";
import Link from "next/link";
import { activitySeed } from "@/db/seed/activity-content";
import { CATEGORY_LABELS, SCENARIO_CATEGORIES } from "../activity-types";
import type { ScenarioCategory } from "../activity-types";
import { LESSON_ROUTE } from "@/lib/routes";
import { track } from "@/lib/analytics";

/**
 * Landing demo (experience-plan Phase C): proof before the CTA - one real
 * classification scenario, playable on the home page. The product IS the
 * pitch; the copy just points at it.
 */
const scenario = activitySeed.scenarios[0];

export function LandingDemo() {
  const [chosen, setChosen] = useState<ScenarioCategory | null>(null);
  if (!scenario) return null;
  const correct =
    chosen !== null && (chosen === scenario.correctCategory || scenario.accepted.includes(chosen));

  return (
    <section aria-label="Try a real scenario" className="panel mt-12 p-6">
      <p className="eyebrow">Try one right now</p>
      <p className="mt-3 text-body font-semibold">{scenario.body}</p>

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
              className="min-h-11 rounded-(--radius-control) border border-primary bg-surface-card px-4 py-2 text-body font-semibold text-primary hover:bg-primary-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {CATEGORY_LABELS[category]}
            </button>
          ))}
        </div>
      ) : (
        <div className="mt-4" aria-live="polite">
          <p className={`text-body font-semibold ${correct ? "text-success" : "text-warning"}`}>
            {correct ? "Correct" : "Not quite"} - {scenario.feedback[chosen]}
          </p>
          <p className="mt-3 text-body text-ink-muted">
            That reasoning - clue by clue, never by label - is the whole skill. Nine more scenarios
            like this one live inside, with the lesson that makes them easy to read.
          </p>
          <Link
            href={LESSON_ROUTE}
            onClick={() => track("cta_start_clicked", { source: "landing_demo" })}
            className="mt-4 inline-flex min-h-11 items-center rounded-(--radius-control) bg-primary px-5 py-2.5 text-body font-semibold text-surface-card shadow-(--shadow-card) hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Learn to read them all
          </Link>
        </div>
      )}
    </section>
  );
}

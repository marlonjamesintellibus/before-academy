"use client";

import { useEffect, useRef, useState } from "react";
import { readDevice } from "@/lib/device-store";
import { track } from "@/lib/analytics";
import { reviewDue } from "../review-schedule";
import type { StoredAssessmentOutcome } from "../types";

/**
 * Skill map (experience-plan Phase C): the Uxcel idea minus gamification.
 * Assessment category results roll up into four learner-facing skills with
 * text-bearing bars - measurable professional identity, no XP.
 */
const SKILLS: { label: string; categories: string[] }[] = [
  {
    label: "System recognition",
    categories: ["traditional_software", "automation", "ai_characteristics"],
  },
  { label: "Combined systems", categories: ["combined_systems"] },
  { label: "Classification in the wild", categories: ["classification"] },
  { label: "Evidence and ambiguity", categories: ["ambiguity", "misconceptions"] },
];

const ASSESSMENT_KEY = "ba.v1.assessment.ai-automation-software";

export function SkillMap() {
  const fired = useRef(false);
  const [outcome, setOutcome] = useState<StoredAssessmentOutcome | null>(null);

  useEffect(() => {
    const stored = readDevice<StoredAssessmentOutcome | null>(
      ASSESSMENT_KEY,
      null,
      (value) =>
        typeof value === "object" &&
        value !== null &&
        (value as StoredAssessmentOutcome).version === 1,
    );
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time post-mount device-storage hydration
    setOutcome(stored);
    if (stored?.categories && !fired.current) {
      fired.current = true;
      track("skill_map_viewed", {});
    }
  }, []);

  if (!outcome?.categories) return null;

  return (
    <section aria-label="Your skill map" className="panel mt-8 p-6">
      <p className="eyebrow">Your skill map</p>
      <p className="mt-2 text-body text-ink-muted">
        Built from your latest graded attempt. Retakes update it - the questions rotate, the skills
        stay comparable.
      </p>
      {reviewDue([outcome.lastAttemptAt]).rusty ? (
        <p className="mt-2 rounded-(--radius-control) bg-primary-tint px-3 py-2 text-caption font-medium text-primary">
          It has been a while since these were exercised - the two-minute review below keeps them
          sharp.
        </p>
      ) : null}
      <ul className="mt-4 flex flex-col gap-3">
        {SKILLS.map((skill) => {
          let correct = 0;
          let total = 0;
          for (const category of skill.categories) {
            const tally = outcome.categories?.[category];
            if (tally) {
              correct += tally.correct;
              total += tally.total;
            }
          }
          if (total === 0) return null;
          const percent = Math.round((correct / total) * 100);
          return (
            <li key={skill.label}>
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-body font-semibold">{skill.label}</span>
                <span className="text-caption text-ink-muted">
                  {correct} of {total} correct
                </span>
              </div>
              <div className="progress-track mt-1" aria-hidden="true">
                <div className="progress-fill" style={{ width: `${percent}%` }} />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

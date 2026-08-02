"use client";

import { useDeviceStore } from "../use-device-store";

/**
 * S02 per-section status chip + per-step microstatus
 * (docs/product/screens/marketing-and-pathway.md). Status is always a word,
 * never colour alone; renders the static default until hydration.
 */
const STATUS_LABEL = {
  not_started: "Not started",
  in_progress: "In progress",
  complete: "Complete",
} as const;

const STATUS_CLASS = {
  not_started: "bg-surface-alt text-ink-muted",
  in_progress: "bg-primary-tint text-primary",
  complete: "bg-success-tint text-success",
} as const;

export function SectionStatusChip() {
  const { hydrated, status } = useDeviceStore();
  const value = hydrated ? status : "not_started";
  return (
    <span
      className={`rounded-(--radius-chip) px-3 py-0.5 text-caption font-semibold ${STATUS_CLASS[value]}`}
    >
      {STATUS_LABEL[value]}
    </span>
  );
}

export function SectionMicrostatus() {
  const { hydrated, snapshot, status } = useDeviceStore();
  if (!hydrated || !snapshot || status === "not_started") return null;

  const parts: string[] = [];
  if (snapshot.lesson) {
    parts.push(`Lesson ${snapshot.lesson.stagesCompleted}/${snapshot.lesson.totalStages}`);
  }
  if (snapshot.activity) {
    parts.push(
      snapshot.activity.completed
        ? "Activity done"
        : `Activity ${snapshot.activity.answered}/${snapshot.activity.total}`,
    );
  }
  if (snapshot.check) {
    parts.push(
      snapshot.check.completed
        ? "Check done"
        : `Check ${snapshot.check.answered}/${snapshot.check.total}`,
    );
  }
  if (snapshot.assessment) {
    parts.push(
      snapshot.assessment.passed
        ? `Assessment passed (${snapshot.assessment.bestScore} of ${snapshot.assessment.total})`
        : `Assessment: ${snapshot.assessment.attempts} ${snapshot.assessment.attempts === 1 ? "attempt" : "attempts"} so far`,
    );
  }
  if (parts.length === 0) return null;

  return <p className="mt-2 text-caption text-ink-muted">{parts.join(" · ")}</p>;
}

"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { removeDevice } from "@/lib/device-store";
import { track } from "@/lib/analytics";

/**
 * Reset pathway progress (product feedback): every ba.v1.* learning key for
 * every section clears in one confirmed action. Destructive never default
 * (interaction-patterns.md); the confirm states exactly what is removed.
 *
 * The first section's keys keep their legacy unscoped names; the other six and
 * the pathway assessment use per-slug scoping (assessmentStorageKeys).
 */
const SCOPED_SLUGS = [
  "what-is-artificial-intelligence",
  "ai-in-everyday-life",
  "what-ai-can-do",
  "what-ai-cannot-reliably-do",
  "myths-and-misconceptions",
  "where-to-go-next",
];

const PATHWAY_SCOPE = "pathway-ai-awareness";

const RESET_KEYS = [
  // Legacy-named keys for the first section.
  "ba.v1.lesson.ai-automation-software",
  "ba.v1.activity",
  "ba.v1.knowledge-check.ai-automation-software",
  "ba.v1.assessment.ai-automation-software",
  "ba.v1.diagnostic.ai-automation-software",
  "ba.v1.confidence.ai-automation-software",
  "ba.v1.review.ai-automation-software",
  "ba.v1.capstone.ai-automation-software",
  "ba.v1.attempt_count",
  "ba.v1.last_combination",
  // Scoped keys for the other six sections.
  ...SCOPED_SLUGS.flatMap((slug) => [
    `ba.v1.lesson.${slug}`,
    `ba.v1.activity.${slug}`,
    `ba.v1.assessment.${slug}`,
    `ba.v1.attempt_count.${slug}`,
    `ba.v1.last_combination.${slug}`,
  ]),
  // The pathway assessment's own scope.
  `ba.v1.assessment.${PATHWAY_SCOPE}`,
  `ba.v1.attempt_count.${PATHWAY_SCOPE}`,
  `ba.v1.last_combination.${PATHWAY_SCOPE}`,
];

export function ResetProgress() {
  const [open, setOpen] = useState(false);

  function reset() {
    for (const key of RESET_KEYS) removeDevice(key);
    track("progress_reset", {});
    setOpen(false);
    window.location.reload();
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-6 min-h-11 text-caption text-ink-muted underline-offset-4 hover:text-danger hover:underline focus-visible:outline-2 focus-visible:outline-primary"
      >
        Reset my pathway progress
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title="Reset the whole pathway?">
        <p className="text-body">
          This removes everything saved on this device for all seven sections: lesson stages,
          activity and check answers, every assessment result including the pathway assessment, the
          skill map, diagnostic, confidence, review schedule, and capstone notes. There is no undo.
        </p>
        <div className="mt-5 flex flex-wrap gap-4">
          <button
            type="button"
            autoFocus
            onClick={() => setOpen(false)}
            className="inline-flex min-h-11 items-center rounded-(--radius-control) bg-primary px-5 py-2.5 text-body font-semibold text-surface-card hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Keep my progress
          </button>
          <button
            type="button"
            onClick={reset}
            className="min-h-11 rounded-(--radius-control) border border-danger px-4 text-body font-semibold text-danger hover:bg-danger-tint focus-visible:outline-2 focus-visible:outline-danger"
          >
            Reset everything
          </button>
        </div>
      </Modal>
    </>
  );
}

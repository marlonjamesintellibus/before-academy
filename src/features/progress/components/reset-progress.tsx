"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import { removeDevice } from "@/lib/device-store";
import { track } from "@/lib/analytics";

/**
 * Reset section progress (product feedback): every ba.v1.* key for the
 * section clears in one confirmed action. Destructive never default
 * (interaction-patterns.md); the confirm states exactly what is removed.
 */
const SECTION_KEYS = [
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
];

export function ResetProgress() {
  const [open, setOpen] = useState(false);

  function reset() {
    for (const key of SECTION_KEYS) removeDevice(key);
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
        Reset my progress for this section
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title="Reset this section?">
        <p className="text-body">
          This removes everything saved on this device for the section: lesson stages, activity and
          check answers, assessment results, the skill map, diagnostic, confidence, review schedule,
          and capstone notes. There is no undo.
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

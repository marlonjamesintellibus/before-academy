"use client";

import { useState } from "react";
import { readDevice, writeDevice } from "@/lib/device-store";
import { track } from "@/lib/analytics";

/**
 * Pre-lesson confidence prompt (docs/product/screens/lesson.md; completes the
 * pre/post pair with the results-screen post prompt). Stored on device so the
 * results screen can show the confidence delta.
 */
const CONFIDENCE_KEY = "ba.v1.confidence.ai-automation-software";

export interface StoredConfidence {
  version: 1;
  pre?: number;
  post?: number;
}

export function readConfidence(): StoredConfidence {
  return readDevice<StoredConfidence>(
    CONFIDENCE_KEY,
    { version: 1 },
    (value) =>
      typeof value === "object" && value !== null && (value as StoredConfidence).version === 1,
  );
}

export function saveConfidence(stage: "pre" | "post", value: number): void {
  const current = readConfidence();
  writeDevice(CONFIDENCE_KEY, { ...current, [stage]: value });
}

export function ConfidencePrompt({ stage }: { stage: "pre" | "post" }) {
  const [value, setValue] = useState<number | null>(() => readConfidence()[stage] ?? null);

  return (
    <fieldset className="mt-6 rounded-(--radius-card) bg-primary-tint p-5">
      <legend className="float-left text-body font-semibold">
        How confident do you feel telling AI, automation and traditional software apart?
      </legend>
      <div
        className="clear-both mt-3 flex items-center gap-2 pt-2"
        role="radiogroup"
        aria-label="Confidence from 1 (not yet) to 5 (very confident)"
      >
        <span className="text-caption text-ink-muted">Not yet</span>
        {[1, 2, 3, 4, 5].map((option) => (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={value === option}
            aria-label={`${option} of 5`}
            onClick={() => {
              setValue(option);
              saveConfidence(stage, option);
              track("confidence_submitted", { value: option, stage });
            }}
            className={`min-h-11 min-w-11 rounded-(--radius-control) border text-body font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
              value === option
                ? "border-primary bg-primary text-surface-card"
                : "border-primary bg-surface-card text-primary hover:bg-sky/40"
            }`}
          >
            {option}
          </button>
        ))}
        <span className="text-caption text-ink-muted">Very</span>
      </div>
      {value !== null ? (
        <p className="mt-2 text-caption text-ink-muted" aria-live="polite">
          Noted - you can change it any time.
        </p>
      ) : null}
    </fieldset>
  );
}

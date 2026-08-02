"use client";

import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { track } from "@/lib/analytics";

export interface PredictionOption {
  text: string;
  correct: boolean;
}

/**
 * PredictionGate (experience-plan Phase B): the learner commits to a
 * prediction BEFORE the interactive reveals - problem first, explanation
 * after. One tap, always answerable from the prompt alone; the acknowledgment
 * never shames a wrong guess (predicting and being wrong is the point).
 */
export function PredictionGate({
  id,
  prompt,
  options,
  revealLabel,
  children,
}: {
  id: string;
  prompt: string;
  options: PredictionOption[];
  /** e.g. "Now test your prediction:" */
  revealLabel?: string;
  children: ReactNode;
}) {
  const [committed, setCommitted] = useState<PredictionOption | null>(null);
  const acknowledgment = useRef<HTMLParagraphElement>(null);

  if (!committed) {
    return (
      <div className="panel mt-5 border-primary/30 bg-primary-tint p-5">
        <p className="text-caption font-bold uppercase tracking-wide text-primary">Predict first</p>
        <p className="mt-2 text-body font-semibold">{prompt}</p>
        <div className="mt-4 flex flex-wrap gap-3" role="group" aria-label={prompt}>
          {options.map((option) => (
            <button
              key={option.text}
              type="button"
              onClick={() => {
                setCommitted(option);
                track("prediction_committed", {
                  diagram: id,
                  prediction: option.text,
                  correct: option.correct,
                });
                requestAnimationFrame(() => acknowledgment.current?.focus());
              }}
              className="min-h-11 rounded-(--radius-control) border border-primary bg-surface-card px-4 py-2 text-body font-semibold text-primary hover:bg-sky/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <p
        ref={acknowledgment}
        tabIndex={-1}
        className="mt-5 rounded-(--radius-control) bg-surface-alt p-3 text-body"
      >
        <strong>Your prediction:</strong> {committed.text}.{" "}
        {committed.correct
          ? "Good instinct - now watch it happen."
          : "A reasonable guess - now see what actually happens."}{" "}
        {revealLabel ?? ""}
      </p>
      {children}
    </div>
  );
}

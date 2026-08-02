"use client";

import { useEffect, useRef, useState } from "react";
import type { InlineCheckContent } from "../inline-checks";
import { track } from "@/lib/analytics";

export function InlineCheck({ content }: { content: InlineCheckContent }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const option = content.options.find((entry) => entry.id === selected);
  const correct = selected === content.correctOptionId;

  useEffect(() => {
    if (submitted) feedbackRef.current?.focus();
  }, [submitted]);

  return (
    <section className="mt-6 rounded-(--radius-card) border border-primary/25 bg-primary-tint p-5">
      <p className="eyebrow">Apply it · quick check</p>
      <h3 className="mt-2 text-body font-semibold text-ink">{content.prompt}</h3>
      <fieldset className="mt-4" disabled={submitted}>
        <legend className="sr-only">Choose the best answer</legend>
        <div className="grid gap-2">
          {content.options.map((entry) => {
            const isSelected = entry.id === selected;
            const isCorrect = entry.id === content.correctOptionId;
            const stateClass = submitted
              ? isCorrect
                ? "border-success bg-success-tint"
                : isSelected
                  ? "border-danger bg-danger-tint"
                  : "border-border bg-surface-card"
              : isSelected
                ? "border-primary bg-surface-card"
                : "border-border bg-surface-card hover:border-primary";
            return (
              <label
                key={entry.id}
                className={`flex min-h-11 cursor-pointer items-start gap-3 rounded-(--radius-control) border px-4 py-3 text-body has-focus-visible:outline-2 has-focus-visible:outline-primary ${stateClass}`}
              >
                <input
                  type="radio"
                  name={content.id}
                  checked={isSelected}
                  onChange={() => setSelected(entry.id)}
                  className="mt-1 accent-primary"
                />
                <span className="flex-1">
                  {entry.text}
                  {submitted && isCorrect ? (
                    <span className="ml-2 text-caption font-bold text-success">Correct answer</span>
                  ) : null}
                  {submitted && isSelected && !isCorrect ? (
                    <span className="ml-2 text-caption font-bold text-danger">Your answer</span>
                  ) : null}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>
      {!submitted ? (
        <button
          type="button"
          disabled={!selected}
          onClick={() => {
            setSubmitted(true);
            track("interaction_completed", { question_id: content.id, correct });
          }}
          className="mt-4 inline-flex min-h-11 items-center rounded-(--radius-control) bg-primary px-5 py-2 text-body font-semibold text-white hover:bg-primary-strong disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Check answer
        </button>
      ) : (
        <div
          ref={feedbackRef}
          tabIndex={-1}
          aria-live="polite"
          className="mt-4 rounded-(--radius-control) bg-surface-card p-4"
        >
          <p className={`font-semibold ${correct ? "text-success" : "text-danger"}`}>
            {correct ? "✓ Correct" : "✗ Not quite"}
          </p>
          <p className="mt-2 text-body text-ink">{option?.feedback}</p>
          <button
            type="button"
            onClick={() => {
              setSelected(null);
              setSubmitted(false);
              track("interaction_retry_selected", { interaction: content.id });
            }}
            className="mt-3 min-h-11 text-body font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-primary"
          >
            Try a different answer
          </button>
        </div>
      )}
    </section>
  );
}

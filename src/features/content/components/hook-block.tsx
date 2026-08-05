"use client";

import { InlineCode } from "@/components/ui/code";
import { useState } from "react";
import { track } from "@/lib/analytics";

/** Hook: one-tap tease (docs/product/screens/lesson.md). Doubt, not fear. */
export function HookBlock({
  prompt,
  choices,
  reveal,
}: {
  prompt: string;
  choices: string[];
  reveal: string;
}) {
  const [answered, setAnswered] = useState<string | null>(null);

  return (
    <div className="rounded-(--radius-hero) border border-primary/30 bg-primary-tint p-5 shadow-(--shadow-card) sm:p-6">
      <p className="text-caption font-bold uppercase tracking-wider text-primary">
        Opening question
      </p>
      <p className="mt-2 text-subheading font-semibold">
        <InlineCode text={prompt} />
      </p>
      <div className="mt-4 flex flex-wrap gap-3" role="group" aria-label={prompt}>
        {choices.map((choice) => (
          <button
            key={choice}
            type="button"
            aria-pressed={answered === choice}
            disabled={answered !== null}
            onClick={() => {
              setAnswered(choice);
              track("hook_answered", { chosen: choice });
              track("interaction_completed", { interaction: "opening-question", chosen: choice });
            }}
            className={`min-h-11 rounded-(--radius-control) border px-4 py-2 text-body font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-default disabled:opacity-70 ${
              answered === choice
                ? "border-primary bg-primary text-white disabled:opacity-100"
                : "border-primary bg-surface-card text-primary hover:bg-sky/40"
            }`}
          >
            <InlineCode text={choice} />
          </button>
        ))}
      </div>
      {answered !== null ? (
        <div
          aria-live="polite"
          className="mt-5 rounded-(--radius-control) bg-surface-card p-4 text-body"
        >
          <p className="font-semibold text-success">
            <span aria-hidden="true">✓</span>{" "}
            {answered === "Can't tell"
              ? "Exactly. That description does not provide enough information."
              : "That is a reasonable first instinct - now test it against the evidence."}
          </p>
          <p className="mt-2 text-ink-muted">
            <InlineCode text={reveal} />
          </p>
          <button
            type="button"
            onClick={() => {
              setAnswered(null);
              track("interaction_retry_selected", { interaction: "opening-question" });
            }}
            className="mt-3 min-h-11 text-body font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-primary"
          >
            Change my answer
          </button>
        </div>
      ) : null}
    </div>
  );
}

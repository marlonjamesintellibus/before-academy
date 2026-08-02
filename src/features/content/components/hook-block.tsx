"use client";

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
    <div className="rounded-(--radius-control) border-2 border-ink bg-accent-tint p-6 shadow-(--shadow-card)">
      <p className="text-subheading font-semibold">{prompt}</p>
      {answered === null ? (
        <div className="mt-4 flex flex-wrap gap-3" role="group" aria-label={prompt}>
          {choices.map((choice) => (
            <button
              key={choice}
              type="button"
              onClick={() => {
                setAnswered(choice);
                track("hook_answered", { chosen: choice });
              }}
              className="min-h-11 rounded-(--radius-control) border border-primary px-4 py-2 text-body font-semibold text-primary hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {choice}
            </button>
          ))}
        </div>
      ) : (
        <p aria-live="polite" className="mt-4 text-body">
          {reveal}
        </p>
      )}
    </div>
  );
}

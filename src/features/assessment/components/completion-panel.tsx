"use client";

import { completionContent } from "@/db/seed/completion-content";

/**
 * Completion experience (authored P1-COM, experience-plan Phase C): passing
 * names the demonstrated ability, never the consumption. The single allowed
 * exclamation mark in the product lives in this headline.
 */
export function CompletionPanel({ perfect }: { perfect: boolean }) {
  return (
    <section
      aria-label="What you can do now"
      className="mt-6 rounded-(--radius-hero) border border-success/30 bg-success-tint p-6"
    >
      <h3 className="font-display text-heading font-bold text-success">
        {perfect ? completionContent.perfectHeadline : completionContent.headline}
      </h3>
      <p className="mt-3 text-body">
        {perfect ? completionContent.perfectMessage : completionContent.message}
      </p>
      <h4 className="mt-5 text-body font-semibold">What you can now do</h4>
      <ul className="mt-2 space-y-2 text-body">
        {completionContent.capabilities.map((capability) => (
          <li key={capability} className="flex gap-2">
            <span aria-hidden="true" className="text-success">
              ✓
            </span>
            {capability}
          </li>
        ))}
      </ul>
      <p className="mt-5 text-body">{completionContent.takeaways}</p>
      <div className="mt-5 rounded-(--radius-card) bg-surface-card p-4">
        <p className="text-caption font-bold uppercase tracking-wide text-ink-muted">
          Take it into the wild
        </p>
        <p className="mt-2 text-body">{completionContent.observationActivity}</p>
      </div>
    </section>
  );
}

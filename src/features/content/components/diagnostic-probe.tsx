"use client";

import { useRef, useState } from "react";
import { diagnosticSeed } from "@/db/seed/diagnostic-content";
import { readDevice, writeDevice } from "@/lib/device-store";
import { track } from "@/lib/analytics";

/**
 * Opening diagnostic (addition A1, experience-plan Phase B): five predict-first
 * items BEFORE the lesson, answered on the authored 3-option intuition scale.
 * Feedback is deferred by design - the probe must not teach the answers; the
 * results screen later shows the pre/post delta. Skippable, never gates.
 */
const DIAGNOSTIC_KEY = "ba.v1.diagnostic.ai-automation-software";

export interface StoredDiagnostic {
  version: 1;
  answers: Record<string, string>;
  correct: number;
  total: number;
  completedAt: string;
}

const CHOICES = ["AI is involved", "No AI involved", "Can't tell from this"] as const;

function isCorrect(choice: string, correctCategory: string, accepted: string[]): boolean {
  const categories = [correctCategory, ...accepted];
  if (choice === "AI is involved") {
    return categories.some((c) => c === "ai_assisted" || c === "combination");
  }
  if (choice === "No AI involved") {
    return categories.some((c) => c === "traditional_software" || c === "automation");
  }
  return categories.includes("not_enough_information");
}

export function readDiagnostic(): StoredDiagnostic | null {
  return readDevice<StoredDiagnostic | null>(
    DIAGNOSTIC_KEY,
    null,
    (value) =>
      typeof value === "object" && value !== null && (value as StoredDiagnostic).version === 1,
  );
}

export function DiagnosticProbe({ onDone }: { onDone?: () => void }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [state, setState] = useState<"offer" | "running" | "done" | "dismissed">(
    readDiagnostic() ? "done" : "offer",
  );
  const heading = useRef<HTMLParagraphElement>(null);

  if (state === "dismissed" || state === "done") return null;

  if (state === "offer") {
    return (
      <div className="panel mt-6 border-primary/30 bg-primary-tint p-5">
        <p className="text-caption font-bold uppercase tracking-wide text-primary">
          Before you start · 1 minute
        </p>
        <p className="mt-2 text-body font-semibold">{diagnosticSeed.intro}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              setState("running");
              requestAnimationFrame(() => heading.current?.focus());
            }}
            className="min-h-11 rounded-(--radius-control) bg-primary px-4 py-2 text-body font-semibold text-surface-card hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Try the five quick reads
          </button>
          <button
            type="button"
            onClick={() => setState("dismissed")}
            className="min-h-11 text-body text-ink-muted underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-primary"
          >
            Skip for now
          </button>
        </div>
      </div>
    );
  }

  const item = diagnosticSeed.items[index];
  if (!item) return null;

  function answer(choice: string) {
    if (!item) return;
    const nextAnswers = { ...answers, [item.id]: choice };
    setAnswers(nextAnswers);
    track("diagnostic_item_answered", { item_id: item.id, chosen: choice });
    if (index + 1 < diagnosticSeed.items.length) {
      setIndex(index + 1);
      requestAnimationFrame(() => heading.current?.focus());
    } else {
      const correct = diagnosticSeed.items.filter((entry) =>
        isCorrect(nextAnswers[entry.id] ?? "", entry.correctCategory, entry.accepted),
      ).length;
      writeDevice(DIAGNOSTIC_KEY, {
        version: 1,
        answers: nextAnswers,
        correct,
        total: diagnosticSeed.items.length,
        completedAt: new Date().toISOString(),
      } satisfies StoredDiagnostic);
      track("diagnostic_completed", { correct, total: diagnosticSeed.items.length });
      setState("done");
      onDone?.();
    }
  }

  return (
    <div className="panel mt-6 p-5">
      <p className="text-caption font-medium text-ink-muted" aria-live="polite">
        Quick read {index + 1} of {diagnosticSeed.items.length} · no feedback yet, just instincts
      </p>
      <p ref={heading} tabIndex={-1} className="mt-3 text-body font-semibold">
        {item.body}
      </p>
      <div className="mt-4 flex flex-wrap gap-3" role="group" aria-label={item.body}>
        {CHOICES.map((choice) => (
          <button
            key={choice}
            type="button"
            onClick={() => answer(choice)}
            className="min-h-11 rounded-(--radius-control) border border-primary bg-surface-card px-4 py-2 text-body font-semibold text-primary hover:bg-primary-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {choice}
          </button>
        ))}
      </div>
    </div>
  );
}

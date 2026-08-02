"use client";

import { useMemo, useState } from "react";
import { track } from "@/lib/analytics";
import { DiagramObservation, DiagramTextAlternative } from "./diagram-parts";
import { PredictionGate } from "./prediction-gate";

const SIGNALS = [
  ["unknown", "Unknown sender", 24],
  ["urgent", "Urgent language", 22],
  ["link", "Contains a suspicious link", 30],
  ["history", "Similar to past spam", 20],
] as const;

export function AiDiagram() {
  const [signals, setSignals] = useState<Record<string, boolean>>({
    unknown: true,
    urgent: true,
    link: false,
    history: true,
  });
  const confidence = useMemo(
    () =>
      Math.min(
        96,
        18 + SIGNALS.reduce((sum, [id, , weight]) => sum + (signals[id] ? weight : 0), 0),
      ),
    [signals],
  );
  const category = confidence >= 60 ? "Likely spam" : "Likely not spam";
  const uncertain = confidence >= 45 && confidence < 75;

  return (
    <figure aria-label="Interactive AI confidence explorer" className="panel mt-5 p-5">
      <figcaption>
        <span className="block text-caption font-semibold uppercase tracking-wide text-ink-muted">
          Confidence explorer
        </span>
        <span className="mt-1 block text-body text-ink-muted">
          Adjust the evidence and watch a simplified prediction change. This is an educational
          model, not a real spam score.
        </span>
      </figcaption>
      <PredictionGate
        id="ai-confidence"
        prompt="A message shows three suspicious signals. Can the model be certain it is spam?"
        options={[
          { text: "Yes - with enough signals it knows", correct: false },
          { text: "No - it can only estimate a likelihood", correct: true },
        ]}
        revealLabel="Adjust the signals and check."
      >
        <p className="mt-4 text-body font-semibold">
          Try it: make the message more or less suspicious.
        </p>
        <div className="mt-4 grid gap-4 md:grid-cols-[1fr_1.15fr]">
          <fieldset className="rounded-(--radius-control) border border-border bg-surface-card p-4">
            <legend className="px-1 text-caption font-bold uppercase tracking-wide text-primary">
              Signals considered
            </legend>
            {SIGNALS.map(([id, label]) => (
              <label key={id} className="flex min-h-11 cursor-pointer items-center gap-3 text-body">
                <input
                  type="checkbox"
                  checked={signals[id] ?? false}
                  onChange={(event) => {
                    setSignals((current) => ({ ...current, [id]: event.target.checked }));
                    track("diagram_component_opened", { component: "ai-signal", signal: id });
                  }}
                  className="h-5 w-5 accent-primary"
                />
                {label}
              </label>
            ))}
          </fieldset>
          <section
            className={`rounded-(--radius-control) border p-5 ${uncertain ? "border-warning bg-warning-tint" : "border-primary bg-primary-tint"}`}
            aria-live="polite"
          >
            <p className="text-caption font-bold uppercase tracking-wide text-ink-muted">
              Prediction
            </p>
            <p className="mt-2 font-display text-heading font-bold">{category}</p>
            <div
              className="mt-4 h-3 overflow-hidden rounded-full bg-surface-card"
              aria-label={`${confidence}% confidence`}
              role="img"
            >
              <div
                className={`h-full ${uncertain ? "bg-warning" : "bg-primary"}`}
                style={{ width: `${confidence}%` }}
              />
            </div>
            <p className="mt-2 text-body font-semibold">{confidence}% confidence</p>
            <p className="mt-3 text-body text-ink-muted">
              Alternative: {category === "Likely spam" ? "not spam" : "spam"} ({100 - confidence}%)
            </p>
            {uncertain ? (
              <p className="mt-3 rounded-(--radius-control) bg-surface-card p-3 text-body">
                <strong>Human review recommended.</strong> The evidence is ambiguous, so acting as
                if the prediction were certain would be risky.
              </p>
            ) : null}
          </section>
        </div>
        <aside className="mt-4 rounded-(--radius-control) bg-surface-alt p-4 text-body">
          <strong>Notice:</strong> this output is a likelihood based on signals associated with past
          examples. It can change, and even a high-confidence prediction can be wrong.
        </aside>
      </PredictionGate>
      <DiagramObservation>
        When the signals changed, did the prediction stay certain? When should a person review it?
      </DiagramObservation>
      <DiagramTextAlternative>
        <p className="mt-2">
          Four adjustable message signals contribute to a simplified spam prediction. The result
          shows a category, confidence, alternative probability, and a human-review warning when
          uncertainty is high.
        </p>
      </DiagramTextAlternative>
    </figure>
  );
}

"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";

/**
 * AI: patterns learned from many examples produce predictions with confidence,
 * and outputs can vary or be wrong by design (design-system v3 diagram language).
 */
const CASES = [
  { input: '"You won a FREE prize, click now!!"', verdict: "Spam", confidence: 96, sure: true },
  { input: '"Lunch tomorrow?"', verdict: "Not spam", confidence: 99, sure: true },
  {
    input: '"Your invoice is attached, please verify"',
    verdict: "Spam",
    confidence: 58,
    sure: false,
  },
] as const;

export function AiDiagram() {
  const [index, setIndex] = useState(-1);
  const current = index >= 0 ? CASES[index % CASES.length] : undefined;

  function classify() {
    if (index === -1) track("diagram_component_opened", { component: "ai-classify" });
    setIndex((value) => value + 1);
  }

  return (
    <figure
      aria-label="Diagram: patterns learned from many examples produce predictions with varying confidence"
      className="panel mt-5 p-5"
    >
      <figcaption className="text-caption font-semibold uppercase tracking-wide text-ink-muted">
        Pattern recognition in action
      </figcaption>

      <svg viewBox="0 0 560 130" role="img" aria-hidden="true" className="mt-3 w-full">
        {/* Example dots feeding the model */}
        {[
          [18, 24],
          [40, 14],
          [34, 44],
          [58, 30],
          [22, 62],
          [52, 58],
          [74, 46],
          [66, 14],
          [88, 26],
          [82, 66],
          [104, 50],
          [98, 12],
          [112, 32],
          [30, 80],
          [70, 82],
          [108, 74],
        ].map(([x, y], dot) => (
          <circle key={dot} cx={x} cy={y ?? 0} r="4" fill="var(--color-sky)" />
        ))}
        <text x="66" y="108" textAnchor="middle" fontSize="11" fill="var(--color-ink-muted)">
          thousands of examples
        </text>

        <line x1="126" y1="48" x2="182" y2="48" stroke="var(--color-sky)" strokeWidth="3" />

        {/* Model */}
        <rect x="182" y="14" width="150" height="72" rx="8" fill="var(--color-navy)" />
        <text
          x="257"
          y="40"
          textAnchor="middle"
          fontSize="12"
          fill="var(--color-sky)"
          fontWeight="700"
        >
          LEARNED PATTERNS
        </text>
        <text x="257" y="60" textAnchor="middle" fontSize="11" fill="#ffffff">
          no rule lists every case;
        </text>
        <text x="257" y="75" textAnchor="middle" fontSize="11" fill="#ffffff">
          the pattern decides
        </text>

        <line x1="332" y1="48" x2="388" y2="48" stroke="var(--color-sky)" strokeWidth="3" />

        {/* Prediction */}
        <rect
          x="388"
          y="14"
          width="164"
          height="72"
          rx="8"
          fill={
            current
              ? current.sure
                ? "var(--color-success-tint)"
                : "var(--color-primary-tint)"
              : "var(--color-surface-alt)"
          }
          stroke={
            current
              ? current.sure
                ? "var(--color-success)"
                : "var(--color-primary)"
              : "var(--color-border)"
          }
          strokeWidth="1"
        />
        <text
          x="470"
          y="42"
          textAnchor="middle"
          fontSize="13"
          fill="var(--color-ink)"
          fontWeight="700"
        >
          {current ? current.verdict : "prediction"}
        </text>
        <text x="470" y="62" textAnchor="middle" fontSize="12" fill="var(--color-ink-muted)">
          {current ? `${current.confidence}% confident` : "with a confidence level"}
        </text>
      </svg>

      <div className="mt-3 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={classify}
          className="inline-flex min-h-11 items-center rounded-(--radius-control) border border-primary px-4 py-2 text-body font-semibold text-primary hover:bg-primary-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {index === -1 ? "Classify a message" : "Classify another"}
        </button>
        <p className="flex-1 text-body text-ink-muted" aria-live="polite">
          {current
            ? current.sure
              ? `${current.input} → ${current.verdict}, ${current.confidence}% confident.`
              : `${current.input} → ${current.verdict}, only ${current.confidence}% confident - a borderline call that could be wrong.`
            : "New message in, best guess out - watch the confidence change."}
        </p>
      </div>
    </figure>
  );
}

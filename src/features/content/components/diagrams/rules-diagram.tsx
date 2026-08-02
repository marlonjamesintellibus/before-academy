"use client";

import { useRef, useState } from "react";
import { track } from "@/lib/analytics";

/**
 * Traditional software: written rules, same input → same output, every time
 * (design-system v3 diagram language). The interaction IS the lesson: run the
 * same input repeatedly and watch the output refuse to change.
 */
export function RulesDiagram() {
  const [runs, setRuns] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function run() {
    if (animating) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (runs === 0) track("diagram_component_opened", { component: "rules-run" });
    if (reduced) {
      setRuns((count) => count + 1);
      return;
    }
    setAnimating(true);
    timer.current = setTimeout(() => {
      setAnimating(false);
      setRuns((count) => count + 1);
    }, 600);
  }

  return (
    <figure
      aria-label="Diagram: written rules turn the same input into the same output every time"
      className="panel mt-5 p-5"
    >
      <figcaption className="text-caption font-semibold uppercase tracking-wide text-ink-muted">
        Rules in action
      </figcaption>

      <svg viewBox="0 0 560 120" role="img" aria-hidden="true" className="mt-3 w-full">
        {/* Input chip */}
        <rect x="8" y="38" width="136" height="44" rx="8" fill="var(--color-primary-tint)" />
        <text
          x="76"
          y="56"
          textAnchor="middle"
          fontSize="13"
          fill="var(--color-ink)"
          fontWeight="600"
        >
          Bill: $120
        </text>
        <text x="76" y="72" textAnchor="middle" fontSize="12" fill="var(--color-ink-muted)">
          Tip: 15%
        </text>

        {/* Flow line */}
        <line x1="144" y1="60" x2="200" y2="60" stroke="var(--color-sky)" strokeWidth="3" />
        <line x1="360" y1="60" x2="416" y2="60" stroke="var(--color-sky)" strokeWidth="3" />

        {/* Rules box */}
        <rect x="200" y="20" width="160" height="80" rx="8" fill="var(--color-navy)" />
        <text
          x="280"
          y="44"
          textAnchor="middle"
          fontSize="12"
          fill="var(--color-sky)"
          fontWeight="700"
        >
          WRITTEN RULES
        </text>
        <text x="280" y="64" textAnchor="middle" fontSize="12" fill="#ffffff">
          total = bill + (bill × tip)
        </text>
        <text x="280" y="82" textAnchor="middle" fontSize="11" fill="var(--color-sky)">
          the same steps, every time
        </text>

        {/* Output chip */}
        <rect
          x="416"
          y="38"
          width="136"
          height="44"
          rx="8"
          fill="var(--color-success-tint)"
          stroke="var(--color-success)"
          strokeWidth="1"
        />
        <text
          x="484"
          y="65"
          textAnchor="middle"
          fontSize="14"
          fill="var(--color-ink)"
          fontWeight="700"
        >
          $138.00
        </text>

        {/* Traveling dot */}
        {animating ? (
          <circle r="6" fill="var(--color-primary)">
            <animate attributeName="cx" from="150" to="480" dur="0.55s" fill="freeze" />
            <animate attributeName="cy" values="60;60" dur="0.55s" fill="freeze" />
          </circle>
        ) : null}
      </svg>

      <div className="mt-3 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={run}
          className="inline-flex min-h-11 items-center rounded-(--radius-control) border border-primary px-4 py-2 text-body font-semibold text-primary hover:bg-primary-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {runs === 0 ? "Run the rules" : "Run it again"}
        </button>
        <p className="text-body text-ink-muted" aria-live="polite">
          {runs === 0
            ? "Same input in, same output out - try it."
            : `Run ${runs} ${runs === 1 ? "time" : "times"} · output was $138.00 every time`}
        </p>
      </div>
    </figure>
  );
}

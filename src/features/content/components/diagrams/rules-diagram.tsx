"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";

/**
 * Traditional software (design-system v3 diagram language): the learner OWNS
 * the input. Change the bill and tip, run the written rules, and the history
 * proves determinism - identical input always lands on the identical output.
 */
const BILLS = [80, 120, 200] as const;
const TIPS = [10, 15, 20] as const;

interface Run {
  bill: number;
  tip: number;
  total: string;
  repeat: boolean;
}

export function RulesDiagram() {
  const [bill, setBill] = useState<number>(120);
  const [tip, setTip] = useState<number>(15);
  const [history, setHistory] = useState<Run[]>([]);
  const [animating, setAnimating] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const latest = history[0];
  const total = (bill * (1 + tip / 100)).toFixed(2);

  function run() {
    if (animating) return;
    if (history.length === 0) {
      track("diagram_component_opened", { component: "rules-run" });
      track("interaction_started", { interaction: "rules-run" });
    } else {
      track("interaction_retry_selected", { interaction: "rules-run" });
    }
    const commit = () => {
      setHistory((entries) => {
        const repeat = entries.some((entry) => entry.bill === bill && entry.tip === tip);
        return [{ bill, tip, total, repeat }, ...entries].slice(0, 4);
      });
      track("interaction_completed", { interaction: "rules-run" });
    };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      commit();
      return;
    }
    setAnimating(true);
    timer.current = setTimeout(() => {
      setAnimating(false);
      commit();
    }, 650);
  }

  return (
    <figure
      aria-label="Interactive diagram: change the input, run the written rules, and identical input always produces identical output"
      className="panel mt-5 p-5"
    >
      <figcaption className="text-caption font-semibold uppercase tracking-wide text-ink-muted">
        Rules in action · you drive
      </figcaption>

      <div className="mt-3 flex flex-wrap gap-x-8 gap-y-3">
        <fieldset>
          <legend className="text-caption font-semibold text-ink-muted">Bill</legend>
          <div className="mt-1 flex gap-1" role="group">
            {BILLS.map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={bill === value}
                onClick={() => setBill(value)}
                className={`min-h-9 rounded-(--radius-control) border px-3 text-caption font-semibold transition-colors duration-(--duration-state) focus-visible:outline-2 focus-visible:outline-primary ${
                  bill === value
                    ? "border-primary bg-primary text-surface-card"
                    : "border-border bg-surface-card text-ink hover:border-primary"
                }`}
              >
                ${value}
              </button>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend className="text-caption font-semibold text-ink-muted">Tip</legend>
          <div className="mt-1 flex gap-1" role="group">
            {TIPS.map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={tip === value}
                onClick={() => setTip(value)}
                className={`min-h-9 rounded-(--radius-control) border px-3 text-caption font-semibold transition-colors duration-(--duration-state) focus-visible:outline-2 focus-visible:outline-primary ${
                  tip === value
                    ? "border-primary bg-primary text-surface-card"
                    : "border-border bg-surface-card text-ink hover:border-primary"
                }`}
              >
                {value}%
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <svg viewBox="0 0 560 132" role="img" aria-hidden="true" className="mt-4 w-full">
        <defs>
          <linearGradient id="rules-box" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-navy)" />
            <stop offset="100%" stopColor="var(--color-navy-soft)" />
          </linearGradient>
        </defs>

        {/* Input card */}
        <rect
          x="8"
          y="34"
          width="140"
          height="56"
          rx="10"
          fill="var(--color-primary-tint)"
          stroke="var(--color-sky)"
        />
        <text
          x="78"
          y="56"
          textAnchor="middle"
          fontSize="13"
          fill="var(--color-ink)"
          fontWeight="700"
        >
          Bill ${bill}
        </text>
        <text x="78" y="76" textAnchor="middle" fontSize="12" fill="var(--color-ink-muted)">
          Tip {tip}%
        </text>

        {/* Flow lines (dashes move only while running) */}
        <line
          x1="148"
          y1="62"
          x2="204"
          y2="62"
          stroke="var(--color-sky)"
          strokeWidth="3"
          className={animating ? "flow-active" : undefined}
        />
        <line
          x1="356"
          y1="62"
          x2="412"
          y2="62"
          stroke="var(--color-sky)"
          strokeWidth="3"
          className={animating ? "flow-active" : undefined}
        />

        {/* Rules box */}
        <rect x="204" y="18" width="152" height="88" rx="10" fill="url(#rules-box)" />
        <text
          x="280"
          y="42"
          textAnchor="middle"
          fontSize="11"
          fill="var(--color-sky)"
          fontWeight="700"
          letterSpacing="1"
        >
          WRITTEN RULES
        </text>
        <text x="280" y="63" textAnchor="middle" fontSize="12" fill="#ffffff">
          total = bill + (bill × tip)
        </text>
        <line x1="224" y1="76" x2="336" y2="76" stroke="var(--color-navy-soft)" strokeWidth="1" />
        <text x="280" y="93" textAnchor="middle" fontSize="10.5" fill="var(--color-sky)">
          no judgment, no learning - just steps
        </text>

        {/* Output card */}
        <rect
          x="412"
          y="34"
          width="140"
          height="56"
          rx="10"
          fill={latest ? "var(--color-success-tint)" : "var(--color-surface-alt)"}
          stroke={latest ? "var(--color-success)" : "var(--color-border)"}
        />
        <text
          x="482"
          y="58"
          textAnchor="middle"
          fontSize="16"
          fill="var(--color-ink)"
          fontWeight="800"
          fontFamily="var(--font-display-family)"
        >
          {latest ? `$${latest.total}` : "?"}
        </text>
        <text x="482" y="78" textAnchor="middle" fontSize="10.5" fill="var(--color-ink-muted)">
          {latest ? "computed by the rules" : "run to find out"}
        </text>

        {/* Traveling pulse */}
        {animating ? (
          <circle r="7" fill="var(--color-primary)" stroke="#ffffff" strokeWidth="2">
            <animate attributeName="cx" from="152" to="478" dur="0.6s" fill="freeze" />
            <animate attributeName="cy" values="62;62" dur="0.6s" fill="freeze" />
          </circle>
        ) : null}
      </svg>

      <div className="mt-2 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={run}
          disabled={animating}
          className="inline-flex min-h-11 items-center rounded-(--radius-control) bg-primary px-4 py-2 text-body font-semibold text-surface-card hover:bg-primary-strong disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {history.length === 0 ? "Run the rules" : "Run it again"}
        </button>
        <p className="text-body text-ink-muted" aria-live="polite">
          {history.length === 0
            ? "Pick a bill and a tip, then run it."
            : "Identical input gives identical output - check the log."}
        </p>
      </div>

      {history.length > 0 ? (
        <ol
          className="mt-3 flex flex-col gap-1 border-t border-border pt-3"
          aria-label="Run history"
        >
          {history.map((entry, index) => (
            <li
              key={`${entry.bill}-${entry.tip}-${index}`}
              className="flex flex-wrap items-center gap-2 text-caption text-ink-muted"
            >
              <span className="font-medium text-ink">
                ${entry.bill} + {entry.tip}% → ${entry.total}
              </span>
              {entry.repeat ? (
                <span className="rounded-(--radius-chip) bg-success-tint px-2 py-0.5 font-semibold text-success">
                  same input, same answer - guaranteed
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      ) : null}
    </figure>
  );
}

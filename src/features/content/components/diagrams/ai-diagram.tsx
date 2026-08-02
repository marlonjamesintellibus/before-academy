"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";

/**
 * AI (design-system v3 diagram language): a mail-triage simulation. Pick a
 * message, the model "thinks", and the verdict lands with a confidence meter.
 * The set includes a borderline call and a confident false positive - because
 * probabilistic systems are sometimes wrong by design.
 */
interface Case {
  id: string;
  from: string;
  text: string;
  verdict: "Spam" | "Not spam";
  confidence: number;
  note?: string;
}

const CASES: Case[] = [
  {
    id: "prize",
    from: "Unknown sender",
    text: "You won a FREE prize, click now!!",
    verdict: "Spam",
    confidence: 96,
  },
  {
    id: "lunch",
    from: "Sam (colleague)",
    text: "Lunch tomorrow?",
    verdict: "Not spam",
    confidence: 99,
  },
  {
    id: "invoice",
    from: "accounts@vendor-mail.com",
    text: "Your invoice is attached, please verify",
    verdict: "Spam",
    confidence: 58,
    note: "A borderline call - the pattern is genuinely ambiguous, and 58% is barely better than a coin flip.",
  },
  {
    id: "gym",
    from: "Your gym",
    text: "This week's class schedule + a member discount",
    verdict: "Spam",
    confidence: 91,
    note: "Confidently wrong: this one is real, but discount wording looks spammy. A false positive - probabilistic systems are sometimes wrong by design.",
  },
];

/** Small feed-forward net rendered as the "model": 3-4-2 nodes. */
const NET = {
  layers: [
    [
      { x: 218, y: 34 },
      { x: 218, y: 64 },
      { x: 218, y: 94 },
    ],
    [
      { x: 272, y: 24 },
      { x: 272, y: 51 },
      { x: 272, y: 78 },
      { x: 272, y: 105 },
    ],
    [
      { x: 326, y: 48 },
      { x: 326, y: 80 },
    ],
  ],
};

export function AiDiagram() {
  const [selected, setSelected] = useState<string | null>(null);
  const [thinking, setThinking] = useState(false);
  const [revealed, setRevealed] = useState<Case | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  function classify(entry: Case) {
    if (thinking) return;
    if (!revealed) track("diagram_component_opened", { component: "ai-classify" });
    setSelected(entry.id);
    setRevealed(null);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setRevealed(entry);
      return;
    }
    setThinking(true);
    timer.current = setTimeout(() => {
      setThinking(false);
      setRevealed(entry);
    }, 800);
  }

  return (
    <figure
      aria-label="Interactive diagram: pick a message and a model trained on many examples predicts spam or not spam with a confidence level; it can be wrong"
      className="panel mt-5 p-5"
    >
      <figcaption className="text-caption font-semibold uppercase tracking-wide text-ink-muted">
        Pattern recognition in action · pick a message
      </figcaption>

      <div className="mt-3 grid gap-4 md:grid-cols-[220px_minmax(0,1fr)]">
        {/* Inbox */}
        <ul className="flex flex-col gap-2" aria-label="Messages to classify">
          {CASES.map((entry) => (
            <li key={entry.id}>
              <button
                type="button"
                aria-label={`Classify: ${entry.text}`}
                aria-pressed={selected === entry.id}
                onClick={() => classify(entry)}
                className={`w-full rounded-(--radius-control) border p-3 text-left transition-colors duration-(--duration-state) focus-visible:outline-2 focus-visible:outline-primary ${
                  selected === entry.id
                    ? "border-primary bg-primary-tint"
                    : "border-border bg-surface-card hover:border-primary"
                }`}
              >
                <span className="block text-caption font-semibold text-ink-muted">
                  {entry.from}
                </span>
                <span className="mt-0.5 block text-caption text-ink">{entry.text}</span>
              </button>
            </li>
          ))}
        </ul>

        <div>
          <svg viewBox="0 0 560 130" role="img" aria-hidden="true" className="w-full">
            <defs>
              <linearGradient id="ai-model" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--color-navy)" />
                <stop offset="100%" stopColor="var(--color-navy-soft)" />
              </linearGradient>
            </defs>

            {/* Training examples cloud */}
            {[
              [22, 30],
              [44, 18],
              [36, 52],
              [62, 38],
              [26, 72],
              [56, 66],
              [78, 52],
              [70, 20],
              [92, 32],
              [86, 74],
              [108, 56],
              [102, 16],
              [116, 38],
              [34, 92],
              [74, 92],
              [112, 84],
            ].map(([x, y], dot) => (
              <circle key={dot} cx={x} cy={y ?? 0} r="3.5" fill="var(--color-sky)" opacity="0.9" />
            ))}
            <text x="70" y="116" textAnchor="middle" fontSize="10.5" fill="var(--color-ink-muted)">
              thousands of past examples
            </text>
            <line
              x1="128"
              y1="64"
              x2="188"
              y2="64"
              stroke="var(--color-sky)"
              strokeWidth="3"
              className={thinking ? "flow-active" : undefined}
            />

            {/* Model card with a small network */}
            <rect x="188" y="8" width="162" height="112" rx="10" fill="url(#ai-model)" />
            {NET.layers.flatMap((layer, layerIndex) =>
              layerIndex < NET.layers.length - 1
                ? layer.flatMap((from) =>
                    (NET.layers[layerIndex + 1] ?? []).map((to, edge) => (
                      <line
                        key={`${layerIndex}-${from.x}-${from.y}-${edge}`}
                        x1={from.x}
                        y1={from.y}
                        x2={to.x}
                        y2={to.y}
                        stroke="var(--color-sky)"
                        strokeWidth="0.8"
                        opacity="0.5"
                      />
                    )),
                  )
                : [],
            )}
            {NET.layers.flat().map((node, nodeIndex) => (
              <circle
                key={nodeIndex}
                cx={node.x}
                cy={node.y}
                r="5"
                fill="var(--color-sky)"
                className={thinking ? "thinking" : undefined}
              />
            ))}
            <text x="269" y="15" textAnchor="middle" fontSize="0" fill="#ffffff">
              model
            </text>

            <line
              x1="350"
              y1="64"
              x2="404"
              y2="64"
              stroke="var(--color-sky)"
              strokeWidth="3"
              className={thinking ? "flow-active" : undefined}
            />

            {/* Verdict card */}
            <rect
              x="404"
              y="18"
              width="148"
              height="92"
              rx="10"
              fill={
                revealed
                  ? revealed.note
                    ? "var(--color-warning-tint)"
                    : "var(--color-success-tint)"
                  : "var(--color-surface-alt)"
              }
              stroke={
                revealed
                  ? revealed.note
                    ? "var(--color-warning)"
                    : "var(--color-success)"
                  : "var(--color-border)"
              }
            />
            <text
              x="478"
              y="46"
              textAnchor="middle"
              fontSize="16"
              fontWeight="800"
              fontFamily="var(--font-display-family)"
              fill="var(--color-ink)"
            >
              {thinking ? "…" : revealed ? revealed.verdict : "verdict"}
            </text>
            {/* Confidence meter */}
            <rect
              x="424"
              y="62"
              width="108"
              height="8"
              rx="4"
              fill="var(--color-sky)"
              opacity="0.5"
            />
            {revealed ? (
              <rect
                x="424"
                y="62"
                width={(108 * revealed.confidence) / 100}
                height="8"
                rx="4"
                fill={revealed.note ? "var(--color-warning)" : "var(--color-success)"}
              />
            ) : null}
            <text x="478" y="90" textAnchor="middle" fontSize="11" fill="var(--color-ink-muted)">
              {revealed ? `${revealed.confidence}% confident` : "confidence"}
            </text>
          </svg>

          <p className="mt-2 min-h-[3.25rem] text-body text-ink-muted" aria-live="polite">
            {thinking
              ? "Matching against learned patterns…"
              : revealed
                ? (revealed.note ??
                  `${revealed.verdict}, ${revealed.confidence}% confident. Same mechanism every time - but the answer is a probability, not a certainty.`)
                : "No rule lists every spam message ever written - the model matches patterns it learned. Pick a message to see a prediction."}
          </p>
        </div>
      </div>
    </figure>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";

/**
 * Automation (design-system v3 diagram language): a trigger fires a fixed
 * chain; a parcel travels the conveyor and every step executes in order.
 * The "unusual data" switch is the teaching twist - the chain runs exactly
 * the same, because automation executes, it never inspects.
 */
const STEPS = [
  { label: "Collect", detail: "pull the numbers" },
  { label: "Build", detail: "fill the report" },
  { label: "Send", detail: "email the team" },
] as const;

const NODE_X = [150, 300, 450];
const NODE_Y = 56;

export function AutomationDiagram() {
  const [stage, setStage] = useState(-1); // -1 idle · 0..2 running step · 3 done
  const [oddData, setOddData] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const running = stage >= 0 && stage < STEPS.length;
  const done = stage >= STEPS.length;

  function trigger() {
    if (running) return;
    track("diagram_component_opened", { component: "automation-trigger", odd_data: oddData });
    track(done ? "interaction_retry_selected" : "interaction_started", {
      interaction: "automation-trigger",
    });
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setStage(STEPS.length);
      track("interaction_completed", { interaction: "automation-trigger" });
      return;
    }
    setStage(0);
    STEPS.forEach((_, index) => {
      timers.current.push(
        setTimeout(
          () => {
            setStage(index + 1);
            if (index === STEPS.length - 1) {
              track("interaction_completed", { interaction: "automation-trigger" });
            }
          },
          (index + 1) * 600,
        ),
      );
    });
  }

  return (
    <figure
      aria-label="Interactive diagram: a schedule triggers a fixed chain of steps that run in order, whatever the data looks like"
      className="panel mt-5 p-5"
    >
      <figcaption className="text-caption font-semibold uppercase tracking-wide text-ink-muted">
        A workflow in action
      </figcaption>

      <svg viewBox="0 0 560 150" role="img" aria-hidden="true" className="mt-3 w-full">
        <defs>
          <linearGradient id="auto-clock" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-navy)" />
            <stop offset="100%" stopColor="var(--color-navy-soft)" />
          </linearGradient>
        </defs>

        {/* Trigger clock */}
        <rect x="8" y="26" width="92" height="60" rx="10" fill="url(#auto-clock)" />
        <circle cx="38" cy="56" r="13" fill="none" stroke="var(--color-sky)" strokeWidth="2" />
        <line
          x1="38"
          y1="56"
          x2="38"
          y2="47"
          stroke="var(--color-sky)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="38"
          y1="56"
          x2="45"
          y2="59"
          stroke="var(--color-sky)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <text x="62" y="52" fontSize="10" fill="var(--color-sky)" fontWeight="700">
          MON
        </text>
        <text x="62" y="66" fontSize="10" fill="#ffffff">
          9:00
        </text>

        {/* Conveyor line */}
        <line
          x1="100"
          y1={NODE_Y}
          x2="520"
          y2={NODE_Y}
          stroke="var(--color-sky)"
          strokeWidth="3"
          className={running ? "flow-active" : undefined}
        />

        {/* Step nodes */}
        {STEPS.map((step, index) => {
          const x = NODE_X[index] ?? 0;
          const isDone = stage > index;
          const isActive = stage === index;
          return (
            <g key={step.label}>
              <circle
                cx={x}
                cy={NODE_Y}
                r="17"
                fill={
                  isDone
                    ? "var(--color-success)"
                    : isActive
                      ? "var(--color-primary)"
                      : "var(--color-surface-card)"
                }
                stroke={
                  isDone
                    ? "var(--color-success)"
                    : isActive
                      ? "var(--color-primary)"
                      : "var(--color-border)"
                }
                strokeWidth="2"
              />
              {isDone ? (
                <path
                  d={`M ${x - 6} ${NODE_Y} l 4.5 4.5 l 8 -8.5`}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                <text
                  x={x}
                  y={NODE_Y + 4}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={isActive ? "#ffffff" : "var(--color-ink-muted)"}
                >
                  {index + 1}
                </text>
              )}
              <text
                x={x}
                y={NODE_Y + 40}
                textAnchor="middle"
                fontSize="12"
                fontWeight="700"
                fill="var(--color-ink)"
              >
                {step.label}
              </text>
              <text
                x={x}
                y={NODE_Y + 56}
                textAnchor="middle"
                fontSize="10.5"
                fill="var(--color-ink-muted)"
              >
                {step.detail}
              </text>
            </g>
          );
        })}

        {/* Parcel travelling the conveyor */}
        {running ? (
          <g>
            <rect
              width="26"
              height="18"
              rx="4"
              x="-13"
              y="-9"
              fill={oddData ? "var(--color-warning)" : "var(--color-primary)"}
              stroke="#ffffff"
              strokeWidth="1.5"
            >
              <animate attributeName="x" from="102" to="500" dur="1.8s" fill="freeze" />
            </rect>
            <line x1="0" y1="-9" x2="0" y2="9" stroke="#ffffff" strokeWidth="1" opacity="0.7">
              <animate attributeName="x1" from="115" to="513" dur="1.8s" fill="freeze" />
              <animate attributeName="x2" from="115" to="513" dur="1.8s" fill="freeze" />
            </line>
          </g>
        ) : null}

        {/* Delivered stamp */}
        {done ? (
          <g>
            <rect
              x="498"
              y="38"
              width="54"
              height="36"
              rx="8"
              fill="var(--color-success-tint)"
              stroke="var(--color-success)"
            />
            <path
              d="M 514 56 l 5 5 l 9 -10"
              fill="none"
              stroke="var(--color-success)"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        ) : null}
      </svg>

      <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-3">
        <button
          type="button"
          onClick={trigger}
          disabled={running}
          className="inline-flex min-h-11 items-center rounded-(--radius-control) bg-primary px-4 py-2 text-body font-semibold text-surface-card hover:bg-primary-strong disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {done ? "Trigger it again" : "Trigger it now"}
        </button>
        <label className="flex cursor-pointer items-center gap-2 text-body text-ink">
          <input
            type="checkbox"
            checked={oddData}
            onChange={(event) => setOddData(event.target.checked)}
            className="h-5 w-5 accent-warning"
          />
          This week&rsquo;s numbers look unusual
        </label>
      </div>

      <p className="mt-3 text-body text-ink-muted" aria-live="polite">
        {done
          ? oddData
            ? "Sent anyway. The chain ran exactly the same - automation executes, it never inspects. Catching odd numbers would take a person or a different kind of system; no decisions were made anywhere in this one."
            : "Done. Each step followed the last on schedule - no decisions were made anywhere."
          : running
            ? "Running the chain…"
            : "The schedule is the trigger; nothing runs until it fires. Try flipping the data switch first."}
      </p>
    </figure>
  );
}

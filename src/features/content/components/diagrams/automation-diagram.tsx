"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";
import { DiagramObservation, DiagramTextAlternative } from "./diagram-parts";
import { PredictionGate } from "./prediction-gate";

const STEPS = [
  ["Trigger", "A customer submits the support form"],
  ["Confirm", "Send the customer a receipt"],
  ["Create ticket", "Store the request in the queue"],
  ["Assign team", "Route it using predefined fields"],
  ["Remind", "Notify the team if it waits too long"],
] as const;

export function AutomationDiagram() {
  const [completed, setCompleted] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    if (completed >= STEPS.length) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPlaying(false);
      return;
    }
    const timer = window.setTimeout(
      () => setCompleted((value) => Math.min(value + 1, STEPS.length)),
      750,
    );
    return () => window.clearTimeout(timer);
  }, [completed, playing]);

  function step() {
    setPlaying(false);
    setCompleted((value) => Math.min(value + 1, STEPS.length));
    track("diagram_component_opened", { component: "automation-step" });
  }

  return (
    <figure aria-label="Interactive automation workflow" className="panel mt-5 p-5">
      <figcaption>
        <span className="block text-caption font-semibold uppercase tracking-wide text-ink-muted">
          Workflow explorer
        </span>
        <span className="mt-1 block text-body text-ink-muted">
          Run one predefined step at a time, or play the whole chain. Nothing starts before the
          trigger.
        </span>
      </figcaption>
      <PredictionGate
        id="automation"
        prompt="A support request is about to arrive. Before the trigger fires, what has the workflow done?"
        options={[
          { text: "Queued the ticket already", correct: false },
          { text: "Nothing - it waits for the trigger", correct: true },
          { text: "Judged how urgent it is", correct: false },
        ]}
        revealLabel="Run the chain and check."
      >
        <p className="mt-4 text-body font-semibold">
          Try it: follow a support request from trigger to reminder.
        </p>
        <ol className="mt-4 grid gap-2 md:grid-cols-5" aria-live="polite">
          {STEPS.map(([label, detail], index) => {
            const done = index < completed;
            const active = index === completed && completed < STEPS.length;
            return (
              <li
                key={label}
                className={`relative rounded-(--radius-control) border p-3 ${done ? "border-success bg-success-tint" : active ? "border-primary bg-primary-tint" : "border-border bg-surface-card"}`}
              >
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-caption font-bold ${done ? "bg-success text-white" : active ? "bg-primary text-white" : "bg-surface-alt text-ink-muted"}`}
                >
                  {done ? "✓" : index + 1}
                </span>
                <p className="mt-2 font-semibold">{label}</p>
                <p className="mt-1 text-caption text-ink-muted">{detail}</p>
                {index < STEPS.length - 1 ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-3 left-1/2 z-10 text-primary md:hidden"
                    >
                      ↓
                    </span>
                    <span
                      aria-hidden="true"
                      className="absolute -right-3 top-1/2 z-10 hidden text-primary md:block"
                    >
                      →
                    </span>
                  </>
                ) : null}
              </li>
            );
          })}
        </ol>
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={step}
            disabled={completed >= STEPS.length}
            className="min-h-11 rounded-(--radius-control) bg-primary px-4 text-body font-semibold text-white disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Run next step
          </button>
          <button
            type="button"
            onClick={() => {
              setPlaying((value) => !value);
              track("interaction_started", { interaction: "automation-play" });
            }}
            disabled={completed >= STEPS.length}
            className="min-h-11 rounded-(--radius-control) border border-primary px-4 text-body font-semibold text-primary disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-primary"
          >
            {playing ? "Pause" : "Play workflow"}
          </button>
          <button
            type="button"
            onClick={() => {
              setPlaying(false);
              setCompleted(0);
              track("interaction_retry_selected", { interaction: "automation-workflow" });
            }}
            className="min-h-11 text-body font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-primary"
          >
            Reset
          </button>
        </div>
        <aside
          className="mt-4 rounded-(--radius-control) bg-surface-alt p-4 text-body"
          aria-live="polite"
        >
          <strong>Notice:</strong>{" "}
          {completed === 0
            ? "the chain is waiting for its trigger."
            : completed < STEPS.length
              ? `${STEPS[completed]?.[0]} is next; the order was decided in advance.`
              : "the whole sequence ran without choosing a new goal or judging the request."}
        </aside>
      </PredictionGate>
      <DiagramObservation>
        What started the workflow, and did any step independently choose a new goal?
      </DiagramObservation>
      <DiagramTextAlternative>
        <p className="mt-2">
          A form submission triggers four predefined actions in order: send confirmation, create
          ticket, assign a team using fields, then send a reminder if needed.
        </p>
      </DiagramTextAlternative>
    </figure>
  );
}

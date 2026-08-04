"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import {
  DiagramObservation,
  DiagramTextAlternative,
  InteractiveBadge,
} from "./diagrams/diagram-parts";

interface Layer {
  id: string;
  label: string;
  description: string;
}

/**
 * The generic interactive diagram: draws exactly the layers a section
 * declares, in order, as a traceable sequence. Select any layer to read what
 * it does, or Play the trace to watch the sequence light up step by step.
 *
 * Its predecessor under this name hardcoded the first section's five-layer
 * support-ticket flow and rendered it for every section; the real combined
 * figure now lives in diagrams/combined-system-figure.tsx for section 3 only.
 *
 * Reduced motion: Play jumps straight to the completed trace (globals.css
 * rule: nothing animates for learners who asked it not to).
 */
export function DiagramFigure({
  title,
  claim,
  altText,
  longText,
  layers,
}: {
  title: string;
  claim: string;
  altText: string;
  longText: string;
  layers: Layer[];
}) {
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [traced, setTraced] = useState(false);
  const playedEvent = useRef(false);
  const active = layers[selected] ?? layers[0];

  useEffect(() => {
    if (!playing) return;
    if (selected >= layers.length - 1) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- terminal transition of the running trace
      setPlaying(false);
      setTraced(true);
      return;
    }
    const timer = window.setTimeout(() => setSelected((value) => value + 1), 900);
    return () => window.clearTimeout(timer);
  }, [playing, selected, layers.length]);

  function play() {
    if (!playedEvent.current) {
      playedEvent.current = true;
      track("diagram_component_opened", { component: "trace-play" });
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      // The completed state, instantly: motion is the delivery, not the lesson.
      setSelected(layers.length - 1);
      setTraced(true);
      return;
    }
    setSelected(0);
    setPlaying(true);
  }

  if (!active) return null;

  return (
    <figure aria-label={altText} className="panel p-5">
      <figcaption>
        <InteractiveBadge />
        <span className="mt-2 block font-display text-subheading font-bold">{title}</span>
        <span className="mt-1 block text-body text-ink-muted">{claim}</span>
      </figcaption>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={play}
          disabled={playing}
          className="inline-flex min-h-11 items-center rounded-(--radius-control) bg-primary px-4 py-2 text-body font-semibold text-surface-card hover:bg-primary-strong disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {traced ? "Play the trace again" : "Play the trace"}
        </button>
        <span className="text-caption text-ink-muted">or select any step to read it</span>
      </div>

      <ol
        className={`mt-4 grid gap-2 ${
          { 1: "", 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-4" }[
            Math.min(layers.length, 5)
          ] ?? "md:grid-cols-5"
        }`}
        aria-label="Diagram steps"
      >
        {layers.map((layer, index) => (
          <li key={layer.id} className="relative">
            <button
              type="button"
              aria-pressed={index === selected}
              onClick={() => {
                setPlaying(false);
                setSelected(index);
                track("diagram_component_opened", { component: layer.id });
              }}
              className={`h-full min-h-24 w-full rounded-(--radius-control) border p-3 text-left focus-visible:outline-2 focus-visible:outline-primary ${
                index === selected
                  ? "border-primary bg-primary-tint"
                  : "border-border bg-surface-card hover:border-primary"
              }`}
            >
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-caption font-bold ${
                  index <= selected ? "bg-primary text-white" : "bg-surface-alt text-ink-muted"
                } ${playing && index === selected ? "thinking" : ""}`}
              >
                {index + 1}
              </span>
              <span className="mt-2 block text-body font-semibold">{layer.label}</span>
            </button>
            {index < layers.length - 1 ? (
              <span
                aria-hidden="true"
                className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-primary md:block"
              >
                →
              </span>
            ) : null}
          </li>
        ))}
      </ol>

      <DiagramObservation>
        <strong>
          Step {selected + 1} · {active.label}:
        </strong>{" "}
        {active.description}
      </DiagramObservation>

      <DiagramTextAlternative>
        <p>{longText}</p>
      </DiagramTextAlternative>
    </figure>
  );
}

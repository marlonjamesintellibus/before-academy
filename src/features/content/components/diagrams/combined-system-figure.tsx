"use client";

import { useEffect, useId, useState } from "react";
import { track } from "@/lib/analytics";
import { DiagramObservation, InteractiveBadge } from "./diagram-parts";
import { PredictionGate } from "./prediction-gate";

interface Layer {
  id: string;
  label: string;
  description: string;
}

const STORY = [
  'Written rules receive and store: "Where is my package?"',
  "A predefined workflow creates the ticket and routes it to the shipping queue.",
  "A model predicts shipping issue, 84% confident.",
  "A person checks the suggestion and decides what to send.",
  "Written rules store the final action and update the customer record.",
];

/**
 * Section 3's five-layer combined-system diagram, exactly as validated. This
 * was previously exported as the generic DiagramFigure, which meant every
 * other section's diagram rendered THIS content (the support-ticket flow and
 * its prediction prompt) under their own titles. It is now named for what it
 * is and used only by the first section's journey; the generic renderer lives
 * in ../diagram-figure.tsx and draws the layers it is given.
 */
export function CombinedSystemFigure({
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
  const [includeAi, setIncludeAi] = useState(true);
  const [includeHuman, setIncludeHuman] = useState(true);
  const [textAltOpen, setTextAltOpen] = useState(false);
  const textAltId = useId();
  const isAi = (layer: Layer) => /artificial|\bai\b|model/i.test(`${layer.id} ${layer.label}`);
  const isHuman = (layer: Layer) => /human|person|review/i.test(`${layer.id} ${layer.label}`);
  const automation = layers.find((layer) => /automation/i.test(`${layer.id} ${layer.label}`));
  const ai = layers.find((layer) => isAi(layer));
  const human = layers.find((layer) => isHuman(layer));
  const flowLayers: Layer[] = [
    {
      id: "traditional-input",
      label: "Traditional software",
      description: "receives and stores the request",
    },
    automation ?? {
      id: "automation",
      label: "Automation",
      description: "creates and routes the ticket",
    },
    ai ?? { id: "ai-component", label: "AI component", description: "predicts topic and urgency" },
    human ?? {
      id: "human-review",
      label: "Human review",
      description: "checks uncertainty and decides",
    },
    {
      id: "traditional-record",
      label: "Traditional software",
      description: "stores the final action and updates the customer record",
    },
  ];
  const visible = flowLayers.filter(
    (layer) => (includeAi || !isAi(layer)) && (includeHuman || !isHuman(layer)),
  );
  const active = visible[selected] ?? visible[0];
  const originalIndex = active ? flowLayers.indexOf(active) : 0;

  useEffect(() => {
    if (!playing) return;
    if (selected >= visible.length - 1) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPlaying(false);
      return;
    }
    const timer = window.setTimeout(() => setSelected((value) => value + 1), 900);
    return () => window.clearTimeout(timer);
  }, [playing, selected, visible.length]);

  useEffect(() => {
    if (selected >= visible.length) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelected(Math.max(0, visible.length - 1));
    }
  }, [selected, visible.length]);

  function restart() {
    setPlaying(false);
    setSelected(0);
    track("interaction_retry_selected", { interaction: "combined-system" });
  }

  return (
    <figure aria-label={altText} className="panel p-5">
      <figcaption>
        <InteractiveBadge />
        <span className="mt-2 block font-display text-subheading font-bold">{title}</span>
        <span className="mt-1 block text-body text-ink-muted">{claim}</span>
      </figcaption>
      <PredictionGate
        id="layer-diagram"
        prompt="One customer request flows through this whole system. Which part makes the final call on what the customer receives?"
        options={[
          { text: "The AI component", correct: false },
          { text: "A person", correct: true },
          { text: "The workflow", correct: false },
        ]}
        revealLabel="Trace the request and check."
      >
        <p className="mt-4 text-body font-semibold">
          Try it: trace one request, select any layer, or remove AI and human review to see what
          remains.
        </p>
        <div className="mt-4 flex flex-wrap gap-5 rounded-(--radius-control) bg-surface-alt p-3">
          <label className="flex min-h-11 cursor-pointer items-center gap-2 text-body">
            <input
              type="checkbox"
              checked={includeAi}
              onChange={(event) => {
                setIncludeAi(event.target.checked);
                setSelected(0);
              }}
              className="h-5 w-5 accent-primary"
            />{" "}
            Include AI prediction
          </label>
          <label className="flex min-h-11 cursor-pointer items-center gap-2 text-body">
            <input
              type="checkbox"
              checked={includeHuman}
              onChange={(event) => {
                setIncludeHuman(event.target.checked);
                setSelected(0);
              }}
              className="h-5 w-5 accent-primary"
            />{" "}
            Include human review
          </label>
        </div>
        <ol className="mt-4 grid gap-2 md:grid-cols-5" aria-label="System layers">
          {visible.map((layer, index) => (
            <li key={layer.id} className="relative">
              <button
                type="button"
                aria-pressed={index === selected}
                onClick={() => {
                  setPlaying(false);
                  setSelected(index);
                  track("diagram_component_opened", { component: layer.id });
                }}
                className={`h-full min-h-24 w-full rounded-(--radius-control) border p-3 text-left focus-visible:outline-2 focus-visible:outline-primary ${index === selected ? "border-primary bg-primary-tint" : "border-border bg-surface-card hover:border-primary"}`}
              >
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-caption font-bold ${index <= selected ? "bg-primary text-white" : "bg-surface-alt text-ink-muted"}`}
                >
                  {index + 1}
                </span>
                <span className="mt-2 block text-body font-semibold">{layer.label}</span>
              </button>
              {index < visible.length - 1 ? (
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
          ))}
        </ol>
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
                // Reduced motion: jump to the final layer with its story beat.
                setSelected(Math.max(0, visible.length - 1));
                return;
              }
              setPlaying((value) => !value);
            }}
            disabled={selected >= visible.length - 1}
            className="min-h-11 rounded-(--radius-control) bg-primary px-4 text-body font-semibold text-white disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {playing ? "Pause trace" : "Play trace"}
          </button>
          <button
            type="button"
            onClick={() => {
              setPlaying(false);
              setSelected((value) => Math.min(value + 1, visible.length - 1));
            }}
            disabled={selected >= visible.length - 1}
            className="min-h-11 rounded-(--radius-control) border border-primary px-4 text-body font-semibold text-primary disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-primary"
          >
            Next layer
          </button>
          <button
            type="button"
            onClick={restart}
            className="min-h-11 text-body font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-primary"
          >
            Restart
          </button>
        </div>
        <aside
          className="mt-4 rounded-(--radius-control) bg-surface-alt p-4 text-body"
          aria-live="polite"
        >
          {active ? (
            <>
              <strong>{active.label}:</strong> {STORY[originalIndex] ?? active.description}
              <span className="mt-2 block text-ink-muted">Mechanism: {active.description}</span>
            </>
          ) : (
            "No layers are selected."
          )}
        </aside>
        <p className="mt-4 text-body">
          <strong>Notice:</strong> one product can contain several mechanisms. Removing the AI layer
          leaves a useful rule-and-workflow system; removing human review changes who handles
          uncertainty.
        </p>
        {!includeAi ? (
          <p
            className="mt-3 rounded-(--radius-control) bg-primary-tint p-3 text-body"
            aria-live="polite"
          >
            <strong>AI off:</strong> the request can still be stored and routed, but a person must
            sort it manually.
          </p>
        ) : null}
        {!includeHuman ? (
          <p
            className="mt-3 rounded-(--radius-control) bg-warning-tint p-3 text-body"
            aria-live="polite"
          >
            <strong>Human review off:</strong> uncertain or high-impact predictions may be acted on
            without a person checking them.
          </p>
        ) : null}
      </PredictionGate>
      <DiagramObservation>
        Which parts still work without AI, and where is human judgment most important?
      </DiagramObservation>
      <button
        type="button"
        aria-expanded={textAltOpen}
        aria-controls={textAltId}
        onClick={() => {
          const next = !textAltOpen;
          setTextAltOpen(next);
          if (next) track("diagram_text_alt_opened");
        }}
        className="mt-3 min-h-11 text-body font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-primary"
      >
        {textAltOpen ? "Hide the text version" : "Read the full text version"}
      </button>
      <div id={textAltId} hidden={!textAltOpen} className="mt-2 text-body text-ink-muted">
        {longText}
      </div>
    </figure>
  );
}

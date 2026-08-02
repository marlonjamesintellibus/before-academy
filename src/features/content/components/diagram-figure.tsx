"use client";

import { useEffect, useId, useRef, useState } from "react";
import { track } from "@/lib/analytics";

/**
 * DiagramFigure (docs/product/components.md, design-system v3): the canonical
 * layered diagram as an interactive SVG stack. Layers are real buttons
 * (select → description, aria-pressed); "Trace a request" animates one
 * support request travelling through every layer in order; the full text
 * alternative stays one tap away. Data comes from published records - the
 * geometry is the design system's diagram language, custom to Before Academy.
 */
interface Layer {
  id: string;
  label: string;
  description: string;
}

/** Trace narrative: the canonical support-request walkthrough, one beat per layer. */
const STORY = [
  'A customer types: "Where is my package?"',
  "Written rules look up the order and the account - same steps for every request",
  "A workflow routes it to the right queue - nobody clicked anything",
  "The model reads the message: shipping issue, 84% confident",
  "A person checks the suggestion and approves the reply",
];

/** Minimal geometric layer icons (design-system v3 illustration language). */
function LayerGlyph({ index }: { index: number }) {
  const stroke = "currentColor";
  const common = { fill: "none", stroke, strokeWidth: 1.8, strokeLinecap: "round" as const };
  switch (index) {
    case 0: // interface: chat bubble
      return (
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
          <path d="M3 4 h12 v8 h-7 l-3.5 3 v-3 H3 Z" {...common} strokeLinejoin="round" />
        </svg>
      );
    case 1: // rules: list lines
      return (
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
          <path d="M4 5 h10 M4 9 h10 M4 13 h6" {...common} />
        </svg>
      );
    case 2: // automation: chained arrows
      return (
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
          <path
            d="M2.5 9 h5 M10.5 9 h5 M13 6.5 15.5 9 13 11.5 M5 6.5 7.5 9 5 11.5"
            {...common}
            strokeLinejoin="round"
          />
        </svg>
      );
    case 3: // AI: node spark
      return (
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
          <circle cx="9" cy="9" r="2.4" {...common} />
          <path
            d="M9 2.5 v2.5 M9 13 v2.5 M2.5 9 h2.5 M13 9 h2.5 M4.5 4.5 l1.8 1.8 M11.7 11.7 l1.8 1.8"
            {...common}
          />
        </svg>
      );
    default: // human review: person
      return (
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
          <circle cx="9" cy="6" r="3" {...common} />
          <path d="M3.5 15 a5.5 5.5 0 0 1 11 0" {...common} />
        </svg>
      );
  }
}

const LAYER_HEIGHT = 56;
const LAYER_GAP = 14;
const WIDTH = 560;
const LAYER_X = 96;
const LAYER_WIDTH = WIDTH - LAYER_X - 8;

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
  const [selected, setSelected] = useState<string | null>(null);
  const [tracing, setTracing] = useState(-1); // -1 idle; 0..n-1 = active layer
  const [storyBeat, setStoryBeat] = useState<string | null>(null);
  const [textAltOpen, setTextAltOpen] = useState(false);
  const textAltId = useId();
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const selectedLayer = layers.find((layer) => layer.id === selected);
  const height = layers.length * (LAYER_HEIGHT + LAYER_GAP) + 8;

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function selectLayer(layer: Layer) {
    setSelected(layer.id);
    setStoryBeat(null);
    track("diagram_component_opened", { component: layer.id });
  }

  function trace() {
    if (tracing >= 0) return;
    track("diagram_component_opened", { component: "trace-request" });
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      const last = layers[layers.length - 1];
      if (last) {
        setSelected(last.id);
        setStoryBeat(STORY[layers.length - 1] ?? null);
      }
      return;
    }
    setTracing(0);
    layers.forEach((layer, index) => {
      timers.current.push(
        setTimeout(() => {
          setTracing(index);
          setSelected(layer.id);
          setStoryBeat(STORY[index] ?? null);
          if (index === layers.length - 1) {
            timers.current.push(setTimeout(() => setTracing(-1), 900));
          }
        }, index * 900),
      );
    });
  }

  return (
    <figure aria-label={altText} className="panel p-5">
      <figcaption>
        <span className="block font-display text-subheading font-bold">{title}</span>
        <span className="mt-1 block text-body text-ink-muted">{claim}</span>
      </figcaption>

      <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div>
          <svg
            viewBox={`0 0 ${WIDTH} ${height}`}
            role="group"
            aria-label="Diagram layers"
            className="w-full"
          >
            {/* Request rail */}
            <line
              x1="40"
              y1="8"
              x2="40"
              y2={height - 20}
              stroke="var(--color-sky)"
              strokeWidth="3"
              strokeDasharray="2 6"
            />
            <text
              x="40"
              y={height - 4}
              textAnchor="middle"
              fontSize="10"
              fill="var(--color-ink-muted)"
            >
              one request
            </text>

            {layers.map((layer, index) => {
              const y = index * (LAYER_HEIGHT + LAYER_GAP) + 4;
              const isSelected = selected === layer.id;
              const isTracing = tracing === index;
              return (
                <g key={layer.id}>
                  <line
                    x1="40"
                    y1={y + LAYER_HEIGHT / 2}
                    x2={LAYER_X}
                    y2={y + LAYER_HEIGHT / 2}
                    stroke={isSelected ? "var(--color-primary)" : "var(--color-sky)"}
                    strokeWidth={isSelected ? 3 : 2}
                  />
                  {isTracing ? (
                    <circle
                      cx="40"
                      cy={y + LAYER_HEIGHT / 2}
                      r="7"
                      fill="var(--color-primary)"
                      stroke="#ffffff"
                      strokeWidth="2"
                    />
                  ) : null}
                  <foreignObject x={LAYER_X} y={y} width={LAYER_WIDTH} height={LAYER_HEIGHT}>
                    <button
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => selectLayer(layer)}
                      className={`flex h-full w-full items-center gap-3 rounded-(--radius-control) border px-4 text-left text-body font-semibold transition-colors duration-(--duration-state) focus-visible:outline-2 focus-visible:outline-primary ${
                        isSelected
                          ? "border-primary bg-primary-tint text-ink"
                          : "border-border bg-surface-card text-ink hover:border-primary"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-(--radius-chip) text-caption font-bold ${
                          isSelected
                            ? "bg-primary text-surface-card"
                            : "bg-surface-alt text-ink-muted"
                        }`}
                      >
                        {index + 1}
                      </span>
                      <span
                        aria-hidden="true"
                        className={isSelected ? "text-primary" : "text-ink-muted"}
                      >
                        <LayerGlyph index={index} />
                      </span>
                      <span className="truncate">{layer.label}</span>
                    </button>
                  </foreignObject>
                </g>
              );
            })}
          </svg>

          <button
            type="button"
            onClick={trace}
            disabled={tracing >= 0}
            className="mt-3 inline-flex min-h-11 items-center rounded-(--radius-control) border border-primary px-4 py-2 text-body font-semibold text-primary hover:bg-primary-tint disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Trace a request through the layers
          </button>
        </div>

        <div>
          <p aria-live="polite" className="rounded-(--radius-card) bg-surface-alt p-4 text-body">
            {storyBeat && selectedLayer ? (
              <>
                <strong>{selectedLayer.label}:</strong> {storyBeat}
              </>
            ) : selectedLayer ? (
              <>
                <strong>{selectedLayer.label}:</strong> {selectedLayer.description}
              </>
            ) : (
              "Select a layer to see what it does - or trace one request through all five."
            )}
          </p>
        </div>
      </div>

      <button
        type="button"
        aria-expanded={textAltOpen}
        aria-controls={textAltId}
        onClick={() => {
          const next = !textAltOpen;
          setTextAltOpen(next);
          if (next) track("diagram_text_alt_opened");
        }}
        className="mt-4 min-h-11 text-body text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-primary"
      >
        {textAltOpen ? "Hide the text version" : "Read the full text version"}
      </button>
      <div id={textAltId} hidden={!textAltOpen} className="mt-2 text-body text-ink-muted">
        {longText}
      </div>
    </figure>
  );
}

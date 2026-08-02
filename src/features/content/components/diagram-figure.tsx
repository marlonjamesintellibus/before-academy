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
  const [textAltOpen, setTextAltOpen] = useState(false);
  const textAltId = useId();
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const selectedLayer = layers.find((layer) => layer.id === selected);
  const height = layers.length * (LAYER_HEIGHT + LAYER_GAP) + 8;

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function selectLayer(layer: Layer) {
    setSelected(layer.id);
    track("diagram_component_opened", { component: layer.id });
  }

  function trace() {
    if (tracing >= 0) return;
    track("diagram_component_opened", { component: "trace-request" });
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      const last = layers[layers.length - 1];
      if (last) setSelected(last.id);
      return;
    }
    setTracing(0);
    layers.forEach((layer, index) => {
      timers.current.push(
        setTimeout(() => {
          setTracing(index);
          setSelected(layer.id);
          if (index === layers.length - 1) {
            timers.current.push(setTimeout(() => setTracing(-1), 700));
          }
        }, index * 650),
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
            {selectedLayer ? (
              <>
                <strong>{selectedLayer.label}:</strong> {selectedLayer.description}
              </>
            ) : (
              "Select a layer to see what it does - or trace a request through all five."
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

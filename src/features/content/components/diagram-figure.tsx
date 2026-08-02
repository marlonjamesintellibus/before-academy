"use client";

import { useId, useState } from "react";
import { track } from "@/lib/analytics";

/**
 * DiagramFigure (docs/product/components.md): interactive layers as buttons,
 * full text alternative on demand; figure/figcaption semantics. The layered
 * stack renders from data; the illustrated SVG asset slots in later without
 * changing this contract.
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
  layers: { id: string; label: string; description: string }[];
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [textAltOpen, setTextAltOpen] = useState(false);
  const textAltId = useId();
  const selectedLayer = layers.find((layer) => layer.id === selected);

  return (
    <figure
      aria-label={altText}
      className="rounded-(--radius-control) border border-surface-alt p-5"
    >
      <figcaption>
        <span className="block text-subheading font-semibold">{title}</span>
        <span className="mt-1 block text-body text-ink-muted">{claim}</span>
      </figcaption>

      <div className="mt-4 flex flex-col gap-2" role="group" aria-label="Diagram layers">
        {layers.map((layer) => (
          <button
            key={layer.id}
            type="button"
            aria-pressed={selected === layer.id}
            onClick={() => {
              setSelected(layer.id);
              track("diagram_component_opened", { component: layer.id });
            }}
            className={`min-h-11 rounded-(--radius-control) border px-4 py-2 text-left text-body font-medium focus-visible:outline-2 focus-visible:outline-primary ${
              selected === layer.id
                ? "border-primary bg-highlight text-ink"
                : "border-surface-alt hover:border-primary"
            }`}
          >
            {layer.label}
          </button>
        ))}
      </div>

      {selectedLayer ? (
        <p
          aria-live="polite"
          className="mt-4 rounded-(--radius-control) bg-surface-alt p-4 text-body"
        >
          <strong>{selectedLayer.label}:</strong> {selectedLayer.description}
        </p>
      ) : (
        <p className="mt-4 text-caption text-ink-muted">Select a layer to see what it does.</p>
      )}

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

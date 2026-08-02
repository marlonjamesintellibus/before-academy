"use client";

import { useId, useState } from "react";
import { track } from "@/lib/analytics";

/**
 * GlossaryChip (docs/product/components.md): inline term, tap-to-open panel,
 * never a hover tooltip. Button + aria-expanded; panel is inline content so
 * screen readers reach it in reading order.
 */
export function GlossaryChip({
  term,
  definition,
  example,
}: {
  term: string;
  definition: string;
  example?: string;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <span className="inline">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          const next = !open;
          setOpen(next);
          if (next) track("glossary_term_opened", { term });
        }}
        className="rounded-sm border-b-2 border-dotted border-primary/70 font-medium text-primary decoration-clone hover:border-primary hover:bg-highlight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {term}
      </button>
      {open ? (
        <span
          id={panelId}
          className="mt-2 block rounded-(--radius-control) border border-surface-alt bg-surface-alt p-3 text-body"
        >
          <strong>{term}:</strong> {definition}
          {example ? <span className="mt-1 block text-ink-muted">{example}</span> : null}
        </span>
      ) : (
        <span id={panelId} hidden />
      )}
    </span>
  );
}

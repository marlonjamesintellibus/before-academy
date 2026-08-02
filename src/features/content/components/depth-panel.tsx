"use client";

import type { ReactNode } from "react";
import { useId, useState } from "react";
import { track } from "@/lib/analytics";

/**
 * DepthPanel (docs/product/components.md, ADR-006 layered disclosure):
 * collapsed by default; button + aria-expanded; reading time in the label.
 */
export function DepthPanel({
  layer,
  concept,
  label,
  minutes,
  children,
}: {
  layer: "explore" | "deeper";
  concept: string;
  label: string;
  minutes: number;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="mt-4 rounded-(--radius-control) border border-ink/25 bg-surface">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          const next = !open;
          setOpen(next);
          if (next) track("layer_expanded", { layer, concept });
        }}
        className="flex min-h-11 w-full items-center justify-between gap-3 px-4 py-2 text-left text-body font-semibold text-primary hover:bg-highlight focus-visible:outline-2 focus-visible:outline-primary"
      >
        <span>
          {label} <span className="font-normal text-ink-muted">({minutes} min read)</span>
        </span>
        <span aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      <div id={panelId} hidden={!open} className="px-4 pb-4">
        {children}
      </div>
    </div>
  );
}

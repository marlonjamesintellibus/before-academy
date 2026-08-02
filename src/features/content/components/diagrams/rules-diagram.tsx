"use client";

import { useState } from "react";
import { track } from "@/lib/analytics";
import { DiagramObservation, DiagramTextAlternative } from "./diagram-parts";

export function RulesDiagram() {
  const [paid, setPaid] = useState(false);
  const [inStock, setInStock] = useState(true);
  const approved = paid && inStock;

  function toggle(kind: "paid" | "stock", next: boolean) {
    if (kind === "paid") setPaid(next);
    else setInStock(next);
    track("diagram_component_opened", {
      component: "rules-condition",
      condition: kind,
      value: next,
    });
  }

  return (
    <figure aria-label="Interactive written-rules simulator" className="panel mt-5 p-5">
      <figcaption>
        <span className="block text-caption font-semibold uppercase tracking-wide text-ink-muted">
          Written rules simulator
        </span>
        <span className="mt-1 block text-body text-ink-muted">
          Change either input. The same conditions always produce the same output.
        </span>
      </figcaption>
      <p className="mt-4 text-body font-semibold">
        Try it: can the vending machine release the item?
      </p>
      <div className="mt-4 grid items-stretch gap-3 md:grid-cols-[1fr_auto_1.25fr_auto_1fr]">
        <section
          className="rounded-(--radius-control) border border-border bg-surface-card p-4"
          aria-label="Inputs"
        >
          <p className="text-caption font-bold uppercase tracking-wide text-primary">Input</p>
          <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-3 text-body">
            <input
              type="checkbox"
              checked={paid}
              onChange={(event) => toggle("paid", event.target.checked)}
              className="h-5 w-5 accent-primary"
            />
            Payment approved
          </label>
          <label className="flex min-h-11 cursor-pointer items-center gap-3 text-body">
            <input
              type="checkbox"
              checked={inStock}
              onChange={(event) => toggle("stock", event.target.checked)}
              className="h-5 w-5 accent-primary"
            />
            Item is in stock
          </label>
        </section>
        <span aria-hidden="true" className="hidden self-center text-2xl text-primary md:block">
          →
        </span>
        <section
          className="rounded-(--radius-control) bg-navy p-4 text-white"
          aria-label="Written rule"
        >
          <p className="text-caption font-bold uppercase tracking-wide text-sky">Written rule</p>
          <p className="mt-3 font-mono text-body">
            IF payment = true
            <br />
            AND stock = true
            <br />
            THEN release item
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-caption">
            <span className="rounded-full bg-white/10 px-3 py-1">payment: {String(paid)}</span>
            <span className="rounded-full bg-white/10 px-3 py-1">stock: {String(inStock)}</span>
          </div>
        </section>
        <span aria-hidden="true" className="hidden self-center text-2xl text-primary md:block">
          →
        </span>
        <section
          className={`rounded-(--radius-control) border p-4 ${approved ? "border-success bg-success-tint" : "border-warning bg-warning-tint"}`}
          aria-label="Output"
          aria-live="polite"
        >
          <p className="text-caption font-bold uppercase tracking-wide text-ink-muted">Output</p>
          <p className="mt-3 font-display text-subheading font-bold">
            {approved ? "Release item" : "Do not release"}
          </p>
          <p className="mt-2 text-caption text-ink-muted">No prediction or judgment was needed.</p>
        </section>
      </div>
      <aside className="mt-4 rounded-(--radius-control) bg-surface-alt p-4 text-body">
        <strong>Notice:</strong> flip the inputs back to the same combination and the result repeats
        exactly. Complexity can add more conditions, but it does not turn a written rule into AI.
      </aside>
      <DiagramObservation>
        Did the machine make a judgment, or did it apply the rule exactly as written?
      </DiagramObservation>
      <DiagramTextAlternative>
        <p className="mt-2">
          Two Boolean inputs feed a rule: release the item only when payment is approved and the
          item is in stock. The output updates immediately and deterministically.
        </p>
      </DiagramTextAlternative>
    </figure>
  );
}

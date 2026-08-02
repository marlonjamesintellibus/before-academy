"use client";

import { useEffect, useRef, useState } from "react";
import { capstoneFields } from "@/db/seed/capstone-content";
import { readDevice, writeDevice } from "@/lib/device-store";
import { track } from "@/lib/analytics";

/**
 * Capstone: audit an AI claim (experience-plan Phase E). Seven structured
 * prompts applied to a product the learner actually uses, then a model audit
 * to compare against. Free text is device-only - it never leaves this browser,
 * and the copy says so. Optional, post-assessment.
 */
const CAPSTONE_KEY = "ba.v1.capstone.ai-automation-software";

interface StoredCapstone {
  version: 1;
  answers: Record<string, string>;
  completedAt: string | null;
}

const EMPTY: StoredCapstone = { version: 1, answers: {}, completedAt: null };

export function Capstone() {
  const [state, setState] = useState<StoredCapstone>(EMPTY);
  const [hydrated, setHydrated] = useState(false);
  const [comparing, setComparing] = useState(false);
  const started = useRef(false);
  const compareHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time post-mount device-storage hydration
    setState(
      readDevice<StoredCapstone>(
        CAPSTONE_KEY,
        EMPTY,
        (value) =>
          typeof value === "object" && value !== null && (value as StoredCapstone).version === 1,
      ),
    );
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  const filled = capstoneFields.filter(
    (field) => (state.answers[field.id] ?? "").trim().length > 0,
  ).length;

  function update(fieldId: string, value: string) {
    if (!started.current && value.trim().length > 0 && filled === 0) {
      started.current = true;
      track("capstone_started", {});
    }
    const next = { ...state, answers: { ...state.answers, [fieldId]: value } };
    setState(next);
    writeDevice(CAPSTONE_KEY, next);
  }

  function compare() {
    setComparing(true);
    if (!state.completedAt) {
      const next = { ...state, completedAt: new Date().toISOString() };
      setState(next);
      writeDevice(CAPSTONE_KEY, next);
      track("capstone_completed", { fields_filled: filled });
    }
    requestAnimationFrame(() => compareHeading.current?.focus());
  }

  return (
    <section aria-label="Capstone: audit an AI claim" className="panel mt-8 p-6">
      <p className="eyebrow">Capstone · take it to work</p>
      <h2 className="mt-2 font-display text-heading font-bold">Audit an AI claim</h2>
      <p className="mt-2 text-body text-ink-muted">
        Pick one product you actually use and put this section&rsquo;s skill to work. Your notes
        save to this device only - they are never sent anywhere.
      </p>

      <div className="mt-5 flex flex-col gap-5">
        {capstoneFields.map((field, index) => (
          <div key={field.id}>
            <label htmlFor={`capstone-${field.id}`} className="text-body font-semibold">
              {index + 1}. {field.prompt}
            </label>
            <p className="mt-1 text-caption text-ink-muted">{field.hint}</p>
            <textarea
              id={`capstone-${field.id}`}
              rows={2}
              value={state.answers[field.id] ?? ""}
              onChange={(event) => update(field.id, event.target.value)}
              className="mt-2 w-full rounded-(--radius-control) border border-border bg-surface-card p-3 text-body focus-visible:outline-2 focus-visible:outline-primary"
            />
            {comparing ? (
              <p className="mt-2 rounded-(--radius-control) bg-primary-tint p-3 text-body">
                {field.modelAnswer}
              </p>
            ) : null}
          </div>
        ))}
      </div>

      {!comparing ? (
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={compare}
            className="inline-flex min-h-11 items-center rounded-(--radius-control) bg-primary px-5 py-2.5 text-body font-semibold text-surface-card hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Compare with a model audit
          </button>
          <p className="text-caption text-ink-muted" aria-live="polite">
            {filled} of {capstoneFields.length} answered - compare whenever you like.
          </p>
        </div>
      ) : (
        <h3
          ref={compareHeading}
          tabIndex={-1}
          className="mt-6 text-subheading font-semibold focus:outline-none"
        >
          Model answers are shown under each prompt - compare, keep what you wrote, and trust your
          own product knowledge over the example.
        </h3>
      )}
    </section>
  );
}

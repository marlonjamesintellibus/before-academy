"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { remediationSeed } from "@/db/seed/remediation-content";
import type { RemediationModuleSeed } from "@/features/content";
import { track } from "@/lib/analytics";
import { CATEGORY_DISPLAY } from "../types";
import type { AssessmentCategory } from "../types";

/**
 * S09 remediation (docs/product/screens/assessment.md, experience-plan
 * Phase B): misconception-routed review. Failed categories and probed
 * misconceptions select the authored P1-REM modules; each ends in a
 * mini-confirm proving the correction landed; a pinned retake bar closes
 * the loop. Never punitive - the reviewing learner is doing the right thing.
 */
export function RemediationReview({
  categories,
  misconceptions,
  lessonRoute,
}: {
  categories: AssessmentCategory[];
  misconceptions: string[];
  lessonRoute: string;
}) {
  const fired = useRef(false);
  useEffect(() => {
    if (!fired.current) {
      fired.current = true;
      track("remediation_viewed", { categories: categories.join(",") });
    }
  }, [categories]);

  // Route: explicit misconceptions first, then the categories' mapped ones.
  const wanted = new Set<string>(misconceptions);
  for (const category of categories) {
    for (const id of remediationSeed.categoryMap[category] ?? []) wanted.add(id);
  }
  const modules =
    wanted.size > 0
      ? remediationSeed.modules.filter((module) => wanted.has(module.misconceptionId))
      : remediationSeed.modules;

  return (
    <div className="pb-24">
      {categories.length > 0 ? (
        <p className="mt-2 text-body font-semibold text-primary">
          Reviewing: {categories.map((category) => CATEGORY_DISPLAY[category]).join(", ")}
        </p>
      ) : (
        <p className="mt-2 text-body text-ink-muted">
          No categories were flagged, so here is the full review set - browse what looks useful.
        </p>
      )}

      <div className="mt-6 flex flex-col gap-6">
        {modules.map((module) => (
          <RemediationModule key={module.id} module={module} />
        ))}
      </div>

      <div className="mt-8">
        <Link
          href={`${lessonRoute}#p1-lesson-002`}
          className="text-body text-primary underline-offset-4 hover:underline"
        >
          Prefer to reread? Open the lesson
        </Link>
      </div>

      {/* Pinned retake bar (S09 spec) */}
      <div className="fixed inset-x-0 bottom-0 border-t border-border bg-surface-card/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[680px] items-center justify-between gap-4 px-4 py-3">
          <p className="hidden text-caption text-ink-muted sm:block">
            Retake when you&rsquo;re ready - the questions will be different.
          </p>
          <Link
            href={`${lessonRoute}/assessment`}
            onClick={() => track("remediation_retake_clicked", {})}
            className="inline-flex min-h-11 items-center rounded-(--radius-control) bg-primary px-5 py-2.5 text-body font-semibold text-surface-card shadow-(--shadow-card) hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Retake assessment
          </Link>
        </div>
      </div>
    </div>
  );
}

function RemediationModule({ module }: { module: RemediationModuleSeed }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const feedback = useRef<HTMLDivElement>(null);
  const chosen = selected !== null ? module.miniConfirm.options[selected] : undefined;

  return (
    <section aria-label={module.title} className="panel p-6">
      <p className="eyebrow">{module.misconceptionId} · worth untangling</p>
      <h2 className="mt-2 font-display text-subheading font-bold">{module.title}</h2>
      <p className="mt-2 text-body italic text-ink-muted">&ldquo;{module.claim}&rdquo;</p>
      {module.body.map((paragraph) => (
        <p key={paragraph.slice(0, 40)} className="mt-3 text-body">
          {paragraph}
        </p>
      ))}

      <div className="mt-5 rounded-(--radius-card) bg-primary-tint p-4">
        <p className="text-body font-semibold">{module.miniConfirm.prompt}</p>
        <div className="mt-3 flex flex-col gap-2">
          {module.miniConfirm.options.map((option, optionIndex) => (
            <label
              key={option.text}
              className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-(--radius-control) border px-4 py-2 text-body has-focus-visible:outline-2 has-focus-visible:outline-primary ${
                selected === optionIndex
                  ? "border-primary bg-surface-card"
                  : "border-border bg-surface-card/70 hover:border-primary"
              }`}
            >
              <input
                type="radio"
                name={`confirm-${module.id}`}
                checked={selected === optionIndex}
                disabled={confirmed}
                onChange={() => setSelected(optionIndex)}
                className="accent-primary"
              />
              {option.text}
            </label>
          ))}
        </div>
        {!confirmed ? (
          <button
            type="button"
            onClick={() => {
              if (selected === null) return;
              setConfirmed(true);
              track("remediation_block_completed", {
                module: module.id,
                correct: chosen?.correct ?? false,
              });
              requestAnimationFrame(() => feedback.current?.focus());
            }}
            className="mt-4 inline-flex min-h-11 items-center rounded-(--radius-control) bg-primary px-4 py-2 text-body font-semibold text-surface-card hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Check
          </button>
        ) : (
          <div ref={feedback} tabIndex={-1} className="mt-4" aria-live="polite">
            <p
              className={`text-body font-semibold ${chosen?.correct ? "text-success" : "text-warning"}`}
            >
              {chosen?.correct ? "Correct." : "Not quite."}
            </p>
            <p className="mt-1 text-body">
              {chosen?.correct
                ? module.miniConfirm.feedbackCorrect
                : module.miniConfirm.feedbackIncorrect}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

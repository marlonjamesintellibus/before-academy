"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Callout } from "@/components/ui/callout";
import { DiagramFigure } from "./diagram-figure";
import { RichTextView } from "./rich-text";
import { HookBlock } from "./hook-block";
import { DepthPanel } from "./depth-panel";
import { readDevice, writeDevice } from "@/lib/device-store";
import { track } from "@/lib/analytics";
import type { LessonBlock, PublishedSection } from "../types";

/**
 * Data-driven lesson renderer (ADR-042 staged units, docs/product/screens/lesson.md).
 *
 * The first section shipped as a hand-built journey with bespoke SVG diagrams
 * and inline checks, which was right for proving the format but does not scale
 * to seven sections. This renders any section from its blocks alone: stage 0 is
 * the opening, then one stage per concept, with the diagram, misconception and
 * takeaway carried by the final stage.
 *
 * The published section keeps its bespoke journey (see lesson-view.tsx), so
 * the validated experience carries no regression risk from this.
 */
type ConceptBlock = Extract<LessonBlock, { type: "concept" }>;
type DiagramBlock = Extract<LessonBlock, { type: "diagram" }>;

interface SavedProgress {
  active: number;
  completed: number[];
  updatedAt: number;
}

function isSavedProgress(value: unknown, stageCount: number): value is SavedProgress {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<SavedProgress>;
  return (
    typeof candidate.active === "number" &&
    candidate.active >= 0 &&
    candidate.active < stageCount &&
    Array.isArray(candidate.completed) &&
    candidate.completed.every((item) => typeof item === "number")
  );
}

export function SectionJourney({
  content,
  sectionSlug,
  lessonRoute,
}: {
  content: PublishedSection;
  sectionSlug: string;
  lessonRoute: string;
}) {
  const progressKey = `ba.v1.lesson.${sectionSlug}`;

  const hook = content.blocks.find((block) => block.type === "hook");
  const why = content.blocks.find((block) => block.type === "why_it_matters");
  const objectives = content.blocks.find((block) => block.type === "objectives");
  const concepts = content.blocks.filter(
    (block): block is ConceptBlock => block.type === "concept",
  );
  const diagram = content.blocks.find((block): block is DiagramBlock => block.type === "diagram");
  const misconception = content.blocks.find((block) => block.type === "misconception");
  const takeaway = content.blocks.find((block) => block.type === "takeaway");
  const activityCta = content.blocks.find((block) => block.type === "activity_cta");

  // Stage 0 is the opening; each concept is its own unit (ADR-042).
  const stageCount = concepts.length + 1;
  const lastStage = stageCount - 1;

  const [active, setActive] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const shouldFocus = useRef(false);

  useEffect(() => {
    const saved = readDevice<unknown>(progressKey, null);
    if (isSavedProgress(saved, stageCount)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time post-mount device-storage hydration
      setActive(saved.active);
      setCompleted([...new Set(saved.completed.filter((i) => i >= 0 && i < stageCount))]);
    }
    setHydrated(true);
  }, [progressKey, stageCount]);

  useEffect(() => {
    if (!hydrated) return;
    writeDevice(progressKey, { active, completed, updatedAt: Date.now() });
  }, [active, completed, hydrated, progressKey]);

  useEffect(() => {
    if (shouldFocus.current) {
      shouldFocus.current = false;
      headingRef.current?.focus();
    }
  }, [active]);

  function selectStage(next: number) {
    shouldFocus.current = true;
    setActive(next);
    track("lesson_stage_started", { stage: stageLabel(next), stage_number: next + 1 });
  }

  function stageLabel(index: number): string {
    if (index === 0) return "Start here";
    return concepts[index - 1]?.title ?? `Stage ${index + 1}`;
  }

  function completeStage() {
    if (!completed.includes(active)) {
      setCompleted([...completed, active].sort((a, b) => a - b));
      track("lesson_stage_completed", { stage: stageLabel(active), stage_number: active + 1 });
    }
    if (active < lastStage) selectStage(active + 1);
  }

  const percentage = Math.round((completed.length / stageCount) * 100);
  const concept = active > 0 ? concepts[active - 1] : undefined;

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6">
      <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <nav aria-label="Lesson contents" className="lg:sticky lg:top-6 lg:self-start">
          <p className="eyebrow">Contents</p>
          <p className="mt-2 text-caption text-ink-muted">
            {completed.length} of {stageCount} done · {percentage}%
          </p>
          <div className="progress-track mt-2" aria-hidden="true">
            <div className="progress-fill" style={{ width: `${percentage}%` }} />
          </div>
          <ol className="mt-4 flex flex-col gap-1">
            {Array.from({ length: stageCount }, (_, index) => {
              const done = completed.includes(index);
              return (
                <li key={index}>
                  <button
                    type="button"
                    onClick={() => selectStage(index)}
                    aria-current={index === active ? "step" : undefined}
                    className={`flex min-h-11 w-full items-center gap-2 rounded-(--radius-control) px-3 py-2 text-left text-body focus-visible:outline-2 focus-visible:outline-primary ${
                      index === active
                        ? "bg-primary-tint font-semibold text-primary"
                        : "text-ink-muted hover:bg-surface-alt"
                    }`}
                  >
                    <span aria-hidden="true">{done ? "✓" : index + 1}</span>
                    {stageLabel(index)}
                    <span className="sr-only">{done ? ", completed" : ", not started"}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="mt-8 lg:mt-0">
          <header>
            <p className="eyebrow">
              Stage {active + 1} of {stageCount}
            </p>
            <h2
              ref={headingRef}
              tabIndex={-1}
              className="mt-2 font-display text-heading font-bold text-ink"
            >
              {active === 0 ? (hook ? "Start here" : content.title) : (concept?.title ?? "")}
            </h2>
          </header>

          <div className="mt-6">
            {active === 0 ? (
              <>
                {hook ? (
                  <HookBlock prompt={hook.prompt} choices={hook.choices} reveal={hook.reveal} />
                ) : null}
                {why ? (
                  <div className="mt-6">
                    <RichTextView body={why.body} glossary={content.glossary} idPrefix={why.id} />
                  </div>
                ) : null}
                {objectives ? (
                  <section aria-label="What you will be able to do" className="panel mt-6 p-5">
                    <p className="eyebrow">By the end of this section</p>
                    <ul className="mt-3 flex flex-col gap-2 text-body text-ink-muted">
                      {objectives.items.map((item) => (
                        <li key={item} className="flex gap-2">
                          <span aria-hidden="true" className="text-primary">
                            ✓
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>
                ) : null}
              </>
            ) : concept ? (
              <>
                <section id={concept.id.toLowerCase()} aria-label={concept.title}>
                  <RichTextView
                    body={concept.quick}
                    glossary={content.glossary}
                    idPrefix={concept.id}
                  />
                </section>
                {concept.explore ? (
                  <DepthPanel
                    label={concept.explore.label}
                    minutes={concept.explore.minutes}
                    layer="explore"
                    concept={concept.id}
                  >
                    <RichTextView
                      body={concept.explore.body}
                      glossary={content.glossary}
                      idPrefix={`${concept.id}-explore`}
                    />
                  </DepthPanel>
                ) : null}
                {concept.deeper ? (
                  <DepthPanel
                    label={concept.deeper.label}
                    minutes={concept.deeper.minutes}
                    layer="deeper"
                    concept={concept.id}
                  >
                    <RichTextView
                      body={concept.deeper.body}
                      glossary={content.glossary}
                      idPrefix={`${concept.id}-deeper`}
                    />
                  </DepthPanel>
                ) : null}

                {active === lastStage ? (
                  <>
                    {diagram ? (
                      <div id={diagram.id.toLowerCase()} className="mt-8">
                        <DiagramFigure
                          title={diagram.title}
                          claim={diagram.claim}
                          altText={diagram.altText}
                          longText={diagram.longText}
                          layers={diagram.layers}
                        />
                      </div>
                    ) : null}
                    {misconception ? (
                      <div id={`${misconception.id.toLowerCase()}-misconception`} className="mt-6">
                        <Callout variant="warning" title="Common misconception">
                          <p className="italic">{`"${misconception.claim}"`}</p>
                          <p>{misconception.correction}</p>
                        </Callout>
                      </div>
                    ) : null}
                    {takeaway ? (
                      <div className="mt-8 rounded-(--radius-card) bg-primary-tint p-5">
                        <p className="eyebrow">Take this with you</p>
                        <div className="mt-2">
                          <RichTextView
                            body={takeaway.body}
                            glossary={content.glossary}
                            idPrefix={takeaway.id}
                          />
                        </div>
                      </div>
                    ) : null}
                  </>
                ) : null}
              </>
            ) : null}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-border pt-6">
            {active > 0 ? (
              <button
                type="button"
                onClick={() => selectStage(active - 1)}
                className="inline-flex min-h-11 items-center rounded-(--radius-control) border border-border px-4 py-2 text-body font-medium text-ink-muted hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
              >
                Previous
              </button>
            ) : null}
            {active < lastStage ? (
              <button
                type="button"
                onClick={completeStage}
                className="inline-flex min-h-11 items-center rounded-(--radius-control) bg-primary px-5 py-2.5 text-body font-semibold text-surface-card hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Continue
              </button>
            ) : (
              // A section only links onward to an activity when it has one:
              // an activity_cta block is the section's declaration that the
              // step exists, so a section without one closes to the pathway
              // instead of pointing at a route that would 404.
              <Link
                href={activityCta ? `${lessonRoute}/activity` : "/learn"}
                onClick={() => {
                  if (!completed.includes(active)) setCompleted([...completed, active]);
                  if (activityCta) track("continue_to_activity_clicked", {});
                }}
                className="inline-flex min-h-11 items-center rounded-(--radius-control) bg-primary px-5 py-2.5 text-body font-semibold text-surface-card hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {activityCta ? activityCta.body : "Back to the pathway"}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

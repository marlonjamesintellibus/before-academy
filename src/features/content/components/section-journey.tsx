"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Callout } from "@/components/ui/callout";
import { DiagramFigure } from "./diagram-figure";
import { RichTextView } from "./rich-text";
import { HookBlock } from "./hook-block";
import { DepthPanel } from "./depth-panel";
import { InlineCheck } from "./inline-check";
import { PredictionGate } from "./diagrams/prediction-gate";
import { readDevice, writeDevice } from "@/lib/device-store";
import { track } from "@/lib/analytics";
import type { LessonBlock, PublishedSection } from "../types";

/**
 * Data-driven lesson renderer (ADR-042 staged units, docs/product/screens/lesson.md).
 *
 * Second generation: the first version rendered concepts as plain stages,
 * which left a drastic gap against the hand-built first section. This one
 * speaks the same experience vocabulary from data alone:
 *
 * - Stages are assembled from block ORDER, so inline checks, the diagram and
 *   the misconception land inside the stage they belong to, not bolted onto
 *   the end.
 * - Each stage carries its objective, minutes, tone-styled card, completion
 *   message and a labelled transition to the next stage.
 * - The progress rail shows percent and minutes remaining, like the original.
 * - Diagrams can require a committed prediction before revealing (the
 *   predict-then-observe pattern the pedagogy is built on).
 *
 * The first section keeps its bespoke component; the goal here is parity of
 * experience, not pixel identity.
 */
type ConceptBlock = Extract<LessonBlock, { type: "concept" }>;

interface Stage {
  label: string;
  objective?: string;
  minutes: number;
  completion?: string;
  tone: string;
  blocks: LessonBlock[];
}

/** Tone gradients mirroring the bespoke journey's stage identities. */
const TONE_CLASSES: Record<string, string> = {
  start: "border-primary/25 bg-gradient-to-br from-primary-tint to-surface-card",
  rules: "border-sky bg-surface-card",
  flow: "border-primary/25 bg-gradient-to-b from-surface-card to-primary-tint/40",
  pattern: "border-navy/20 bg-gradient-to-br from-surface-card via-surface-card to-sky/30",
  compare: "border-primary/25 bg-surface-card",
};
const TONE_CYCLE = ["rules", "flow", "pattern", "compare"] as const;

const DEFAULT_STAGE_MINUTES = 4;
const OPENING_MINUTES = 3;

/**
 * Stage assembly: everything before the first concept opens the lesson; each
 * concept starts a stage that owns the blocks after it (inline checks, the
 * diagram, the misconception) until the next concept. Closing blocks
 * (takeaway, CTAs, next step) join the final stage.
 */
export function assembleStages(blocks: LessonBlock[]): Stage[] {
  const opening: Stage = {
    label: "Start here",
    minutes: OPENING_MINUTES,
    tone: "start",
    blocks: [],
  };
  const stages: Stage[] = [opening];

  for (const block of blocks) {
    if (block.type === "concept") {
      const concept = block as ConceptBlock;
      stages.push({
        label: concept.title,
        ...(concept.objective ? { objective: concept.objective } : {}),
        minutes: concept.minutes ?? DEFAULT_STAGE_MINUTES,
        ...(concept.completion ? { completion: concept.completion } : {}),
        tone: concept.tone ?? TONE_CYCLE[(stages.length - 1) % TONE_CYCLE.length] ?? "compare",
        blocks: [block],
      });
    } else {
      const current = stages[stages.length - 1];
      if (current) current.blocks.push(block);
    }
  }
  return stages;
}

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
  const stages = useMemo(() => assembleStages(content.blocks), [content.blocks]);
  const stageCount = stages.length;
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
    track("lesson_stage_started", {
      stage: stages[next]?.label ?? "",
      stage_number: next + 1,
    });
  }

  function completeStage() {
    if (!completed.includes(active)) {
      setCompleted([...completed, active].sort((a, b) => a - b));
      track("lesson_stage_completed", {
        stage: stages[active]?.label ?? "",
        stage_number: active + 1,
      });
    }
    if (active < lastStage) selectStage(active + 1);
  }

  const stage = stages[active] ?? stages[0];
  if (!stage) return null;

  const percentage = Math.round((completed.length / stageCount) * 100);
  const minutesRemaining = stages.reduce(
    (total, entry, index) => total + (completed.includes(index) ? 0 : entry.minutes),
    0,
  );
  const nextStage = active < lastStage ? stages[active + 1] : undefined;
  const activityCta = content.blocks.find((block) => block.type === "activity_cta");
  const checkCta = content.blocks.find((block) => block.type === "check_cta");

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6">
      <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <nav aria-label="Lesson contents" className="lg:sticky lg:top-6 lg:self-start">
          <p className="eyebrow">Contents</p>
          <p className="mt-2 text-caption text-ink-muted">
            {percentage}% complete · about {minutesRemaining} min left
          </p>
          <div className="progress-track mt-2" aria-hidden="true">
            <div className="progress-fill" style={{ width: `${percentage}%` }} />
          </div>
          <ol className="mt-4 flex flex-col gap-1">
            {stages.map((entry, index) => {
              const done = completed.includes(index);
              return (
                <li key={entry.label}>
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
                    {entry.label}
                    <span className="sr-only">{done ? ", completed" : ", not started"}</span>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="mt-8 lg:mt-0">
          <div
            className={`rounded-(--radius-hero) border p-6 md:p-8 ${TONE_CLASSES[stage.tone] ?? TONE_CLASSES.compare}`}
          >
            <header>
              <p className="eyebrow">
                Stage {active + 1} of {stageCount} · about {stage.minutes} min
              </p>
              <h2
                ref={headingRef}
                tabIndex={-1}
                className="mt-2 font-display text-heading font-bold text-ink"
              >
                {stage.label}
              </h2>
              {stage.objective ? (
                <p className="mt-2 max-w-[62ch] text-body text-ink-muted">{stage.objective}</p>
              ) : null}
            </header>

            <div className="mt-6">
              {stage.blocks.map((block) => (
                <StageBlock key={block.id} block={block} content={content} />
              ))}
            </div>
          </div>

          <div className="mt-6 rounded-(--radius-card) border border-border bg-surface-card p-5">
            {stage.completion ? (
              <p className="text-body font-semibold text-success">
                <span aria-hidden="true">✓</span> {stage.completion}
              </p>
            ) : null}
            <div className={`flex flex-wrap items-center gap-4 ${stage.completion ? "mt-4" : ""}`}>
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
                  {nextStage ? `Continue to ${nextStage.label}` : "Continue"}
                </button>
              ) : (
                <Link
                  href={
                    activityCta
                      ? `${lessonRoute}/activity`
                      : checkCta
                        ? `${lessonRoute}/check`
                        : "/learn"
                  }
                  onClick={() => {
                    if (!completed.includes(active)) setCompleted([...completed, active]);
                    if (activityCta) track("continue_to_activity_clicked", {});
                  }}
                  className="inline-flex min-h-11 items-center rounded-(--radius-control) bg-primary px-5 py-2.5 text-body font-semibold text-surface-card hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {activityCta
                    ? activityCta.body
                    : checkCta
                      ? checkCta.body
                      : "Back to the pathway"}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** One block, rendered inside its stage. Order comes from the seed. */
function StageBlock({ block, content }: { block: LessonBlock; content: PublishedSection }) {
  switch (block.type) {
    case "hook":
      return <HookBlock prompt={block.prompt} choices={block.choices} reveal={block.reveal} />;
    case "why_it_matters":
      return (
        <div className="mt-6 first:mt-0">
          <RichTextView body={block.body} glossary={content.glossary} idPrefix={block.id} />
        </div>
      );
    case "objectives":
      return (
        <section aria-label="What you will be able to do" className="panel mt-6 p-5 first:mt-0">
          <p className="eyebrow">By the end of this section</p>
          <ul className="mt-3 flex flex-col gap-2 text-body text-ink-muted">
            {block.items.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true" className="text-primary">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      );
    case "concept":
      return (
        <>
          <section id={block.id.toLowerCase()} aria-label={block.title}>
            <RichTextView body={block.quick} glossary={content.glossary} idPrefix={block.id} />
          </section>
          {block.explore ? (
            <DepthPanel
              label={block.explore.label}
              minutes={block.explore.minutes}
              layer="explore"
              concept={block.id}
            >
              <RichTextView
                body={block.explore.body}
                glossary={content.glossary}
                idPrefix={`${block.id}-explore`}
              />
            </DepthPanel>
          ) : null}
          {block.deeper ? (
            <DepthPanel
              label={block.deeper.label}
              minutes={block.deeper.minutes}
              layer="deeper"
              concept={block.id}
            >
              <RichTextView
                body={block.deeper.body}
                glossary={content.glossary}
                idPrefix={`${block.id}-deeper`}
              />
            </DepthPanel>
          ) : null}
        </>
      );
    case "inline_check":
      return (
        <InlineCheck
          content={{
            id: block.id,
            prompt: block.prompt,
            correctOptionId: block.correctOptionId,
            options: block.options,
          }}
        />
      );
    case "diagram": {
      const figure = (
        <DiagramFigure
          title={block.title}
          claim={block.claim}
          altText={block.altText}
          longText={block.longText}
          layers={block.layers}
        />
      );
      return (
        <div id={block.id.toLowerCase()} className="mt-8">
          {block.predict ? (
            <PredictionGate
              id={block.id}
              prompt={block.predict.prompt}
              options={block.predict.options}
              revealLabel={block.predict.revealLabel ?? "Now check your prediction:"}
            >
              {figure}
            </PredictionGate>
          ) : (
            figure
          )}
        </div>
      );
    }
    case "misconception":
      return (
        <div id={`${block.id.toLowerCase()}-misconception`} className="mt-6">
          <Callout variant="warning" title="Common misconception">
            <p className="italic">{`"${block.claim}"`}</p>
            <p>{block.correction}</p>
          </Callout>
        </div>
      );
    case "takeaway":
      return (
        <div className="mt-8 rounded-(--radius-card) bg-primary-tint p-5">
          <p className="eyebrow">Take this with you</p>
          <div className="mt-2">
            <RichTextView body={block.body} glossary={content.glossary} idPrefix={block.id} />
          </div>
        </div>
      );
    case "next_step":
      return <p className="mt-6 text-body text-ink-muted">{block.body}</p>;
    // CTAs render as the closing action button, not inline content.
    case "activity_cta":
    case "check_cta":
      return null;
  }
}

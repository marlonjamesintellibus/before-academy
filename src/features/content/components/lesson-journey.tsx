"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { LessonBlock, PublishedSection } from "../types";
import { Callout } from "@/components/ui/callout";
import { UncertaintyCallout } from "@/components/ui/uncertainty-callout";
import { track } from "@/lib/analytics";
import { INLINE_CHECKS } from "../inline-checks";
import { ConceptDiagram } from "./diagrams/concept-diagram";
import { DiagramObservation } from "./diagrams/diagram-parts";
import { DepthPanel } from "./depth-panel";
import { DiagramFigure } from "./diagram-figure";
import { HookBlock } from "./hook-block";
import { InlineCheck } from "./inline-check";
import { LessonScrollTracker } from "./lesson-scroll-tracker";
import { RichTextView } from "./rich-text";

type ConceptBlock = Extract<LessonBlock, { type: "concept" }>;
type DiagramBlock = Extract<LessonBlock, { type: "diagram" }>;

const PROGRESS_KEY = "ba.v1.lesson.ai-automation-software";

const STAGES = [
  {
    label: "Start Here",
    title: "Look past the label",
    objective: "Use evidence - not appearances - to decide what kind of system you are looking at.",
    minutes: 3,
    completion: "You have the question that guides the whole lesson.",
    next: "Begin with Traditional Software",
    tone: "start",
  },
  {
    label: "Traditional Software",
    title: "Follow the written rules",
    objective: "Recognise predictable systems whose instructions were written in advance.",
    minutes: 4,
    completion: "You’ve identified how written rules work.",
    next: "Continue to Automation",
    tone: "rules",
  },
  {
    label: "Automation",
    title: "Follow the workflow",
    objective: "See how triggers connect predefined actions without making a judgment.",
    minutes: 4,
    completion: "You now know that automation does not automatically mean AI.",
    next: "Continue to Artificial Intelligence",
    tone: "automation",
  },
  {
    label: "Artificial Intelligence",
    title: "Follow the learned patterns",
    objective: "Recognise predictions, confidence, variation, and the possibility of error.",
    minutes: 5,
    completion: "You’ve separated learned patterns from written rules.",
    next: "Compare the Three",
    tone: "ai",
  },
  {
    label: "Compare and Apply",
    title: "Find each mechanism in the system",
    objective:
      "Classify the layer, explain your evidence, and know when the evidence is incomplete.",
    minutes: 4,
    completion: "You now have a practical way to evaluate AI claims.",
    next: "Start Sort the System",
    tone: "compare",
  },
] as const;

const HASH_TO_STAGE: Record<string, number> = {
  "#p1-lesson-002": 1,
  "#p1-lesson-003": 2,
  "#p1-lesson-004": 3,
  "#p1-lesson-005": 4,
  "#p1-dgm-001": 4,
};

const TONE_CLASSES = {
  start: "border-primary/25 bg-gradient-to-br from-primary-tint to-surface-card",
  rules: "border-sky bg-surface-card",
  automation: "border-primary/25 bg-gradient-to-b from-surface-card to-primary-tint/40",
  ai: "border-navy/20 bg-gradient-to-br from-surface-card via-surface-card to-sky/30",
  compare: "border-primary/25 bg-surface-card",
} as const;

function isSavedProgress(value: unknown): value is { active: number; completed: number[] } {
  if (!value || typeof value !== "object") return false;
  const candidate = value as { active?: unknown; completed?: unknown };
  return (
    typeof candidate.active === "number" &&
    candidate.active >= 0 &&
    candidate.active < STAGES.length &&
    Array.isArray(candidate.completed) &&
    candidate.completed.every((item) => typeof item === "number")
  );
}

function LessonProgress({
  active,
  completed,
  onSelect,
  variant,
}: {
  active: number;
  completed: number[];
  onSelect: (index: number) => void;
  variant: "mobile" | "desktop";
}) {
  const [outlineOpen, setOutlineOpen] = useState(false);
  const percentage = Math.round((completed.length / STAGES.length) * 100);
  const minutesRemaining = STAGES.reduce(
    (total, stage, index) => total + (completed.includes(index) ? 0 : stage.minutes),
    0,
  );

  const outline = (
    <ol className="mt-4 space-y-1" aria-label="Lesson stages">
      {STAGES.map((stage, index) => {
        const done = completed.includes(index);
        const current = active === index;
        return (
          <li key={stage.label}>
            <button
              type="button"
              aria-current={current ? "step" : undefined}
              onClick={() => {
                onSelect(index);
                setOutlineOpen(false);
              }}
              className={`flex min-h-11 w-full items-center gap-3 rounded-(--radius-control) px-3 py-2 text-left text-body transition-colors focus-visible:outline-2 focus-visible:outline-primary ${
                current
                  ? "bg-primary-tint font-semibold text-primary"
                  : "text-ink-muted hover:bg-surface-alt hover:text-ink"
              }`}
            >
              <span
                aria-hidden="true"
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-caption font-bold ${
                  done
                    ? "bg-success text-white"
                    : current
                      ? "bg-primary text-white"
                      : "bg-surface-alt text-ink-muted"
                }`}
              >
                {done ? "✓" : index + 1}
              </span>
              <span>{stage.label}</span>
            </button>
          </li>
        );
      })}
    </ol>
  );

  if (variant === "mobile") {
    return (
      <nav
        aria-label="Lesson progress"
        className="sticky top-0 z-30 -mx-4 border-y border-border bg-surface-card/95 px-4 py-3 shadow-sm backdrop-blur lg:hidden"
      >
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p className="truncate text-caption font-bold text-ink">
              {(STAGES[active] ?? STAGES[0]).label}
            </p>
            <p className="text-caption text-ink-muted">
              Stage {active + 1} of {STAGES.length} · {percentage}% complete
            </p>
          </div>
          <button
            type="button"
            aria-expanded={outlineOpen}
            aria-controls="mobile-lesson-outline"
            onClick={() => setOutlineOpen((value) => !value)}
            className="min-h-11 rounded-(--radius-control) border border-primary px-3 text-body font-semibold text-primary hover:bg-primary-tint focus-visible:outline-2 focus-visible:outline-primary"
          >
            Outline
          </button>
        </div>
        <div className="progress-track mt-2" aria-hidden="true">
          <div className="progress-fill" style={{ width: `${percentage}%` }} />
        </div>
        <div id="mobile-lesson-outline" hidden={!outlineOpen}>
          {outline}
          <Link
            href="/learn"
            className="mt-3 inline-flex min-h-11 items-center text-body font-semibold text-primary"
          >
            Exit and resume later
          </Link>
        </div>
      </nav>
    );
  }

  return (
    <nav
      aria-label="Lesson progress"
      className="sticky top-6 hidden h-fit w-64 shrink-0 self-start rounded-(--radius-hero) border border-border bg-surface-card p-4 shadow-(--shadow-card) lg:block"
    >
      <p className="eyebrow">Lesson progress</p>
      <p className="mt-2 font-display text-subheading font-bold">{percentage}% complete</p>
      <div className="progress-track mt-3" aria-hidden="true">
        <div className="progress-fill" style={{ width: `${percentage}%` }} />
      </div>
      <p className="mt-2 text-caption text-ink-muted">About {minutesRemaining} min remaining</p>
      {outline}
      <Link
        href="/learn"
        className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-(--radius-control) border border-border px-3 text-body font-semibold text-ink-muted hover:border-primary hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
      >
        Exit and resume later
      </Link>
    </nav>
  );
}

function ConceptStage({
  concept,
  glossary,
}: {
  concept: ConceptBlock;
  glossary: PublishedSection["glossary"];
}) {
  const check =
    concept.title === "Traditional software"
      ? INLINE_CHECKS.rules
      : concept.title === "Automation"
        ? INLINE_CHECKS.automation
        : concept.title === "Artificial intelligence"
          ? INLINE_CHECKS.ai
          : null;
  return (
    <section id={concept.id.toLowerCase()} aria-label={concept.title}>
      <RichTextView body={concept.quick} glossary={glossary} idPrefix={concept.id} />
      <ConceptDiagram blockId={concept.id} />
      {concept.title === "Traditional software" ? (
        <MemoryCallback title="Remember the vending machine">
          Complexity does not turn written rules into AI.
        </MemoryCallback>
      ) : null}
      {concept.title === "Automation" ? (
        <MemoryCallback title="Remember the dominoes">
          Automation connects predefined actions, but it does not decide what the goal should be.
        </MemoryCallback>
      ) : null}
      {concept.title === "Artificial intelligence" ? (
        <MemoryCallback title="Remember the weather forecast">
          AI can estimate what is likely without understanding why the outcome matters to you.
        </MemoryCallback>
      ) : null}
      {concept.explore ? (
        <DepthPanel
          layer="explore"
          concept={concept.id}
          label={concept.explore.label}
          minutes={concept.explore.minutes}
        >
          <RichTextView
            body={concept.explore.body}
            glossary={glossary}
            idPrefix={`${concept.id}-explore`}
          />
        </DepthPanel>
      ) : null}
      {concept.deeper ? (
        <DepthPanel
          layer="deeper"
          concept={concept.id}
          label={concept.deeper.label}
          minutes={concept.deeper.minutes}
        >
          <RichTextView
            body={concept.deeper.body}
            glossary={glossary}
            idPrefix={`${concept.id}-deeper`}
          />
        </DepthPanel>
      ) : null}
      {check ? <InlineCheck content={check} /> : null}
    </section>
  );
}

function MemoryCallback({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <aside className="mt-5 flex gap-3 rounded-(--radius-control) bg-navy px-4 py-3 text-surface-card">
      <span aria-hidden="true" className="text-sky">
        ↺
      </span>
      <p className="text-body">
        <strong>{title}.</strong> <span className="text-sky">{children}</span>
      </p>
    </aside>
  );
}

const COMPARISON = [
  {
    label: "Traditional Software",
    mechanism: "Written rules",
    points: [
      "Same input usually produces the same result",
      "Does not learn from examples",
      "Calculator or vending machine",
    ],
    symbol: "IF → THEN",
  },
  {
    label: "Automation",
    mechanism: "Predefined tasks",
    points: ["Starts from a trigger", "Runs a repeatable sequence", "Scheduled email workflow"],
    symbol: "TRIGGER → STEPS",
  },
  {
    label: "Artificial Intelligence",
    mechanism: "Learned patterns",
    points: [
      "Produces likely outputs and can vary",
      "Can be useful and wrong",
      "Spam filter or recommendation",
    ],
    symbol: "PATTERN → LIKELIHOOD",
  },
] as const;

const COMPARE_SCENARIOS = [
  {
    id: "invoice",
    label: "Invoice total",
    prompt: "A customer submits three line items and needs a total.",
    responses: [
      "Adds the values with written arithmetic",
      "Could trigger a receipt after submission",
      "Not needed from the evidence given",
    ],
    conclusion:
      "The calculation itself is traditional software. If submission triggers a receipt, that separate step is automation.",
  },
  {
    id: "support",
    label: "Support sorting",
    prompt: "A platform automatically sorts messages, but does not say how.",
    responses: [
      "Could follow keyword rules",
      "Routes each message without a person",
      "Could use learned classification",
    ],
    conclusion:
      "Automation is visible, but there is not enough information to decide whether the sorting mechanism is rules or AI.",
  },
  {
    id: "arrival",
    label: "Arrival estimate",
    prompt: "A navigation app updates an arrival prediction as traffic changes.",
    responses: [
      "Applies map and routing constraints",
      "Refreshes when live data arrives",
      "Predicts a likely arrival time from patterns",
    ],
    conclusion:
      "This is a combined system: rules, automation, and a pattern-based prediction cooperate.",
  },
] as const;

function ComparisonVisual() {
  const [scenarioId, setScenarioId] = useState<string>(COMPARE_SCENARIOS[0].id);
  const scenario =
    COMPARE_SCENARIOS.find((entry) => entry.id === scenarioId) ?? COMPARE_SCENARIOS[0];
  return (
    <section aria-labelledby="comparison-title" className="mt-2">
      <h3 id="comparison-title" className="font-display text-subheading font-bold">
        Three mechanisms at a glance
      </h3>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {COMPARISON.map((item, index) => (
          <article
            key={item.label}
            className={`overflow-hidden rounded-(--radius-hero) border ${
              index === 0
                ? "border-border bg-surface-card"
                : index === 1
                  ? "border-primary/30 bg-primary-tint"
                  : "border-navy/30 bg-navy text-surface-card"
            }`}
          >
            <div className="p-5">
              <p
                className={`text-caption font-bold uppercase tracking-wider ${index === 2 ? "text-sky" : "text-primary"}`}
              >
                {item.mechanism}
              </p>
              <h4 className="mt-2 font-display text-subheading font-bold">{item.label}</h4>
              <p
                className={`mt-4 rounded-(--radius-control) px-3 py-2 font-mono text-caption font-bold ${index === 2 ? "bg-white/10 text-sky" : "bg-surface-alt text-ink"}`}
              >
                {item.symbol}
              </p>
              <ul
                className={`mt-4 space-y-3 text-body ${index === 2 ? "text-sky" : "text-ink-muted"}`}
              >
                {item.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span
                      aria-hidden="true"
                      className={index === 2 ? "text-white" : "text-primary"}
                    >
                      ✓
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
      <p className="mt-5 rounded-(--radius-control) bg-primary px-5 py-4 text-body font-semibold text-white">
        Automation and AI answer different questions. A system can use one, both, or neither.
      </p>
      <section
        className="mt-6 rounded-(--radius-hero) border border-border bg-surface-alt p-5"
        aria-labelledby="compare-scenario-title"
      >
        <h4 id="compare-scenario-title" className="font-display text-subheading font-bold">
          Compare one scenario three ways
        </h4>
        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Choose a scenario">
          {COMPARE_SCENARIOS.map((entry) => (
            <button
              key={entry.id}
              type="button"
              aria-pressed={entry.id === scenario.id}
              onClick={() => {
                setScenarioId(entry.id);
                track("diagram_component_opened", { component: `compare-${entry.id}` });
              }}
              className={`min-h-11 rounded-(--radius-control) border px-4 text-body font-semibold focus-visible:outline-2 focus-visible:outline-primary ${entry.id === scenario.id ? "border-primary bg-primary text-white" : "border-border bg-surface-card text-ink hover:border-primary"}`}
            >
              {entry.label}
            </button>
          ))}
        </div>
        <p className="mt-4 text-body font-semibold">{scenario.prompt}</p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {COMPARISON.map((item, index) => (
            <article
              key={item.label}
              className="rounded-(--radius-control) border border-border bg-surface-card p-4"
            >
              <p className="text-caption font-bold uppercase tracking-wide text-primary">
                {item.mechanism}
              </p>
              <p className="mt-2 text-body">{scenario.responses[index]}</p>
            </article>
          ))}
        </div>
        <p
          className="mt-4 rounded-(--radius-control) bg-warning-tint p-4 text-body"
          aria-live="polite"
        >
          <strong>Best-supported conclusion:</strong> {scenario.conclusion}
        </p>
        <DiagramObservation>
          What extra evidence would you need before calling an automatically sorted ticket AI?
        </DiagramObservation>
      </section>
    </section>
  );
}

const EXAMPLES = [
  {
    title: "Banking",
    flow: [
      "Rules: balances",
      "Automation: scheduled transfer",
      "AI: fraud-risk flag",
      "Human: reviews disputes",
    ],
  },
  {
    title: "Navigation",
    flow: [
      "Rules: map and turns",
      "Automation: rerouting",
      "AI: predicted arrival",
      "Human: chooses the route",
    ],
  },
  {
    title: "Customer support",
    flow: [
      "Rules: stores request",
      "Automation: routes ticket",
      "AI: classifies topic",
      "Human: decides and replies",
    ],
  },
] as const;

const MORE_EXAMPLES = [
  {
    title: "Healthcare",
    body: "Rules keep appointments; automation sends reminders; AI may suggest likely causes; a clinician must review high-risk decisions.",
  },
  {
    title: "Online shopping",
    body: "Rules manage prices and stock; automation sends receipts; AI may rank recommendations; people choose what to buy.",
  },
  {
    title: "Email",
    body: "Rules store folders; automation sends out-of-office replies; AI filters spam; people review uncertain messages.",
  },
] as const;

function CombinedExamples() {
  const [open, setOpen] = useState(false);
  return (
    <section aria-labelledby="examples-title" className="mt-8">
      <h3 id="examples-title" className="font-display text-subheading font-bold">
        One product, several mechanisms
      </h3>
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        {EXAMPLES.map((example) => (
          <article
            key={example.title}
            className="rounded-(--radius-card) border border-border bg-surface-alt p-4"
          >
            <h4 className="font-display text-body font-bold text-ink">{example.title}</h4>
            <ol className="mt-3 space-y-2 text-caption text-ink-muted">
              {example.flow.map((step, index) => (
                <li key={step} className="flex gap-2">
                  <span aria-hidden="true" className="font-bold text-primary">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </article>
        ))}
      </div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="more-combined-examples"
        onClick={() => {
          const next = !open;
          setOpen(next);
          if (next) track("layer_expanded", { layer: "explore", concept: "combined-examples" });
        }}
        className="mt-4 min-h-11 text-body font-semibold text-primary underline decoration-2 underline-offset-4 focus-visible:outline-2 focus-visible:outline-primary"
      >
        {open ? "Hide the extra examples" : "Explore three more examples"}
      </button>
      <div id="more-combined-examples" hidden={!open} className="mt-3 grid gap-3 md:grid-cols-3">
        {MORE_EXAMPLES.map((example) => (
          <article
            key={example.title}
            className="rounded-(--radius-control) border border-border bg-surface-card p-4"
          >
            <h4 className="font-semibold">{example.title}</h4>
            <p className="mt-2 text-body text-ink-muted">{example.body}</p>
          </article>
        ))}
        <p className="text-caption text-ink-muted md:col-span-3">
          Learning platforms follow the same pattern: records and certificates can be rules,
          reminders can be automation, and recommendations may - or may not - use learned patterns.
        </p>
      </div>
    </section>
  );
}

const TAKEAWAYS = [
  "Traditional software follows written rules",
  "Automation runs predefined sequences",
  "AI applies learned patterns",
  "Automation does not automatically mean AI",
  "Most AI products combine several technologies",
  "AI outputs can be uncertain or wrong",
  "Sometimes there is not enough information to classify a system",
] as const;

function KeyTakeaways() {
  return (
    <section
      id="key-takeaways"
      className="mt-8 rounded-(--radius-hero) bg-navy p-6 text-surface-card"
    >
      <p className="eyebrow !text-sky">Visual recap</p>
      <h3 className="mt-2 font-display text-heading font-bold">Seven ideas worth keeping</h3>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {TAKEAWAYS.map((item) => (
          <li
            key={item}
            className="flex gap-3 rounded-(--radius-control) bg-white/8 p-3 text-body text-sky"
          >
            <span aria-hidden="true" className="font-bold text-white">
              ✓
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function CompareStage({
  concept,
  diagram,
  misconception,
  glossary,
}: {
  concept: ConceptBlock;
  diagram: DiagramBlock | undefined;
  misconception: Extract<LessonBlock, { type: "misconception" }> | undefined;
  glossary: PublishedSection["glossary"];
}) {
  return (
    <>
      <section id={concept.id.toLowerCase()}>
        <ComparisonVisual />
        <RichTextView
          body={concept.quick.slice(5)}
          glossary={glossary}
          idPrefix={`${concept.id}-combined`}
        />
      </section>
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
      <CombinedExamples />
      <UncertaintyCallout
        title="Good AI judgment includes knowing when there is not enough evidence."
        known="The feature’s visible behaviour."
        unknown="Whether it follows rules or learned patterns."
        question="What was learned, from what data, to make this output?"
      />
      {misconception ? (
        <div className="mt-6">
          <Callout variant="warning" title="Remember the vending machine">
            <p className="italic">“{misconception.claim}”</p>
            <p>{misconception.correction}</p>
          </Callout>
        </div>
      ) : null}
      <KeyTakeaways />
      <InlineCheck content={INLINE_CHECKS.compare} />
      <LessonScrollTracker />
    </>
  );
}

function StageTransition({
  stage,
  isFinal,
  lessonRoute,
  onContinue,
  onPrevious,
}: {
  stage: (typeof STAGES)[number];
  isFinal: boolean;
  lessonRoute: string;
  onContinue: () => void;
  onPrevious: () => void;
}) {
  if (isFinal) {
    return (
      <section
        className="mt-8 rounded-(--radius-hero) border border-primary/30 bg-primary-tint p-6"
        aria-labelledby="lesson-next-title"
      >
        <span
          aria-hidden="true"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-success text-xl font-bold text-white"
        >
          ✓
        </span>
        <h3 id="lesson-next-title" className="mt-4 font-display text-heading font-bold">
          Ready to apply it?
        </h3>
        <p className="mt-2 text-body text-ink-muted">
          Practise classifying real examples as traditional software, automation, AI, or not enough
          information.
        </p>
        <Link
          href={`${lessonRoute}/activity`}
          onClick={() => {
            onContinue();
            track("continue_to_activity_clicked");
          }}
          className="mt-5 inline-flex min-h-12 items-center rounded-(--radius-control) bg-primary px-6 py-3 text-body font-semibold text-white shadow-(--shadow-card) hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Start Sort the System
        </Link>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-body">
          <a href="#key-takeaways" className="text-primary underline-offset-4 hover:underline">
            Review key takeaways
          </a>
          <button
            type="button"
            onClick={onPrevious}
            className="text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-primary"
          >
            Return to Artificial Intelligence
          </button>
        </div>
      </section>
    );
  }

  return (
    <footer className="mt-8 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-body font-semibold text-success">
          <span aria-hidden="true">✓</span> {stage.completion}
        </p>
        <p className="mt-1 text-caption text-ink-muted">Your place is saved on this device.</p>
      </div>
      <button
        type="button"
        onClick={onContinue}
        className="inline-flex min-h-12 items-center justify-center rounded-(--radius-control) bg-primary px-5 py-3 text-body font-semibold text-white hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {stage.next}{" "}
        <span aria-hidden="true" className="ml-2">
          →
        </span>
      </button>
    </footer>
  );
}

export function LessonJourney({
  content,
  lessonRoute,
}: {
  content: PublishedSection;
  lessonRoute: string;
}) {
  const [active, setActive] = useState(0);
  const [completed, setCompleted] = useState<number[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const hook = content.blocks.find((block) => block.type === "hook");
  const why = content.blocks.find((block) => block.type === "why_it_matters");
  const objectives = content.blocks.find((block) => block.type === "objectives");
  const concepts = content.blocks.filter(
    (block): block is ConceptBlock => block.type === "concept",
  );
  const diagram = content.blocks.find((block): block is DiagramBlock => block.type === "diagram");
  const misconception = content.blocks.find((block) => block.type === "misconception");
  const stage = STAGES[active] ?? STAGES[0];

  const conceptByStage = useMemo(
    () =>
      new Map([
        [1, concepts[0]],
        [2, concepts[1]],
        [3, concepts[2]],
        [4, concepts[3]],
      ]),
    [concepts],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      let nextActive = HASH_TO_STAGE[window.location.hash.toLowerCase()] ?? 0;
      try {
        const raw = window.localStorage.getItem(PROGRESS_KEY);
        const parsed: unknown = raw ? JSON.parse(raw) : null;
        if (isSavedProgress(parsed) && !window.location.hash) {
          nextActive = parsed.active;
          setCompleted([
            ...new Set(parsed.completed.filter((item) => item >= 0 && item < STAGES.length)),
          ]);
          if (parsed.active > 0 || parsed.completed.length > 0) {
            track("lesson_resumed", { stage: (STAGES[parsed.active] ?? STAGES[0]).label });
          }
        }
      } catch {
        // Storage is optional; the lesson remains fully usable when it is unavailable.
      }
      setActive(nextActive);
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(
        PROGRESS_KEY,
        JSON.stringify({ active, completed, updatedAt: Date.now() }),
      );
    } catch {
      // Private browsing or blocked storage should not interrupt learning.
    }
  }, [active, completed, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    track("lesson_stage_started", {
      stage: (STAGES[active] ?? STAGES[0]).label,
      stage_number: active + 1,
    });
  }, [active, hydrated]);

  function selectStage(index: number) {
    if (index === active) return;
    setActive(index);
    requestAnimationFrame(() => headingRef.current?.focus());
  }

  function completeCurrent() {
    if (!completed.includes(active)) {
      const nextCompleted = [...completed, active].sort((a, b) => a - b);
      setCompleted(nextCompleted);
      try {
        window.localStorage.setItem(
          PROGRESS_KEY,
          JSON.stringify({ active, completed: nextCompleted, updatedAt: Date.now() }),
        );
      } catch {
        // Completion remains in memory if storage is unavailable.
      }
      track("lesson_stage_completed", { stage: stage.label, stage_number: active + 1 });
    }
  }

  function continueForward() {
    completeCurrent();
    if (active < STAGES.length - 1) selectStage(active + 1);
  }

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6">
      <LessonProgress
        active={active}
        completed={completed}
        onSelect={selectStage}
        variant="mobile"
      />
      <div className="mt-6 flex items-start gap-8 lg:mt-0">
        <LessonProgress
          active={active}
          completed={completed}
          onSelect={selectStage}
          variant="desktop"
        />
        <article className="min-w-0 flex-1 pb-16">
          <section
            id="lesson-stage"
            aria-labelledby="active-stage-title"
            className={`rounded-(--radius-hero) border p-5 shadow-(--shadow-card) sm:p-7 lg:p-9 ${TONE_CLASSES[stage.tone]}`}
          >
            <header className="border-b border-border pb-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="eyebrow">
                  Stage {active + 1} of {STAGES.length} · {stage.label}
                </p>
                <p className="text-caption font-medium text-ink-muted">About {stage.minutes} min</p>
              </div>
              <h2
                ref={headingRef}
                tabIndex={-1}
                id="active-stage-title"
                className="mt-3 text-heading font-bold focus:outline-none sm:text-[1.75rem] sm:leading-9"
              >
                {stage.title}
              </h2>
              <p className="mt-2 max-w-[62ch] text-body text-ink-muted">{stage.objective}</p>
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
                    <details className="mt-6 rounded-(--radius-card) border border-border bg-surface-card p-4">
                      <summary className="cursor-pointer text-body font-semibold text-primary">
                        Three outcomes for this lesson
                      </summary>
                      <ul className="mt-3 space-y-2 text-body text-ink-muted">
                        {objectives.items.slice(0, 3).map((item) => (
                          <li key={item} className="flex gap-2">
                            <span aria-hidden="true" className="text-primary">
                              ✓
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                      <details className="mt-3">
                        <summary className="cursor-pointer text-caption font-semibold text-ink-muted">
                          See two additional outcomes
                        </summary>
                        <ul className="mt-2 list-disc space-y-1 pl-5 text-caption text-ink-muted">
                          {objectives.items.slice(3).map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </details>
                    </details>
                  ) : null}
                </>
              ) : active < 4 ? (
                conceptByStage.get(active) ? (
                  <ConceptStage concept={conceptByStage.get(active)!} glossary={content.glossary} />
                ) : null
              ) : conceptByStage.get(4) ? (
                <CompareStage
                  concept={conceptByStage.get(4)!}
                  diagram={diagram}
                  misconception={misconception}
                  glossary={content.glossary}
                />
              ) : null}
            </div>

            <StageTransition
              stage={stage}
              isFinal={active === STAGES.length - 1}
              lessonRoute={lessonRoute}
              onContinue={continueForward}
              onPrevious={() => selectStage(Math.max(0, active - 1))}
            />
          </section>
        </article>
      </div>
    </div>
  );
}

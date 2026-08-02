"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { PublishedScenario } from "@/features/content";
import { CATEGORY_LABELS, SCENARIO_CATEGORIES } from "@/features/content";
import type { ScenarioCategory } from "@/features/content";
import { track } from "@/lib/analytics";
import { useActivityState } from "../use-activity-state";

/**
 * S04 Sort the System player (docs/product/screens/activity-and-check.md):
 * one scenario card at a time, five answer buttons (radiogroup), two-step
 * select → Check → feedback panel (focus moves, aria-live), Review this
 * concept on wrong answers, Continue advances. No timer; completion, not
 * score, advances (binding design decisions). Buttons only (ADR-010).
 */
export function ActivityPlayer({
  scenarios,
  intro,
  instructions,
  lessonRoute,
}: {
  scenarios: PublishedScenario[];
  intro: string;
  instructions: string;
  lessonRoute: string;
}) {
  const { state, hydrated, update, retry } = useActivityState();
  const [selected, setSelected] = useState<ScenarioCategory | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [started, setStarted] = useState(false);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const startedEvent = useRef(false);

  const ordered = state.order
    ? state.order.flatMap((id) => scenarios.filter((entry) => entry.id === id))
    : scenarios;
  const total = ordered.length;
  const scenario = ordered[state.index];
  const answeredCount = Object.keys(state.answers).length;

  useEffect(() => {
    if (showFeedback) feedbackRef.current?.focus();
  }, [showFeedback]);

  if (!hydrated) return null;

  const resumed = answeredCount > 0 && !state.completed;
  if (!started && !resumed) {
    return (
      <div className="panel p-6">
        <p className="text-body">{intro}</p>
        <p className="mt-3 text-body font-medium">{instructions}</p>
        <button
          type="button"
          onClick={() => {
            setStarted(true);
            if (!startedEvent.current) {
              startedEvent.current = true;
              track("activity_started");
            }
          }}
          className="mt-5 inline-flex min-h-11 items-center rounded-(--radius-control) bg-primary px-5 py-2.5 text-body font-semibold text-surface hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Start sorting
        </button>
      </div>
    );
  }

  if (state.completed || !scenario) {
    const pairIds = scenarios
      .filter((entry) => entry.position === 6 || entry.position === 7)
      .sort((a, b) => a.position - b.position)
      .map((entry) => entry.id);
    return (
      <ActivitySummary
        scenarios={scenarios}
        answers={state.answers}
        lessonRoute={lessonRoute}
        onRetry={() =>
          retry(
            scenarios.map((entry) => entry.id),
            [pairIds[0] ?? "", pairIds[1] ?? ""],
          )
        }
      />
    );
  }

  const answer = state.answers[scenario.id];

  function checkAnswer() {
    if (!selected || !scenario) return;
    const correct = selected === scenario.correctCategory || scenario.accepted.includes(selected);
    update({
      ...state,
      answers: {
        ...state.answers,
        [scenario.id]: { chosen: selected, correct, skipped: false },
      },
    });
    setShowFeedback(true);
    track("scenario_answered", {
      scenario_id: scenario.id,
      chosen: selected,
      correct,
      attempt: 1,
    });
  }

  function advance(skip: boolean) {
    if (!scenario) return;
    const nextAnswers = skip
      ? { ...state.answers, [scenario.id]: { chosen: "", correct: false, skipped: true } }
      : state.answers;
    const nextIndex = state.index + 1;
    const completed = nextIndex >= total;
    update({ answers: nextAnswers, index: completed ? state.index : nextIndex, completed });
    setSelected(null);
    setShowFeedback(false);
    if (completed) {
      const score = Object.values(nextAnswers).filter((entry) => entry.correct).length;
      track("activity_completed", { score, total });
    }
  }

  return (
    <div>
      <p className="text-caption font-medium text-ink-muted" aria-live="polite">
        Scenario {state.index + 1} of {total}
      </p>
      <div className="progress-track mt-2" aria-hidden="true">
        <div className="progress-fill" style={{ width: `${(state.index / total) * 100}%` }} />
      </div>

      <div className="panel mt-4 p-6">
        <h2 className="sr-only">{scenario.title}</h2>
        <p className="text-body">{scenario.body}</p>

        <fieldset className="mt-6" disabled={showFeedback || Boolean(answer)}>
          <legend className="sr-only">Pick the best label</legend>
          <div className="flex flex-col gap-2 md:grid md:grid-cols-2">
            {SCENARIO_CATEGORIES.map((category) => (
              <label
                key={category}
                className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-(--radius-control) border px-4 py-2 text-body has-focus-visible:outline-2 has-focus-visible:outline-primary ${
                  selected === category
                    ? "border-primary bg-highlight"
                    : "border-surface-alt hover:border-primary"
                }`}
              >
                <input
                  type="radio"
                  name={`scenario-${scenario.id}`}
                  value={category}
                  checked={selected === category}
                  onChange={() => setSelected(category)}
                  className="accent-primary"
                />
                {CATEGORY_LABELS[category]}
              </label>
            ))}
          </div>
        </fieldset>

        {!showFeedback && !answer ? (
          <div className="mt-5 flex gap-4">
            <button
              type="button"
              onClick={checkAnswer}
              disabled={!selected}
              className="inline-flex min-h-11 items-center rounded-(--radius-control) bg-primary px-5 py-2.5 text-body font-semibold text-surface hover:bg-primary-strong disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Check
            </button>
            <button
              type="button"
              onClick={() => advance(true)}
              className="min-h-11 text-body text-ink-muted underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-primary"
            >
              Skip for now
            </button>
          </div>
        ) : null}

        {showFeedback || answer ? (
          <div
            ref={feedbackRef}
            tabIndex={-1}
            aria-live="polite"
            className="mt-6 rounded-(--radius-control) bg-surface-alt p-5"
          >
            <ScenarioFeedback
              scenario={scenario}
              distractorClues={ordered
                .filter((entry) => entry.id !== scenario.id)
                .slice(0, 2)
                .map((entry) => entry.clue)}
              chosen={(answer?.chosen as ScenarioCategory) ?? selected ?? scenario.correctCategory}
              lessonRoute={lessonRoute}
            />
            <button
              type="button"
              onClick={() => advance(false)}
              className="mt-4 inline-flex min-h-11 items-center rounded-(--radius-control) bg-primary px-5 py-2.5 text-body font-semibold text-surface hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Continue
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ScenarioFeedback({
  scenario,
  chosen,
  lessonRoute,
  distractorClues,
}: {
  scenario: PublishedScenario;
  chosen: ScenarioCategory;
  lessonRoute: string;
  distractorClues: string[];
}) {
  const correct = chosen === scenario.correctCategory || scenario.accepted.includes(chosen);
  return (
    <div>
      <p className={`text-body font-semibold ${correct ? "text-success" : "text-danger"}`}>
        <span aria-hidden="true">{correct ? "✓" : "✗"}</span> {correct ? "Correct" : "Not quite"}
      </p>
      <dl className="mt-3 grid gap-2 rounded-(--radius-control) bg-surface-card p-3 text-body sm:grid-cols-2">
        <div>
          <dt className="text-caption font-semibold text-ink-muted">Your classification</dt>
          <dd className="font-semibold">{CATEGORY_LABELS[chosen]}</dd>
        </div>
        <div>
          <dt className="text-caption font-semibold text-ink-muted">Best-supported answer</dt>
          <dd className="font-semibold">{CATEGORY_LABELS[scenario.correctCategory]}</dd>
        </div>
      </dl>
      <p className="mt-2 text-body">{scenario.feedback[chosen]}</p>
      <EvidenceStep scenario={scenario} distractorClues={distractorClues} />
      {scenario.ambiguityNote ? (
        <p className="mt-2 text-body text-ink-muted">{scenario.ambiguityNote}</p>
      ) : null}
      {scenario.explanation ? <p className="mt-2 text-body">{scenario.explanation}</p> : null}
      {!correct ? (
        <Link
          href={`${lessonRoute}#${scenario.remediationAnchor.toLowerCase()}`}
          onClick={() => track("feedback_review_link_clicked", { scenario_id: scenario.id })}
          className="mt-3 inline-block text-body font-semibold text-primary underline-offset-4 hover:underline"
        >
          Review this concept
        </Link>
      ) : null}
    </div>
  );
}

/**
 * Evidence second step (experience-plan Phase B): after the verdict, the
 * learner picks WHICH detail settles the classification - testing the
 * judgment the lesson claims to teach, not just recognition.
 */
function EvidenceStep({
  scenario,
  distractorClues,
}: {
  scenario: PublishedScenario;
  distractorClues: string[];
}) {
  const [picked, setPicked] = useState<string | null>(null);
  // Deterministic order: alternate distractors around the real clue by id hash.
  const options = [...distractorClues.slice(0, 2), scenario.clue].sort((a, b) =>
    a.length === b.length ? a.localeCompare(b) : a.length - b.length,
  );

  if (picked !== null) {
    const wasRight = picked === scenario.clue;
    return (
      <div className="mt-3 rounded-(--radius-control) bg-surface-card p-3" aria-live="polite">
        <p className={`text-body font-semibold ${wasRight ? "text-success" : "text-warning"}`}>
          {wasRight ? "That is the settling detail." : "Close - the settling detail is:"}
        </p>
        <p className="mt-1 text-body">
          <strong>Key evidence:</strong> {scenario.clue}
        </p>
      </div>
    );
  }

  return (
    <fieldset className="mt-3 rounded-(--radius-control) bg-surface-card p-3">
      <legend className="text-body font-semibold">Which detail settles it?</legend>
      <div className="mt-2 flex flex-col gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => {
              setPicked(option);
              track("evidence_selected", {
                scenario_id: scenario.id,
                correct: option === scenario.clue,
              });
            }}
            className="min-h-11 rounded-(--radius-control) border border-border bg-surface-card px-3 py-2 text-left text-body hover:border-primary focus-visible:outline-2 focus-visible:outline-primary"
          >
            {option}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function ActivitySummary({
  scenarios,
  answers,
  lessonRoute,
  onRetry,
}: {
  scenarios: PublishedScenario[];
  answers: Record<string, { chosen: string; correct: boolean; skipped: boolean }>;
  lessonRoute: string;
  onRetry: () => void;
}) {
  const byCategory = new Map<ScenarioCategory, { correct: number; total: number }>();
  for (const scenario of scenarios) {
    const tally = byCategory.get(scenario.correctCategory) ?? { correct: 0, total: 0 };
    tally.total += 1;
    if (answers[scenario.id]?.correct) tally.correct += 1;
    byCategory.set(scenario.correctCategory, tally);
  }
  const skipped = scenarios.filter((scenario) => answers[scenario.id]?.skipped);

  return (
    <div className="panel p-6">
      <h2 className="text-heading font-bold">Nice sorting</h2>
      <p className="mt-2 text-body text-ink-muted">
        Here is how the set went, category by category.
      </p>
      <ul className="mt-4 flex flex-col gap-2">
        {[...byCategory.entries()].map(([category, tally]) => (
          <li key={category} className="flex justify-between text-body">
            <span>{CATEGORY_LABELS[category]}</span>
            <span className="text-ink-muted">
              {tally.correct} of {tally.total} correct
            </span>
          </li>
        ))}
      </ul>
      {skipped.length > 0 ? (
        <p className="mt-4 text-body text-ink-muted">
          Skipped: {skipped.map((scenario) => scenario.title).join(", ")}. Try the set again to
          revisit them.
        </p>
      ) : null}
      <div className="mt-6 flex flex-wrap gap-4">
        <div>
          <Link
            href={`${lessonRoute}/check`}
            className="inline-flex min-h-11 items-center rounded-(--radius-control) bg-primary px-5 py-2.5 text-body font-semibold text-surface hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Take the Knowledge Check
          </Link>
          <p className="mt-2 max-w-[42ch] text-caption text-ink-muted">
            Answer four practice questions and receive immediate explanations.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            track("interaction_retry_selected", { interaction: "sort-the-system" });
            onRetry();
          }}
          className="min-h-11 text-body text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-primary"
        >
          Try the set again
        </button>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { PublishedCheckQuestion } from "@/features/content";
import { track } from "@/lib/analytics";
import { useCheckState } from "../use-check-state";

export function CheckPlayer({
  questions,
  intro,
  completion,
  lessonRoute,
  storageKey,
}: {
  questions: PublishedCheckQuestion[];
  intro: string;
  completion: string;
  lessonRoute: string;
  /** Device key; defaults to the first section's original key. */
  storageKey?: string;
}) {
  const { state, hydrated, update, retry } = useCheckState(storageKey);
  const [answerHint, setAnswerHint] = useState(false);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const question = questions[state.index];
  const answer = question ? state.answers[question.id] : undefined;

  useEffect(() => {
    if (answer?.submitted) feedbackRef.current?.focus();
  }, [answer?.submitted, state.index]);

  if (!hydrated) return null;

  if (!state.started) {
    return (
      <div className="panel p-6">
        <p className="text-body">{intro}</p>
        <p className="mt-3 text-body text-ink-muted">
          Four questions · immediate feedback · your place is saved on this device.
        </p>
        <button
          type="button"
          onClick={() => {
            update({ ...state, started: true });
            track("check_started");
          }}
          className="mt-5 inline-flex min-h-11 items-center rounded-(--radius-control) bg-primary px-5 py-2.5 text-body font-semibold text-surface hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Start the check
        </button>
      </div>
    );
  }

  if (state.completed || !question) {
    return (
      <CheckSummary
        questions={questions}
        answers={state.answers}
        completion={completion}
        lessonRoute={lessonRoute}
        onRetry={() => {
          retry();
          track("interaction_retry_selected", { interaction: "knowledge-check" });
        }}
      />
    );
  }

  function select(selectedId: string) {
    if (!question || answer?.submitted) return;
    const option = question.options.find((entry) => entry.id === selectedId);
    update({
      ...state,
      answers: {
        ...state.answers,
        [question.id]: { selectedId, correct: option?.correct ?? false, submitted: false },
      },
    });
  }

  function checkAnswer() {
    if (!question || !answer?.selectedId) return;
    const nextAnswer = { ...answer, submitted: true };
    update({
      ...state,
      answers: { ...state.answers, [question.id]: nextAnswer },
    });
    track("check_question_answered", {
      question_id: question.id,
      correct: nextAnswer.correct,
      attempt: state.attempt,
    });
  }

  function advance() {
    if (!question || !answer?.submitted) return;
    const nextIndex = state.index + 1;
    const completed = nextIndex >= questions.length;
    update({ ...state, index: completed ? state.index : nextIndex, completed });
    if (completed) {
      const correct = Object.values(state.answers).filter((entry) => entry.correct).length;
      track("check_completed", { correct, total: questions.length, attempt: state.attempt });
    }
  }

  const selectedId = answer?.selectedId ?? null;

  return (
    <div>
      <div className="flex items-center justify-between gap-4 text-caption font-medium text-ink-muted">
        <p aria-live="polite">
          Question {state.index + 1} of {questions.length}
        </p>
        <p>{Math.round((state.index / questions.length) * 100)}% complete</p>
      </div>
      <div className="progress-track mt-2" aria-hidden="true">
        <div
          className="progress-fill"
          style={{ width: `${(state.index / questions.length) * 100}%` }}
        />
      </div>

      <div className="panel mt-4 p-6">
        <p className="text-body font-semibold">{question.stem}</p>
        <fieldset className="mt-5" disabled={answer?.submitted}>
          <legend className="sr-only">Pick an answer</legend>
          <div className="flex flex-col gap-2">
            {question.options.map((option) => {
              const selected = selectedId === option.id;
              const stateClass = answer?.submitted
                ? option.correct
                  ? "border-success bg-success-tint"
                  : selected
                    ? "border-danger bg-danger-tint"
                    : "border-border bg-surface-card"
                : selected
                  ? "border-primary bg-highlight"
                  : "border-border bg-surface-card hover:border-primary";
              return (
                <label
                  key={option.id}
                  className={`flex min-h-11 cursor-pointer items-start gap-3 rounded-(--radius-control) border px-4 py-3 text-body has-focus-visible:outline-2 has-focus-visible:outline-primary ${stateClass}`}
                >
                  <input
                    type="radio"
                    name={`check-${question.id}`}
                    value={option.id}
                    checked={selected}
                    onChange={() => select(option.id)}
                    className="mt-1 accent-primary"
                  />
                  <span className="flex-1">
                    {option.text}
                    {answer?.submitted && option.correct ? (
                      <span className="ml-2 text-caption font-bold text-success">
                        Correct answer
                      </span>
                    ) : null}
                    {answer?.submitted && selected && !option.correct ? (
                      <span className="ml-2 text-caption font-bold text-danger">Your answer</span>
                    ) : null}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {!answer?.submitted ? (
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => {
                if (!selectedId) {
                  setAnswerHint(true);
                  return;
                }
                setAnswerHint(false);
                checkAnswer();
              }}
              className="inline-flex min-h-11 items-center rounded-(--radius-control) bg-primary px-5 py-2.5 text-body font-semibold text-surface hover:bg-primary-strong disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Check answer
            </button>
            <p role="status" className={answerHint ? "text-body text-warning" : "sr-only"}>
              {answerHint ? "Select an answer first." : ""}
            </p>
            {state.index > 0 ? (
              <button
                type="button"
                onClick={() => update({ ...state, index: state.index - 1 })}
                className="min-h-11 text-body font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-primary"
              >
                Previous question
              </button>
            ) : null}
          </div>
        ) : (
          <div
            ref={feedbackRef}
            tabIndex={-1}
            aria-live="polite"
            className="mt-6 rounded-(--radius-control) bg-surface-alt p-5"
          >
            <p
              className={`text-body font-semibold ${answer.correct ? "text-success" : "text-danger"}`}
            >
              <span aria-hidden="true">{answer.correct ? "✓" : "✗"}</span>{" "}
              {answer.correct ? "Correct" : "Not quite"}
            </p>
            <p className="mt-2 text-body">
              {answer.correct ? question.correctFeedback : question.incorrectFeedback}
            </p>
            {!answer.correct ? (
              <Link
                href={`${lessonRoute}#${question.chip.anchor.toLowerCase()}`}
                onClick={() => track("remediation_chip_clicked", { question_id: question.id })}
                className="mt-3 inline-flex min-h-11 items-center rounded-(--radius-chip) border border-primary px-4 text-body font-semibold text-primary hover:bg-highlight focus-visible:outline-2 focus-visible:outline-primary"
              >
                {question.chip.label}
              </Link>
            ) : null}
            <div className="mt-4 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={advance}
                className="inline-flex min-h-11 items-center rounded-(--radius-control) bg-primary px-5 py-2.5 text-body font-semibold text-surface hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {state.index === questions.length - 1 ? "See results" : "Continue"}
              </button>
              {state.index > 0 ? (
                <button
                  type="button"
                  onClick={() => update({ ...state, index: state.index - 1 })}
                  className="min-h-11 text-body font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-primary"
                >
                  Previous question
                </button>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CheckSummary({
  questions,
  answers,
  completion,
  lessonRoute,
  onRetry,
}: {
  questions: PublishedCheckQuestion[];
  answers: Record<string, { selectedId: string; correct: boolean; submitted: boolean }>;
  completion: string;
  lessonRoute: string;
  onRetry: () => void;
}) {
  const correct = questions.filter((question) => answers[question.id]?.correct).length;
  const missed = questions.filter((question) => !answers[question.id]?.correct);
  return (
    <div className="panel p-6">
      <p className="eyebrow">Knowledge check complete</p>
      <h2 className="mt-2 text-heading font-bold">
        You got {correct} of {questions.length} correct
      </h2>
      <p className="mt-3 text-body">{completion}</p>
      {missed.length > 0 ? (
        <section className="mt-6 rounded-(--radius-control) bg-warning-tint p-4">
          <h3 className="font-semibold">Review these ideas</h3>
          <ul className="mt-2 space-y-2 text-body">
            {missed.map((question) => (
              <li key={question.id}>
                <Link
                  href={`${lessonRoute}#${question.chip.anchor.toLowerCase()}`}
                  className="font-semibold text-primary underline-offset-4 hover:underline"
                >
                  {question.chip.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      <details className="mt-5 rounded-(--radius-control) border border-border p-4">
        <summary className="cursor-pointer font-semibold text-primary">Review all answers</summary>
        <ol className="mt-4 space-y-5">
          {questions.map((question, index) => {
            const saved = answers[question.id];
            const selected = question.options.find((option) => option.id === saved?.selectedId);
            const correctOption = question.options.find((option) => option.correct);
            return (
              <li key={question.id} className="text-body">
                <p className="font-semibold">
                  {index + 1}. {question.stem}
                </p>
                <p className="mt-1 text-ink-muted">Your answer: {selected?.text ?? "No answer"}</p>
                {!saved?.correct ? (
                  <p className="mt-1 text-success">Correct answer: {correctOption?.text}</p>
                ) : null}
                <p className="mt-1">
                  {saved?.correct ? question.correctFeedback : question.incorrectFeedback}
                </p>
              </li>
            );
          })}
        </ol>
      </details>
      <div className="mt-6 flex flex-wrap items-start gap-5">
        <div>
          <Link
            href={`${lessonRoute}/assessment`}
            onClick={() => track("assessment_selected", { source: "knowledge-check" })}
            className="inline-flex min-h-11 items-center rounded-(--radius-control) bg-primary px-5 py-2.5 text-body font-semibold text-surface hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Take the Assessment
          </Link>
          <p className="mt-2 max-w-[38ch] text-caption text-ink-muted">
            Complete the graded assessment when you feel confident in the distinction.
          </p>
        </div>
        <button
          type="button"
          onClick={onRetry}
          className="min-h-11 text-body font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-primary"
        >
          Retry the knowledge check
        </button>
        <Link
          href={lessonRoute}
          className="inline-flex min-h-11 items-center text-body font-semibold text-primary underline-offset-4 hover:underline"
        >
          Return to the lesson
        </Link>
      </div>
    </div>
  );
}

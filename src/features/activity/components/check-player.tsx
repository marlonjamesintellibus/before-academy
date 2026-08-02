"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { PublishedCheckQuestion } from "@/features/content";
import { track } from "@/lib/analytics";

/**
 * S05 knowledge check player (docs/product/screens/activity-and-check.md):
 * same single-question pattern, immediate feedback per the formula, weak
 * concept → inline remediation chip into the lesson. Practice, never graded
 * (ADR-029); kind=check questions never appear in graded attempts.
 */
export function CheckPlayer({
  questions,
  intro,
  completion,
  lessonRoute,
}: {
  questions: PublishedCheckQuestion[];
  intro: string;
  completion: string;
  lessonRoute: string;
}) {
  const [index, setIndex] = useState(-1);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState<{ correct: boolean } | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const feedbackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (answered) feedbackRef.current?.focus();
  }, [answered]);

  if (index === -1) {
    return (
      <div className="rounded-(--radius-control) border border-surface-alt p-6">
        <p className="text-body">{intro}</p>
        <button
          type="button"
          onClick={() => {
            setIndex(0);
            track("check_started");
          }}
          className="mt-5 inline-flex min-h-11 items-center rounded-(--radius-control) bg-primary px-5 py-2.5 text-body font-semibold text-surface hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Start the check
        </button>
      </div>
    );
  }

  const question = questions[index];
  if (!question) {
    return (
      <div className="rounded-(--radius-control) border border-surface-alt p-6">
        <h2 className="text-heading font-bold">Practice complete</h2>
        <p className="mt-3 text-body">{completion}</p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            href={`${lessonRoute}/assessment`}
            className="inline-flex min-h-11 items-center rounded-(--radius-control) bg-primary px-5 py-2.5 text-body font-semibold text-surface hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Start the assessment
          </Link>
          <Link
            href={lessonRoute}
            className="inline-flex min-h-11 items-center text-body text-primary underline-offset-4 hover:underline"
          >
            Review a lesson first
          </Link>
        </div>
      </div>
    );
  }

  function checkAnswer() {
    if (!selected || !question) return;
    const option = question.options.find((entry) => entry.id === selected);
    const correct = option?.correct ?? false;
    setAnswered({ correct });
    if (correct) setCorrectCount((count) => count + 1);
    track("check_question_answered", { question_id: question.id, correct });
  }

  function advance() {
    const next = index + 1;
    setIndex(next);
    setSelected(null);
    setAnswered(null);
    if (next >= questions.length) {
      track("check_completed", { correct: correctCount, total: questions.length });
    }
  }

  return (
    <div>
      <p className="text-caption text-ink-muted" aria-live="polite">
        Question {index + 1} of {questions.length}
      </p>

      <div className="mt-4 rounded-(--radius-control) border border-surface-alt p-6">
        <p className="text-body font-semibold">{question.stem}</p>

        <fieldset className="mt-5" disabled={Boolean(answered)}>
          <legend className="sr-only">Pick an answer</legend>
          <div className="flex flex-col gap-2">
            {question.options.map((option) => (
              <label
                key={option.id}
                className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-(--radius-control) border px-4 py-2 text-body ${
                  selected === option.id
                    ? "border-primary bg-highlight"
                    : "border-surface-alt hover:border-primary"
                }`}
              >
                <input
                  type="radio"
                  name={`check-${question.id}`}
                  value={option.id}
                  checked={selected === option.id}
                  onChange={() => setSelected(option.id)}
                  className="accent-primary"
                />
                {option.text}
              </label>
            ))}
          </div>
        </fieldset>

        {!answered ? (
          <button
            type="button"
            onClick={checkAnswer}
            disabled={!selected}
            className="mt-5 inline-flex min-h-11 items-center rounded-(--radius-control) bg-primary px-5 py-2.5 text-body font-semibold text-surface hover:bg-primary-strong disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Check
          </button>
        ) : (
          <div
            ref={feedbackRef}
            tabIndex={-1}
            aria-live="polite"
            className="mt-6 rounded-(--radius-control) bg-surface-alt p-5"
          >
            <p
              className={`text-body font-semibold ${answered.correct ? "text-success" : "text-danger"}`}
            >
              <span aria-hidden="true">{answered.correct ? "✓" : "✗"}</span>{" "}
              {answered.correct ? "Correct" : "Not quite"}
            </p>
            <p className="mt-2 text-body">
              {answered.correct ? question.correctFeedback : question.incorrectFeedback}
            </p>
            {!answered.correct ? (
              <Link
                href={`${lessonRoute}#${question.chip.anchor.toLowerCase()}`}
                onClick={() => track("remediation_chip_clicked", { question_id: question.id })}
                className="mt-3 inline-flex min-h-11 items-center rounded-(--radius-chip) border border-primary px-4 text-body font-semibold text-primary hover:bg-highlight focus-visible:outline-2 focus-visible:outline-primary"
              >
                {question.chip.label}
              </Link>
            ) : null}
            <div className="mt-4">
              <button
                type="button"
                onClick={advance}
                className="inline-flex min-h-11 items-center rounded-(--radius-control) bg-primary px-5 py-2.5 text-body font-semibold text-surface hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

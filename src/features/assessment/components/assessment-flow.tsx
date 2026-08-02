"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Callout } from "@/components/ui/callout";
import { Modal } from "@/components/ui/modal";
import { track } from "@/lib/analytics";
import { createAttempt, submitAttempt } from "../actions";
import type { AttemptPayload, AttemptResult, SanitizedQuestion } from "../types";
import { CATEGORY_DISPLAY, REMEDIATION_TARGETS } from "../types";
import { useAnonymousId } from "../use-anonymous-id";

/**
 * S06 intro → S07 attempt → S08 results (docs/product/screens/assessment.md).
 * One question at a time, review-before-submit, exit confirm (S13c: keep going
 * is the default, destructive never default), server-scored, calm-failure copy.
 */
type Stage =
  | { name: "intro" }
  | { name: "attempt"; payload: AttemptPayload }
  | { name: "review"; payload: AttemptPayload }
  | { name: "results"; result: AttemptResult };

const LAST_COMBINATION_KEY = "ba.v1.last_combination";
const ATTEMPT_COUNT_KEY = "ba.v1.attempt_count";

export function AssessmentFlow({
  intro,
  lessonRoute,
  assessmentFirst,
}: {
  intro: string;
  lessonRoute: string;
  assessmentFirst: boolean;
}) {
  const anonymousId = useAnonymousId();
  const router = useRouter();
  const [stage, setStage] = useState<Stage>({ name: "intro" });
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [index, setIndex] = useState(0);
  const [exitConfirm, setExitConfirm] = useState(false);
  const [busy, setBusy] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const introViewed = useRef(false);

  useEffect(() => {
    if (!introViewed.current) {
      introViewed.current = true;
      track("assessment_intro_viewed", {
        route: assessmentFirst ? "assessment_first" : "lesson_first",
      });
    }
  }, [assessmentFirst]);

  async function start() {
    if (!anonymousId || busy) return;
    setBusy(true);
    setErrorMessage(null);
    const attemptNumber = Number(localStorage.getItem(ATTEMPT_COUNT_KEY) ?? "0") + 1;
    const previous = JSON.parse(localStorage.getItem(LAST_COMBINATION_KEY) ?? "[]") as string[];
    const result = await createAttempt({
      anonymousId,
      attemptNumber,
      previousQuestionIds: previous,
    });
    setBusy(false);
    if (!result.ok) {
      setErrorMessage(result.error.message);
      return;
    }
    localStorage.setItem(ATTEMPT_COUNT_KEY, String(attemptNumber));
    localStorage.setItem(
      LAST_COMBINATION_KEY,
      JSON.stringify(result.data.questions.map((question) => question.id)),
    );
    setAnswers({});
    setIndex(0);
    setStage({ name: "attempt", payload: result.data });
    track("assessment_started", {
      attempt_number: attemptNumber,
      route: assessmentFirst ? "assessment_first" : "lesson_first",
    });
  }

  async function submit(payload: AttemptPayload) {
    if (!anonymousId || busy) return;
    setBusy(true);
    setErrorMessage(null);
    const result = await submitAttempt({
      anonymousId,
      token: payload.token,
      answers: Object.entries(answers).map(([questionId, optionIds]) => ({
        questionId,
        optionIds,
      })),
      idempotencyKey: crypto.randomUUID(),
    });
    setBusy(false);
    if (!result.ok) {
      setErrorMessage(result.error.message);
      return;
    }
    setStage({ name: "results", result: result.data });
    track("assessment_submitted", {});
    track("assessment_result_viewed", {
      passed: result.data.passed,
      score: result.data.score,
      categories_failed: result.data.categoriesFailed.join(","),
    });
  }

  if (stage.name === "intro") {
    return (
      <div className="panel p-6">
        {assessmentFirst ? (
          <p className="text-body font-medium">You can take this without reading the lesson.</p>
        ) : null}
        <p className={`text-body ${assessmentFirst ? "mt-3" : ""}`}>{intro}</p>
        <p className="mt-3 text-body text-ink-muted">
          6-7 questions · Pass at 80% · Retake any time with different questions · If you
          don&rsquo;t pass, we&rsquo;ll show you exactly what to review
        </p>
        {errorMessage ? <p className="mt-3 text-body text-danger">{errorMessage}</p> : null}
        <div className="mt-5 flex flex-wrap gap-4">
          <button
            type="button"
            onClick={start}
            disabled={!anonymousId || busy}
            aria-busy={busy || undefined}
            className="inline-flex min-h-11 items-center rounded-(--radius-control) bg-primary px-5 py-2.5 text-body font-semibold text-surface hover:bg-primary-strong disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Start assessment
          </button>
          <Link
            href={lessonRoute}
            className="inline-flex min-h-11 items-center text-body text-primary underline-offset-4 hover:underline"
          >
            Review the lesson first
          </Link>
        </div>
      </div>
    );
  }

  if (stage.name === "attempt") {
    const question = stage.payload.questions[index];
    if (!question) return null;
    return (
      <div>
        <div className="flex items-center justify-between">
          <p className="text-caption font-medium text-ink-muted" aria-live="polite">
            Question {index + 1} of {stage.payload.questions.length}
          </p>
          <button
            type="button"
            onClick={() => setExitConfirm(true)}
            className="min-h-11 text-body text-ink-muted underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-primary"
          >
            Exit assessment
          </button>
        </div>

        <div className="progress-track mt-2" aria-hidden="true">
          <div
            className="progress-fill"
            style={{ width: `${(index / stage.payload.questions.length) * 100}%` }}
          />
        </div>

        <QuestionCard
          question={question}
          selected={answers[question.id] ?? []}
          onSelect={(optionIds) => setAnswers({ ...answers, [question.id]: optionIds })}
        />

        <div className="mt-5 flex gap-4">
          {index > 0 ? (
            <button
              type="button"
              onClick={() => setIndex(index - 1)}
              className="min-h-11 rounded-(--radius-control) border border-primary px-4 text-body font-semibold text-primary hover:bg-highlight focus-visible:outline-2 focus-visible:outline-primary"
            >
              Previous
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => {
              track("assessment_question_answered", {
                question_id: question.id,
                category: question.category,
                chosen: (answers[question.id] ?? []).join(","),
              });
              if (index + 1 === stage.payload.questions.length) {
                setStage({ name: "review", payload: stage.payload });
              } else {
                setIndex(index + 1);
              }
            }}
            disabled={(answers[question.id] ?? []).length === 0}
            className="inline-flex min-h-11 items-center rounded-(--radius-control) bg-primary px-5 py-2.5 text-body font-semibold text-surface hover:bg-primary-strong disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {index + 1 === stage.payload.questions.length ? "Review answers" : "Next"}
          </button>
        </div>

        <Modal
          open={exitConfirm}
          onClose={() => setExitConfirm(false)}
          title="Leave the assessment?"
        >
          <p className="text-body">Your answers from this attempt won&rsquo;t be saved.</p>
          <div className="mt-5 flex gap-4">
            <button
              type="button"
              autoFocus
              onClick={() => setExitConfirm(false)}
              className="inline-flex min-h-11 items-center rounded-(--radius-control) bg-primary px-5 py-2.5 text-body font-semibold text-surface hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Keep going
            </button>
            <button
              type="button"
              onClick={() => {
                track("assessment_abandoned", { question_index: index });
                router.push(lessonRoute);
              }}
              className="min-h-11 rounded-(--radius-control) border border-danger px-4 text-body font-semibold text-danger hover:bg-surface-alt focus-visible:outline-2 focus-visible:outline-danger"
            >
              Exit - discard this attempt
            </button>
          </div>
        </Modal>
      </div>
    );
  }

  if (stage.name === "review") {
    return (
      <div className="panel p-6">
        <h2 className="text-heading font-bold">Review before you submit</h2>
        <ul className="mt-4 flex flex-col gap-2">
          {stage.payload.questions.map((question, questionIndex) => (
            <li key={question.id} className="flex items-center justify-between gap-4 text-body">
              <span className="truncate">
                {questionIndex + 1}. {question.stem.slice(0, 60)}…
              </span>
              <button
                type="button"
                onClick={() => {
                  setIndex(questionIndex);
                  setStage({ name: "attempt", payload: stage.payload });
                }}
                className="min-h-11 shrink-0 text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-primary"
              >
                {(answers[question.id] ?? []).length > 0 ? "Change answer" : "Answer"}
              </button>
            </li>
          ))}
        </ul>
        {errorMessage ? <p className="mt-3 text-body text-danger">{errorMessage}</p> : null}
        <button
          type="button"
          onClick={() => submit(stage.payload)}
          disabled={
            busy ||
            stage.payload.questions.some((question) => (answers[question.id] ?? []).length === 0)
          }
          aria-busy={busy || undefined}
          className="mt-6 inline-flex min-h-11 items-center rounded-(--radius-control) bg-primary px-5 py-2.5 text-body font-semibold text-surface hover:bg-primary-strong disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Submit assessment
        </button>
      </div>
    );
  }

  return <Results result={stage.result} lessonRoute={lessonRoute} onRetake={start} busy={busy} />;
}

function QuestionCard({
  question,
  selected,
  onSelect,
}: {
  question: SanitizedQuestion;
  selected: string[];
  onSelect: (optionIds: string[]) => void;
}) {
  const multi = question.format === "multiple_select";
  return (
    <div className="mt-4 rounded-(--radius-control) border border-surface-alt p-6">
      <p className="text-body font-semibold">{question.stem}</p>
      {multi ? (
        <p className="mt-1 text-caption text-ink-muted">Select every answer that applies.</p>
      ) : null}
      <fieldset className="mt-5">
        <legend className="sr-only">{multi ? "Select all that apply" : "Pick one answer"}</legend>
        <div className="flex flex-col gap-2">
          {question.options.map((option) => {
            const checked = selected.includes(option.id);
            return (
              <label
                key={option.id}
                className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-(--radius-control) border px-4 py-2 text-body ${
                  checked
                    ? "border-primary bg-highlight"
                    : "border-surface-alt hover:border-primary"
                }`}
              >
                <input
                  type={multi ? "checkbox" : "radio"}
                  name={`assessment-${question.id}`}
                  value={option.id}
                  checked={checked}
                  onChange={() => {
                    if (multi) {
                      onSelect(
                        checked
                          ? selected.filter((id) => id !== option.id)
                          : [...selected, option.id],
                      );
                    } else {
                      onSelect([option.id]);
                    }
                  }}
                  className="accent-primary"
                />
                {option.text}
              </label>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}

function Results({
  result,
  lessonRoute,
  onRetake,
  busy,
}: {
  result: AttemptResult;
  lessonRoute: string;
  onRetake: () => void;
  busy: boolean;
}) {
  const [confidence, setConfidence] = useState<number | null>(null);
  const strengths = result.review
    .filter((entry) => entry.correct)
    .map((entry) => CATEGORY_DISPLAY[entry.category]);
  const uniqueStrengths = [...new Set(strengths)];

  return (
    <div>
      <Callout
        variant={result.passed ? "success" : "warning"}
        title={
          result.passed ? "Section complete - well done" : "Not this time - here's what to review"
        }
        as="h2"
      >
        <p>
          {result.score} of {result.total} correct; passing is {result.passingScore} of{" "}
          {result.total}.
        </p>
        {!result.passed && uniqueStrengths.length > 0 ? (
          <p>
            You were strong on {uniqueStrengths.slice(0, 2).join(" and ")}. Focus on{" "}
            {result.categoriesFailed.map((category) => CATEGORY_DISPLAY[category]).join(", ")} and
            retake when you&rsquo;re ready - the questions will be different.
          </p>
        ) : null}
      </Callout>

      {result.categoriesFailed.length > 0 ? (
        <section aria-label="What to review" className="mt-6">
          <h3 className="text-subheading font-semibold">Your study plan</h3>
          <ul className="mt-3 flex flex-col gap-3">
            {result.categoriesFailed.map((category) => (
              <li
                key={category}
                className="rounded-(--radius-control) border border-surface-alt p-4"
              >
                <p className="text-body font-semibold">{CATEGORY_DISPLAY[category]}</p>
                <ul className="mt-2 flex flex-col gap-1">
                  {REMEDIATION_TARGETS[category].map((target) => (
                    <li key={target.href}>
                      <Link
                        href={
                          target.href.startsWith("#")
                            ? `${lessonRoute}${target.href}`
                            : `${lessonRoute}${target.href}`
                        }
                        onClick={() => track("review_category_clicked", { category })}
                        className="text-body text-primary underline-offset-4 hover:underline"
                      >
                        {target.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section aria-label="Answer review" className="mt-6">
        <h3 className="text-subheading font-semibold">Question by question</h3>
        <ul className="mt-3 flex flex-col gap-3">
          {result.review.map((entry, reviewIndex) => (
            <li
              key={entry.questionId}
              className="rounded-(--radius-control) border border-surface-alt p-4"
            >
              <p
                className={`text-body font-semibold ${entry.correct ? "text-success" : "text-danger"}`}
              >
                <span aria-hidden="true">{entry.correct ? "✓" : "✗"}</span> Question{" "}
                {reviewIndex + 1} · {CATEGORY_DISPLAY[entry.category]} ·{" "}
                {entry.correct ? "correct" : "review this one"}
              </p>
              <p className="mt-2 text-body">{entry.explanation}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Confidence" className="mt-6 rounded-(--radius-control) bg-highlight p-5">
        <p className="text-body font-semibold">
          How confident do you feel telling AI, automation and traditional software apart?
        </p>
        {confidence === null ? (
          <div
            className="mt-3 flex gap-2"
            role="group"
            aria-label="Confidence from 1 (not yet) to 5 (very)"
          >
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => {
                  setConfidence(value);
                  track("confidence_submitted", { value, stage: "post" });
                }}
                className="min-h-11 min-w-11 rounded-(--radius-control) border border-primary text-body font-semibold text-primary hover:bg-surface focus-visible:outline-2 focus-visible:outline-primary"
              >
                {value}
              </button>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-body" aria-live="polite">
            Noted - thanks.
          </p>
        )}
      </section>

      <div className="mt-8 flex flex-wrap gap-4">
        <button
          type="button"
          onClick={() => {
            track("retake_clicked", {});
            onRetake();
          }}
          disabled={busy}
          aria-busy={busy || undefined}
          className="inline-flex min-h-11 items-center rounded-(--radius-control) bg-primary px-5 py-2.5 text-body font-semibold text-surface hover:bg-primary-strong disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Retake with new questions
        </button>
        <Link
          href={lessonRoute}
          className="inline-flex min-h-11 items-center text-body text-primary underline-offset-4 hover:underline"
        >
          Back to the lesson
        </Link>
      </div>
    </div>
  );
}

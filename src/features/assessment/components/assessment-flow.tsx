"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Callout } from "@/components/ui/callout";
import { Modal } from "@/components/ui/modal";
import { track } from "@/lib/analytics";
import { readDevice, writeDevice } from "@/lib/device-store";
import { createAttempt, submitAttempt } from "../actions";
import type { AttemptPayload, AttemptResult, SanitizedQuestion } from "../types";
import { CATEGORY_DISPLAY } from "../types";
import { ConfidencePrompt, readConfidence, readDiagnostic } from "@/features/content";
import { CompletionPanel } from "./completion-panel";
import { assessmentStorageKeys, CLASSIC_ASSESSMENT_SECTION } from "../storage-keys";
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

interface AttemptMirror {
  payload: AttemptPayload;
  answers: Record<string, string[]>;
  index: number;
  review: boolean;
}

/** Refresh survival (assessment-engine.md): the in-flight attempt mirrors to sessionStorage. */
function readAttemptMirror(mirrorKey: string): AttemptMirror | null {
  try {
    const raw = window.sessionStorage.getItem(mirrorKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AttemptMirror;
    if (!parsed?.payload?.token || !Array.isArray(parsed.payload.questions)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeAttemptMirror(mirrorKey: string, mirror: AttemptMirror): void {
  try {
    window.sessionStorage.setItem(mirrorKey, JSON.stringify(mirror));
  } catch {
    // Private browsing: the attempt continues in memory only.
  }
}

function clearAttemptMirror(mirrorKey: string): void {
  try {
    window.sessionStorage.removeItem(mirrorKey);
  } catch {
    // nothing to clear
  }
}

export function AssessmentFlow({
  intro,
  lessonRoute,
  sectionSlug,
  assessmentFirst,
}: {
  intro: string;
  lessonRoute: string;
  /** Scopes the attempt: the token is signed against this section. */
  sectionSlug: string;
  assessmentFirst: boolean;
}) {
  const anonymousId = useAnonymousId();
  const router = useRouter();
  // Every stored artifact of an attempt is scoped to its section (or pathway
  // scope); before this, all eight assessments shared one set of keys and any
  // pass marked the first section complete.
  const keys = assessmentStorageKeys(sectionSlug);
  const [stage, setStage] = useState<Stage>({ name: "intro" });
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [index, setIndex] = useState(0);
  const [exitConfirm, setExitConfirm] = useState(false);
  const [busy, setBusy] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [answerHint, setAnswerHint] = useState(false);
  const introViewed = useRef(false);
  const inFlight = useRef(false);

  useEffect(() => {
    if (!introViewed.current) {
      introViewed.current = true;
      const mirror = readAttemptMirror(keys.mirror);
      if (mirror) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time refresh restore
        setAnswers(mirror.answers);
        setIndex(mirror.index);
        setStage(
          mirror.review
            ? { name: "review", payload: mirror.payload }
            : { name: "attempt", payload: mirror.payload },
        );
      }
      track("assessment_intro_viewed", {
        route: assessmentFirst ? "assessment_first" : "lesson_first",
      });
    }
  }, [assessmentFirst, keys.mirror]);

  useEffect(() => {
    if (stage.name === "attempt" || stage.name === "review") {
      writeAttemptMirror(keys.mirror, {
        payload: stage.payload,
        answers,
        index,
        review: stage.name === "review",
      });
    }
  }, [stage, answers, index, keys.mirror]);

  async function start() {
    if (!anonymousId || busy || inFlight.current) return;
    inFlight.current = true;
    setBusy(true);
    setErrorMessage(null);
    // Device storage through the safe wrapper only (private-browsing promise).
    const storedCount = readDevice<number>(keys.attemptCount, 0, (v) => typeof v === "number");
    const attemptNumber = (Number.isFinite(storedCount) ? storedCount : 0) + 1;
    const previous = readDevice<string[]>(keys.lastCombination, [], Array.isArray);
    const result = await createAttempt({
      sectionSlug,
      anonymousId,
      attemptNumber,
      previousQuestionIds: previous,
    });
    setBusy(false);
    inFlight.current = false;
    if (!result.ok) {
      setErrorMessage(result.error.message);
      return;
    }
    writeDevice(keys.attemptCount, attemptNumber);
    writeDevice(
      keys.lastCombination,
      result.data.questions.map((question) => question.id),
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
    if (!anonymousId || busy || inFlight.current) return;
    inFlight.current = true;
    setBusy(true);
    setErrorMessage(null);
    const result = await submitAttempt({
      sectionSlug,
      anonymousId,
      token: payload.token,
      answers: Object.entries(answers).map(([questionId, optionIds]) => ({
        questionId,
        optionIds,
      })),
      idempotencyKey: crypto.randomUUID(),
    });
    setBusy(false);
    inFlight.current = false;
    if (!result.ok) {
      setErrorMessage(result.error.message);
      return;
    }
    clearAttemptMirror(keys.mirror);
    setStage({ name: "results", result: result.data });
    // Guest completion state (ADR-025): outcome summary only - no answers, no PII.
    const outcomeKey = keys.outcome;
    const previous = readDevice<{
      version: 1;
      attempts: number;
      bestScore: number;
      passed: boolean;
    } | null>(
      outcomeKey,
      null,
      (value) =>
        typeof value === "object" &&
        value !== null &&
        (value as { version?: number }).version === 1,
    );
    const categoryResults: Record<string, { correct: number; total: number }> = {};
    for (const entry of result.data.review) {
      const tally = categoryResults[entry.category] ?? { correct: 0, total: 0 };
      tally.total += 1;
      if (entry.correct) tally.correct += 1;
      categoryResults[entry.category] = tally;
    }
    writeDevice(outcomeKey, {
      version: 1,
      attempts: result.data.attemptNumber,
      bestScore: Math.max(previous?.bestScore ?? 0, result.data.score),
      total: result.data.total,
      passed: (previous?.passed ?? false) || result.data.passed,
      lastAttemptAt: new Date().toISOString(),
      categories: categoryResults,
    });
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
        <p role="alert" className={errorMessage ? "mt-3 text-body text-danger" : "sr-only"}>
          {errorMessage ?? ""}
        </p>
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
              if ((answers[question.id] ?? []).length === 0) {
                setAnswerHint(true);
                return;
              }
              setAnswerHint(false);
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
            className="inline-flex min-h-11 items-center rounded-(--radius-control) bg-primary px-5 py-2.5 text-body font-semibold text-surface hover:bg-primary-strong disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {index + 1 === stage.payload.questions.length ? "Review answers" : "Next"}
          </button>
        </div>
        <p role="status" className={answerHint ? "mt-2 text-body text-warning" : "sr-only"}>
          {answerHint
            ? "Choose an answer first - any answer can be changed before you submit."
            : ""}
        </p>

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
                clearAttemptMirror(keys.mirror);
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
                <span aria-hidden="true">
                  {(answers[question.id] ?? []).length > 0 ? "Change answer" : "Answer"}
                </span>
                <span className="sr-only">
                  {(answers[question.id] ?? []).length > 0
                    ? `Change answer to question ${questionIndex + 1}`
                    : `Answer question ${questionIndex + 1}`}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <p role="alert" className={errorMessage ? "mt-3 text-body text-danger" : "sr-only"}>
          {errorMessage ?? ""}
        </p>
        <button
          type="button"
          onClick={() => {
            if (
              stage.payload.questions.some((question) => (answers[question.id] ?? []).length === 0)
            ) {
              setAnswerHint(true);
              return;
            }
            setAnswerHint(false);
            submit(stage.payload);
          }}
          disabled={busy}
          aria-busy={busy || undefined}
          className="mt-6 inline-flex min-h-11 items-center rounded-(--radius-control) bg-primary px-5 py-2.5 text-body font-semibold text-surface hover:bg-primary-strong disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Submit assessment
        </button>
        <p role="status" className={answerHint ? "mt-2 text-body text-warning" : "sr-only"}>
          {answerHint ? "A question is still unanswered - use its Answer link above." : ""}
        </p>
      </div>
    );
  }

  return (
    <Results
      sectionSlug={sectionSlug}
      result={stage.result}
      lessonRoute={lessonRoute}
      onRetake={start}
      busy={busy}
    />
  );
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
  sectionSlug,
  result,
  lessonRoute,
  onRetake,
  busy,
}: {
  sectionSlug: string;
  result: AttemptResult;
  lessonRoute: string;
  onRetake: () => void;
  busy: boolean;
}) {
  // The focused-review route, the diagnostic and the confidence pair are the
  // first section's instruments; other scopes suppress them rather than link
  // to a 404 or show another section's deltas.
  const hasRemediation = sectionSlug === CLASSIC_ASSESSMENT_SECTION;
  const outcomeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // The single most important state change in the app announces itself:
    // focus lands on the outcome (WCAG 2.4.3 / review S1 finding).
    outcomeRef.current?.focus();
  }, []);
  const failedMisconceptions = [
    ...new Set(
      result.review.filter((entry) => !entry.correct).flatMap((entry) => entry.misconceptions),
    ),
  ];
  const diagnostic = hasRemediation ? readDiagnostic() : null;
  const storedConfidence = hasRemediation ? readConfidence() : null;
  const strengths = result.review
    .filter((entry) => entry.correct)
    .map((entry) => CATEGORY_DISPLAY[entry.category]);
  const uniqueStrengths = [...new Set(strengths)];

  return (
    <div ref={outcomeRef} tabIndex={-1} className="focus:outline-none">
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

      {result.passed ? <CompletionPanel perfect={result.score === result.total} /> : null}

      {result.categoriesFailed.length > 0 && hasRemediation ? (
        <section aria-label="What to review" className="mt-6">
          <h3 className="text-subheading font-semibold">Your study plan</h3>
          <p className="mt-2 text-body text-ink-muted">
            A focused review built from exactly what tripped you up - the misconceptions behind your
            missed questions, with a quick confirm for each.
          </p>
          <Link
            href={`${lessonRoute}/review?categories=${result.categoriesFailed.join(",")}${
              failedMisconceptions.length > 0 ? `&m=${failedMisconceptions.join(",")}` : ""
            }`}
            onClick={() =>
              track("review_category_clicked", {
                category: result.categoriesFailed.join(","),
              })
            }
            className="mt-3 inline-flex min-h-11 items-center rounded-(--radius-control) bg-primary px-5 py-2.5 text-body font-semibold text-surface-card shadow-(--shadow-card) hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Start the focused review
          </Link>
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

      {hasRemediation ? (
        <section aria-label="How your judgment changed" className="mt-6 panel p-5">
          <h3 className="font-display text-subheading font-bold">How your judgment changed</h3>
          {diagnostic ? (
            <p className="mt-2 text-body">
              Before the lesson you read {diagnostic.correct} of {diagnostic.total} situations
              accurately on instinct. In this graded attempt you classified {result.score} of{" "}
              {result.total} correctly - with named reasons instead of guesses.
            </p>
          ) : (
            <p className="mt-2 text-body text-ink-muted">
              Take the one-minute opening diagnostic before your next lesson visit and this panel
              will show how your instincts changed.
            </p>
          )}
          {storedConfidence?.pre !== undefined ? (
            <p className="mt-2 text-body text-ink-muted">
              Confidence before the lesson: {storedConfidence.pre} of 5. Where is it now?
            </p>
          ) : null}
          <ConfidencePrompt stage="post" />
        </section>
      ) : null}

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

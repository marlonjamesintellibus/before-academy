"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { reviewBank } from "@/db/seed/review-bank";
import { track } from "@/lib/analytics";
import { readReviewState, recordReviewSession, reviewDue } from "../review-schedule";
import { readDevice } from "@/lib/device-store";
import type { StoredAssessmentOutcome } from "../types";

/**
 * Two-minute review (experience-plan Phase D): four unseen mixed-category
 * items, retrieval not rereading, immediate feedback, and the day-offset
 * captured so the pilot can measure delayed retention. Device-only.
 */
const ASSESSMENT_KEY = "ba.v1.assessment.ai-automation-software";
const LESSON_KEY = "ba.v1.lesson.ai-automation-software";
const SESSION_SIZE = 4;

export function ReviewSession() {
  const [stage, setStage] = useState<"idle" | "running" | "done">("idle");
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const heading = useRef<HTMLParagraphElement>(null);

  const [due, setDue] = useState({ due: false, dayOffset: 0, rusty: false });
  const [items, setItems] = useState<typeof reviewBank>([]);

  useEffect(() => {
    // Device storage hydrates post-mount (SSR renders nothing schedule-dependent).
    const outcome = readDevice<StoredAssessmentOutcome | null>(ASSESSMENT_KEY, null);
    const lesson = readDevice<{ updatedAt?: number } | null>(LESSON_KEY, null);
    const nextDue = reviewDue([
      outcome?.lastAttemptAt,
      lesson?.updatedAt ? new Date(lesson.updatedAt).toISOString() : null,
    ]);
    const seen = new Set(readReviewState().seenItemIds);
    const fresh = reviewBank.filter((item) => !seen.has(item.id));
    const pool = fresh.length >= SESSION_SIZE ? fresh : reviewBank;
    // Mixed categories: take one per category first, then fill.
    const byCategory = new Map<string, typeof pool>();
    for (const item of pool) {
      byCategory.set(item.category, [...(byCategory.get(item.category) ?? []), item]);
    }
    const picked: typeof pool = [];
    for (const list of byCategory.values()) {
      if (picked.length < SESSION_SIZE && list[0]) picked.push(list[0]);
    }
    for (const item of pool) {
      if (picked.length >= SESSION_SIZE) break;
      if (!picked.includes(item)) picked.push(item);
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time post-mount device-storage hydration
    setDue(nextDue);
    setItems(picked.slice(0, SESSION_SIZE));
  }, []);

  if (!due.due && stage === "idle") return null;

  const item = items[index];

  if (stage === "idle") {
    return (
      <section aria-label="Two-minute review" className="panel mt-8 border-primary/30 p-6">
        <p className="eyebrow">{due.rusty ? "Worth a refresh" : "Two-minute review"}</p>
        <p className="mt-2 text-body">
          {due.rusty
            ? "It has been a little while - four quick situations will bring the distinctions right back."
            : "Retrieval beats rereading: four quick situations from angles you have not seen."}
        </p>
        <button
          type="button"
          onClick={() => {
            setStage("running");
            track("review_session_started", { day_offset: due.dayOffset });
            requestAnimationFrame(() => heading.current?.focus());
          }}
          className="mt-4 inline-flex min-h-11 items-center rounded-(--radius-control) bg-primary px-4 py-2 text-body font-semibold text-surface-card hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Start the review
        </button>
      </section>
    );
  }

  if (stage === "done" || !item) {
    return (
      <section aria-label="Review complete" className="panel mt-8 p-6" aria-live="polite">
        <p className="eyebrow">Review complete</p>
        <p className="mt-2 text-body">
          {correctCount} of {items.length} from memory - retrieval is what makes it stick. Another
          set unlocks tomorrow.
        </p>
        <Link
          href="/learn/ai-awareness/ai-automation-software"
          className="mt-3 inline-block text-body text-primary underline-offset-4 hover:underline"
        >
          Want more? Revisit any lesson unit
        </Link>
      </section>
    );
  }

  const chosenOption = item.options.find((option) => option.id === selected);
  const correct = selected === item.correctOptionId;

  return (
    <section aria-label="Two-minute review" className="panel mt-8 p-6">
      <p className="text-caption font-medium text-ink-muted" aria-live="polite">
        Review {index + 1} of {items.length}
      </p>
      <p ref={heading} tabIndex={-1} className="mt-2 text-body font-semibold">
        {item.prompt}
      </p>
      <div className="mt-3 flex flex-col gap-2">
        {item.options.map((option) => (
          <label
            key={option.id}
            className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-(--radius-control) border px-4 py-2 text-body has-focus-visible:outline-2 has-focus-visible:outline-primary ${
              selected === option.id
                ? "border-primary bg-primary-tint"
                : "border-border bg-surface-card hover:border-primary"
            }`}
          >
            <input
              type="radio"
              name={`review-${item.id}`}
              checked={selected === option.id}
              disabled={answered}
              onChange={() => setSelected(option.id)}
              className="accent-primary"
            />
            {option.text}
          </label>
        ))}
      </div>
      {!answered ? (
        <button
          type="button"
          onClick={() => {
            if (!selected) return;
            setAnswered(true);
            if (correct) setCorrectCount((count) => count + 1);
            requestAnimationFrame(() => heading.current?.focus());
          }}
          className="mt-4 inline-flex min-h-11 items-center rounded-(--radius-control) bg-primary px-4 py-2 text-body font-semibold text-surface-card hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Check
        </button>
      ) : (
        <div className="mt-4" aria-live="polite">
          <p className={`text-body font-semibold ${correct ? "text-success" : "text-warning"}`}>
            {correct ? "Correct." : "Not quite."}
          </p>
          <p className="mt-1 text-body">{chosenOption?.feedback}</p>
          <button
            type="button"
            onClick={() => {
              if (index + 1 < items.length) {
                setIndex(index + 1);
                setSelected(null);
                setAnswered(false);
                requestAnimationFrame(() => heading.current?.focus());
              } else {
                recordReviewSession(items.map((entry) => entry.id));
                track("review_session_completed", {
                  correct: correctCount,
                  total: items.length,
                  day_offset: due.dayOffset,
                });
                setStage("done");
              }
            }}
            className="mt-3 inline-flex min-h-11 items-center rounded-(--radius-control) bg-primary px-4 py-2 text-body font-semibold text-surface-card hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {index + 1 < items.length ? "Next" : "Finish"}
          </button>
        </div>
      )}
    </section>
  );
}

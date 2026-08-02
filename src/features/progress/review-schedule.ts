import { readDevice, writeDevice } from "@/lib/device-store";

/**
 * Spaced-retrieval schedule (experience-plan Phase D), device-only and honest:
 * a review becomes due one day after the learner's last meaningful touch, then
 * one week after the last review. "Rusty" wording, never streak-shaming - a
 * missed window changes nothing except the invitation copy.
 */
const REVIEW_KEY = "ba.v1.review.ai-automation-software";

export interface StoredReviewState {
  version: 1;
  lastReviewAt: string | null;
  sessionsCompleted: number;
  seenItemIds: string[];
}

const EMPTY: StoredReviewState = {
  version: 1,
  lastReviewAt: null,
  sessionsCompleted: 0,
  seenItemIds: [],
};

export function readReviewState(): StoredReviewState {
  return readDevice<StoredReviewState>(
    REVIEW_KEY,
    EMPTY,
    (value) =>
      typeof value === "object" && value !== null && (value as StoredReviewState).version === 1,
  );
}

export function recordReviewSession(seenIds: string[]): void {
  const current = readReviewState();
  writeDevice(REVIEW_KEY, {
    version: 1,
    lastReviewAt: new Date().toISOString(),
    sessionsCompleted: current.sessionsCompleted + 1,
    // Keep the last two sessions' worth so items rotate before repeating.
    seenItemIds: [...seenIds, ...current.seenItemIds].slice(0, 8),
  } satisfies StoredReviewState);
}

export interface ReviewDueState {
  due: boolean;
  /** Whole days since the anchoring event (lesson/assessment/last review). */
  dayOffset: number;
  rusty: boolean;
}

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Due when ≥1 day has passed since the last anchor (first completion or last
 * review); rusty when ≥7 days. Requires some prior learning activity.
 */
export function reviewDue(
  anchors: (string | null | undefined)[],
  now: number = Date.now(),
): ReviewDueState {
  const review = readReviewState();
  const stamps = [...anchors, review.lastReviewAt]
    .filter((value): value is string => typeof value === "string")
    .map((value) => Date.parse(value))
    .filter(Number.isFinite);
  if (stamps.length === 0) return { due: false, dayOffset: 0, rusty: false };
  const latest = Math.max(...stamps);
  const dayOffset = Math.floor((now - latest) / DAY_MS);
  return { due: dayOffset >= 1, dayOffset, rusty: dayOffset >= 7 };
}

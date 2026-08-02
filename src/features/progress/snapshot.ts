import { readDevice } from "@/lib/device-store";
import { LESSON_ROUTE, SECTION_SLUG } from "@/lib/routes";
import type { ProgressSnapshot, ResumeTarget, SectionStatus } from "./types";

/**
 * Snapshot aggregation: reads the per-step device stores (each owned by its
 * feature hook) into the frozen ProgressSnapshot, and derives the resume
 * target and section status the shell surfaces use.
 */
const LESSON_KEY = `ba.v1.lesson.${SECTION_SLUG}`;
const ACTIVITY_KEY = "ba.v1.activity";
const CHECK_KEY = `ba.v1.knowledge-check.${SECTION_SLUG}`;
const ASSESSMENT_KEY = `ba.v1.assessment.${SECTION_SLUG}`;

export const LESSON_STAGE_COUNT = 5;
const ACTIVITY_TOTAL = 10;
const CHECK_TOTAL = 4;

interface RawLesson {
  active: number;
  completed: number[];
}

interface RawActivity {
  answers: Record<string, unknown>;
  completed: boolean;
}

interface RawCheck {
  version: 1;
  answers: Record<string, unknown>;
  completed: boolean;
}

interface RawAssessment {
  version: 1;
  attempts: number;
  bestScore: number;
  total: number;
  passed: boolean;
  lastAttemptAt: string;
}

export function readSnapshot(): ProgressSnapshot {
  const lesson = readDevice<RawLesson | null>(
    LESSON_KEY,
    null,
    (value) =>
      typeof value === "object" &&
      value !== null &&
      typeof (value as RawLesson).active === "number" &&
      Array.isArray((value as RawLesson).completed),
  );
  const activity = readDevice<RawActivity | null>(
    ACTIVITY_KEY,
    null,
    (value) =>
      typeof value === "object" &&
      value !== null &&
      typeof (value as RawActivity).answers === "object",
  );
  const check = readDevice<RawCheck | null>(
    CHECK_KEY,
    null,
    (value) => typeof value === "object" && value !== null && (value as RawCheck).version === 1,
  );
  const assessment = readDevice<RawAssessment | null>(
    ASSESSMENT_KEY,
    null,
    (value) =>
      typeof value === "object" && value !== null && (value as RawAssessment).version === 1,
  );

  return buildSnapshot({ lesson, activity, check, assessment });
}

export function buildSnapshot(raw: {
  lesson: RawLesson | null;
  activity: RawActivity | null;
  check: RawCheck | null;
  assessment: RawAssessment | null;
}): ProgressSnapshot {
  return {
    schemaVersion: 1,
    sectionSlug: SECTION_SLUG,
    lesson: raw.lesson
      ? {
          activeStage: raw.lesson.active,
          stagesCompleted: raw.lesson.completed.length,
          totalStages: LESSON_STAGE_COUNT,
        }
      : null,
    activity: raw.activity
      ? {
          answered: Object.keys(raw.activity.answers).length,
          total: ACTIVITY_TOTAL,
          completed: raw.activity.completed === true,
        }
      : null,
    check: raw.check
      ? {
          answered: Object.keys(raw.check.answers).length,
          total: CHECK_TOTAL,
          completed: raw.check.completed === true,
        }
      : null,
    assessment: raw.assessment
      ? {
          attempts: raw.assessment.attempts,
          bestScore: raw.assessment.bestScore,
          total: raw.assessment.total,
          passed: raw.assessment.passed === true,
          lastAttemptAt: raw.assessment.lastAttemptAt,
        }
      : null,
  };
}

export function sectionStatus(snapshot: ProgressSnapshot): SectionStatus {
  if (snapshot.assessment?.passed) return "complete";
  const started =
    (snapshot.lesson && (snapshot.lesson.stagesCompleted > 0 || snapshot.lesson.activeStage > 0)) ||
    (snapshot.activity && snapshot.activity.answered > 0) ||
    (snapshot.check && snapshot.check.answered > 0) ||
    (snapshot.assessment && snapshot.assessment.attempts > 0);
  return started ? "in_progress" : "not_started";
}

/**
 * Where "Continue" should land (completion, not score, advances - ADR-003):
 * finish the lesson stages, then the activity, then the check, then the
 * assessment; a passed section resumes at the pathway's next-step anchor.
 */
export function resumeTarget(snapshot: ProgressSnapshot): ResumeTarget | null {
  if (sectionStatus(snapshot) === "not_started") return null;
  if (snapshot.assessment?.passed) {
    return { href: "/learn#next", label: "See what's next" };
  }
  if (!snapshot.lesson || snapshot.lesson.stagesCompleted < snapshot.lesson.totalStages) {
    const stage = (snapshot.lesson?.activeStage ?? 0) + 1;
    return { href: LESSON_ROUTE, label: `the lesson (stage ${stage} of ${LESSON_STAGE_COUNT})` };
  }
  if (!snapshot.activity || !snapshot.activity.completed) {
    return { href: `${LESSON_ROUTE}/activity`, label: "Sort the System" };
  }
  if (!snapshot.check || !snapshot.check.completed) {
    return { href: `${LESSON_ROUTE}/check`, label: "the knowledge check" };
  }
  return { href: `${LESSON_ROUTE}/assessment`, label: "the assessment" };
}

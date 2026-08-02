/**
 * ProgressSnapshot - FROZEN at M5 exit (roadmap dependency D5, 2026-08-02).
 * migrateGuestProgress (M6) integrates against this exact shape. Any change
 * requires a new schemaVersion plus a migration path; do not edit in place.
 *
 * Privacy: the snapshot carries learning state only - counts, flags, stage
 * indices, ISO timestamps. Never names, emails, or free-text input.
 */
export interface ProgressSnapshot {
  schemaVersion: 1;
  sectionSlug: string;
  lesson: {
    activeStage: number;
    stagesCompleted: number;
    totalStages: number;
  } | null;
  activity: {
    answered: number;
    total: number;
    completed: boolean;
  } | null;
  check: {
    answered: number;
    total: number;
    completed: boolean;
  } | null;
  assessment: {
    attempts: number;
    bestScore: number | null;
    total: number | null;
    passed: boolean;
    lastAttemptAt: string | null;
  } | null;
}

export type SectionStatus = "not_started" | "in_progress" | "complete";

export interface ResumeTarget {
  /** Route to continue at, relative to the app root. */
  href: string;
  /** Learner-facing step label for "Continue where you left off: {step}". */
  label: string;
}

/** Stored at ba.v1.assessment.<section> when a graded attempt completes. */
export interface StoredAssessmentOutcome {
  version: 1;
  attempts: number;
  bestScore: number;
  total: number;
  passed: boolean;
  lastAttemptAt: string;
}

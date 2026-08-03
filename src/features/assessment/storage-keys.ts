/**
 * Per-section device-storage keys for assessment state (ADR-025 guest model).
 *
 * These existed as four shared constants, which was correct with one
 * assessment and became a data bug with eight: passing any section's
 * assessment wrote its outcome into the first section's completion state,
 * attempt counts bled across sections, and a mid-attempt refresh mirror could
 * restore a different section's attempt.
 *
 * The first section keeps its original key names exactly, so no learner's
 * existing progress is orphaned by this fix. Every other scope - including the
 * pathway assessment's `pathway:<slug>` - gets its own suffix.
 */
export const CLASSIC_ASSESSMENT_SECTION = "ai-automation-software";

export interface AssessmentStorageKeys {
  /** Completion outcome (localStorage): score, passed, categories. */
  outcome: string;
  /** Monotonic attempt counter (localStorage). */
  attemptCount: string;
  /** Previous draw's question ids, for different-combination retakes (localStorage). */
  lastCombination: string;
  /** Mid-attempt refresh mirror (sessionStorage). */
  mirror: string;
}

/** `pathway:ai-awareness` and any future scope become storage-safe suffixes. */
function suffix(sectionSlug: string): string {
  return sectionSlug.replace(/[^a-z0-9-]/gi, "-");
}

export function assessmentStorageKeys(sectionSlug: string): AssessmentStorageKeys {
  if (sectionSlug === CLASSIC_ASSESSMENT_SECTION) {
    return {
      outcome: "ba.v1.assessment.ai-automation-software",
      attemptCount: "ba.v1.attempt_count",
      lastCombination: "ba.v1.last_combination",
      mirror: "ba.v1.attempt_mirror",
    };
  }
  const scope = suffix(sectionSlug);
  return {
    outcome: `ba.v1.assessment.${scope}`,
    attemptCount: `ba.v1.attempt_count.${scope}`,
    lastCombination: `ba.v1.last_combination.${scope}`,
    mirror: `ba.v1.attempt_mirror.${scope}`,
  };
}

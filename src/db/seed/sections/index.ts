import type { SectionSeed } from "@/features/content/types";
import type { ActivitySeed, CheckSeed } from "@/features/content/activity-types";
import type { AssessmentSeed } from "@/features/assessment";
import { aia1Seed } from "./aia-1";
import { aia4Seed } from "./aia-4";
import { aia5Seed } from "./aia-5";
import { aia2Seed } from "./aia-2";
import { aia6Seed } from "./aia-6";
import { aia7Seed } from "./aia-7";
import { aia1CheckSeed } from "./aia-1-check";
import { aia1ActivitySeed, aia2ActivitySeed, aia4ActivitySeed } from "./activities-1-2-4";
import { aia5ActivitySeed, aia6ActivitySeed, aia7ActivitySeed } from "./activities-5-6-7";
import { aia1AssessmentSeed } from "./aia-1-assessment";
import { aia2AssessmentSeed, aia4AssessmentSeed } from "./banks-2-4";
import { aia5AssessmentSeed, aia6AssessmentSeed, aia7AssessmentSeed } from "./banks-5-6-7";
import { uie1Seed } from "./uie-1";
import { uie1ActivitySeed, uie1CheckSeed } from "./uie-1-activity";
import { uie1AssessmentSeed } from "./uie-1-assessment";
import { uie2Seed } from "./uie-2";
import { uie2ActivitySeed, uie2CheckSeed } from "./uie-2-activity";
import { uie2AssessmentSeed } from "./uie-2-assessment";
import {
  aia2CheckSeed,
  aia4CheckSeed,
  aia5CheckSeed,
  aia6CheckSeed,
  aia7CheckSeed,
} from "./remaining-checks";

/**
 * Sections beyond the first published one (docs/content/content-map.md).
 *
 * Seeds carry their governance lifecycle state (docs/content/governance.md).
 * Only `published` seeds reach the database and only they must satisfy the
 * completeness gate, because the learning framework requires retrieval by some
 * route: a section without its activity and knowledge check is not finished
 * teaching, and shipping one would quietly lower the standard.
 *
 * `drafting` seeds are authored content under review. They are still held to
 * every copy rule (banned wording, chip resolution, analogy boundaries), so
 * the writing is gated even while the section is incomplete.
 */
export type SeedStatus = "drafting" | "published";

export interface SectionBundle {
  seed: SectionSeed;
  status: SeedStatus;
  /** Retrieval step. A published section needs at least one (lint enforces). */
  check?: CheckSeed;
  /** The section's designed interaction (content-map.md), generic dialect. */
  activity?: ActivitySeed;
  /** Graded bank. Optional: Level 1 grading may sit with the pathway assessment. */
  assessment?: AssessmentSeed;
  /** What the section still needs before it can move to published. */
  outstanding?: string;
}

export const sectionBundles: SectionBundle[] = [
  {
    seed: aia1Seed,
    status: "published",
    activity: aia1ActivitySeed,
    check: aia1CheckSeed,
    assessment: aia1AssessmentSeed,
  },
  {
    seed: aia4Seed,
    status: "published",
    activity: aia4ActivitySeed,
    check: aia4CheckSeed,
    assessment: aia4AssessmentSeed,
  },
  {
    seed: aia5Seed,
    status: "published",
    activity: aia5ActivitySeed,
    check: aia5CheckSeed,
    assessment: aia5AssessmentSeed,
  },
  {
    seed: aia2Seed,
    status: "published",
    activity: aia2ActivitySeed,
    check: aia2CheckSeed,
    assessment: aia2AssessmentSeed,
  },
  {
    seed: aia6Seed,
    status: "published",
    activity: aia6ActivitySeed,
    check: aia6CheckSeed,
    assessment: aia6AssessmentSeed,
  },
  {
    seed: aia7Seed,
    status: "published",
    activity: aia7ActivitySeed,
    check: aia7CheckSeed,
    assessment: aia7AssessmentSeed,
  },
  {
    // UI Engineer Readiness pilot (readiness evaluation deck): the one module
    // of six that ships without code rendering, run first to buy engagement
    // signal before the platform invests in code blocks and timers.
    seed: uie1Seed,
    status: "published",
    activity: uie1ActivitySeed,
    check: uie1CheckSeed,
    assessment: uie1AssessmentSeed,
  },
  {
    // UIE-2: the GQ item families themselves. UIE-1 teaches the routine;
    // this is what the logical ability round actually asks.
    seed: uie2Seed,
    status: "published",
    activity: uie2ActivitySeed,
    check: uie2CheckSeed,
    assessment: uie2AssessmentSeed,
  },
];

/** Seeds the publish pipeline writes. */
export const additionalSectionSeeds: SectionSeed[] = sectionBundles
  .filter((bundle) => bundle.status === "published")
  .map((bundle) => bundle.seed);

/** Every authored seed, published or not, for the copy-quality gates. */
export const allAuthoredSectionSeeds: SectionSeed[] = sectionBundles.map((bundle) => bundle.seed);

/** Activity meta (title/intro/instructions) for a section's route. */
export function activityForSection(sectionSlug: string): ActivitySeed | undefined {
  return sectionBundles.find((bundle) => bundle.seed.section.slug === sectionSlug)?.activity;
}

/** Check meta (label/intro/completion) for a section's route. */
export function checkForSection(sectionSlug: string): CheckSeed | undefined {
  return sectionBundles.find((bundle) => bundle.seed.section.slug === sectionSlug)?.check;
}

/** Bank meta (intro) for a section's assessment route. */
export function assessmentForSection(sectionSlug: string): AssessmentSeed | undefined {
  return sectionBundles.find((bundle) => bundle.seed.section.slug === sectionSlug)?.assessment;
}

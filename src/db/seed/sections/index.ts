import type { SectionSeed } from "@/features/content/types";
import type { CheckSeed } from "@/features/content/activity-types";
import type { AssessmentSeed } from "@/features/assessment";
import { aia1Seed } from "./aia-1";
import { aia4Seed } from "./aia-4";
import { aia5Seed } from "./aia-5";
import { aia2Seed } from "./aia-2";
import { aia6Seed } from "./aia-6";
import { aia7Seed } from "./aia-7";
import { aia1CheckSeed } from "./aia-1-check";
import { aia1AssessmentSeed } from "./aia-1-assessment";
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
  /** Graded bank. Optional: Level 1 grading may sit with the pathway assessment. */
  assessment?: AssessmentSeed;
  /** What the section still needs before it can move to published. */
  outstanding?: string;
}

export const sectionBundles: SectionBundle[] = [
  {
    seed: aia1Seed,
    status: "published",
    check: aia1CheckSeed,
    assessment: aia1AssessmentSeed,
  },
  {
    seed: aia4Seed,
    status: "published",
    check: aia4CheckSeed,
    outstanding: "assessment bank; Level 1 grading sits with the pathway assessment",
  },
  {
    seed: aia5Seed,
    status: "published",
    check: aia5CheckSeed,
    outstanding: "assessment bank; Level 1 grading sits with the pathway assessment",
  },
  {
    seed: aia2Seed,
    status: "published",
    check: aia2CheckSeed,
    outstanding: "assessment bank; Level 1 grading sits with the pathway assessment",
  },
  {
    seed: aia6Seed,
    status: "published",
    check: aia6CheckSeed,
    outstanding: "assessment bank; Level 1 grading sits with the pathway assessment",
  },
  {
    seed: aia7Seed,
    status: "published",
    check: aia7CheckSeed,
    outstanding: "assessment bank; Level 1 grading sits with the pathway assessment",
  },
];

/** Seeds the publish pipeline writes. */
export const additionalSectionSeeds: SectionSeed[] = sectionBundles
  .filter((bundle) => bundle.status === "published")
  .map((bundle) => bundle.seed);

/** Every authored seed, published or not, for the copy-quality gates. */
export const allAuthoredSectionSeeds: SectionSeed[] = sectionBundles.map((bundle) => bundle.seed);

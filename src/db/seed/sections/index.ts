import type { SectionSeed } from "@/features/content/types";
import { aia1Seed } from "./aia-1";
import { aia4Seed } from "./aia-4";
import { aia5Seed } from "./aia-5";
import { aia2Seed } from "./aia-2";
import { aia6Seed } from "./aia-6";
import { aia7Seed } from "./aia-7";

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
  /** What the section still needs before it can move to published. */
  outstanding?: string;
}

export const sectionBundles: SectionBundle[] = [
  {
    seed: aia1Seed,
    status: "drafting",
    outstanding:
      "activity, knowledge check and assessment bank, plus generalized step routes; see content-map.md",
  },
  {
    seed: aia4Seed,
    status: "drafting",
    outstanding: "activity, knowledge check and assessment bank, plus generalized step routes",
  },
  {
    seed: aia5Seed,
    status: "drafting",
    outstanding: "activity, knowledge check and assessment bank, plus generalized step routes",
  },
  {
    seed: aia2Seed,
    status: "drafting",
    outstanding:
      "activity, knowledge check and assessment bank; examples pending the document audit",
  },
  {
    seed: aia6Seed,
    status: "drafting",
    outstanding: "the Myth or Reality activity, knowledge check and assessment bank",
  },
  {
    seed: aia7Seed,
    status: "drafting",
    outstanding: "pathway self-assessment and the cross-section pathway assessment",
  },
];

/** Seeds the publish pipeline writes. */
export const additionalSectionSeeds: SectionSeed[] = sectionBundles
  .filter((bundle) => bundle.status === "published")
  .map((bundle) => bundle.seed);

/** Every authored seed, published or not, for the copy-quality gates. */
export const allAuthoredSectionSeeds: SectionSeed[] = sectionBundles.map((bundle) => bundle.seed);

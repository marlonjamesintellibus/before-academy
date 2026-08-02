/**
 * Activity + knowledge check content model (docs/product/screens/activity-and-check.md,
 * phase1-content/02-diagrams-and-activities/classification-activity.md,
 * phase1-content/03-assessment/knowledge-check.md).
 */

/** The five fixed classification labels, canonical order (never shuffled). */
export const SCENARIO_CATEGORIES = [
  "traditional_software",
  "automation",
  "ai_assisted",
  "combination",
  "not_enough_information",
] as const;

export type ScenarioCategory = (typeof SCENARIO_CATEGORIES)[number];

export const CATEGORY_LABELS: Record<ScenarioCategory, string> = {
  traditional_software: "Traditional software",
  automation: "Automation",
  ai_assisted: "AI-assisted",
  combination: "Combination",
  not_enough_information: "Not enough information",
};

export interface ScenarioSeed {
  id: string;
  position: number;
  title: string;
  body: string;
  difficulty: "foundational" | "applied" | "challenging";
  correctCategory: ScenarioCategory;
  /** Additional accepted categories for honest-ambiguity items. */
  accepted: ScenarioCategory[];
  clue: string;
  ambiguityNote?: string;
  /** Verdict → Because → Clue → Next feedback, one per category label. */
  feedback: Record<ScenarioCategory, string>;
  /** Post-feedback explanation paragraph, when the source provides one. */
  explanation?: string;
  /** Lesson block anchor (block id, lowercased client-side) for Review this concept. */
  remediationAnchor: string;
}

export interface ActivitySeed {
  id: string;
  title: string;
  intro: string;
  instructions: string;
  scenarios: ScenarioSeed[];
}

export interface CheckOptionSeed {
  text: string;
  correct: boolean;
}

export interface CheckQuestionSeed {
  id: string;
  stem: string;
  /** Single correct option; five-label items are MC with the fixed label order. */
  options: CheckOptionSeed[];
  correctFeedback: string;
  incorrectFeedback: string;
  /** Remediation chip: label + lesson block anchor. */
  chip: { label: string; anchor: string };
  category:
    | "traditional_software"
    | "automation"
    | "ai_characteristics"
    | "combined_systems"
    | "classification"
    | "ambiguity"
    | "misconceptions";
  difficulty: "foundational" | "applied" | "challenging";
  misconceptionTags: string[];
  learningOutcomes: string[];
}

export interface CheckSeed {
  id: string;
  label: string;
  intro: string;
  questions: CheckQuestionSeed[];
  completion: { body: string };
}

/** What the activity page serves to the player (same shape as the seed). */
export type PublishedScenario = ScenarioSeed;

export interface PublishedCheckQuestion {
  id: string;
  stem: string;
  options: { id: string; text: string; correct: boolean }[];
  correctFeedback: string;
  incorrectFeedback: string;
  chip: { label: string; anchor: string };
}

import type { AssessmentCategory } from "@/features/assessment";
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

/**
 * A per-scenario answer option, for activities whose choices are not the five
 * classification labels (content-map.md: Choose the Best Use Case, Would You
 * Trust This?, Myth or Reality). Each option carries its own feedback, so
 * being wrong teaches the property that decided it, not just the verdict.
 */
export interface ScenarioOptionSeed {
  id: string;
  label: string;
  correct: boolean;
  /** Verdict-formula feedback for choosing this option. */
  feedback: string;
}

/**
 * One shape, two dialects. A classic scenario answers with the five fixed
 * classification labels (correctCategory + accepted + feedback). A generic
 * scenario carries its own options. Exactly one dialect must be present;
 * content-lint enforces it, and scenarioOptions() gives every consumer a
 * single normalized view so the player never branches on dialect.
 */
export interface ScenarioSeed {
  id: string;
  position: number;
  title: string;
  body: string;
  difficulty: "foundational" | "applied" | "challenging";
  correctCategory?: ScenarioCategory;
  /** Additional accepted categories for honest-ambiguity items. */
  accepted?: ScenarioCategory[];
  clue: string;
  ambiguityNote?: string;
  /** Verdict → Because → Clue → Next feedback, one per category label. */
  feedback?: Record<ScenarioCategory, string>;
  /** Generic dialect: per-scenario options with per-option feedback. */
  options?: ScenarioOptionSeed[];
  /** Question above the options. Defaults to the classic sorting legend. */
  prompt?: string;
  /** Post-feedback explanation paragraph, when the source provides one. */
  explanation?: string;
  /** Lesson block anchor (block id, lowercased client-side) for Review this concept. */
  remediationAnchor: string;
}

/** The normalized option view every consumer renders from. */
export interface ScenarioOption {
  id: string;
  label: string;
  correct: boolean;
  feedback: string;
}

/**
 * Normalizes either dialect to the same option list. For classic scenarios the
 * five labels come out in canonical order with correctness and feedback derived
 * from the existing fields, so the classic experience is unchanged by
 * construction; a unit test asserts the equivalence against the live seed.
 */
export function scenarioOptions(scenario: ScenarioSeed): ScenarioOption[] {
  if (scenario.options && scenario.options.length > 0) return scenario.options;
  const accepted = scenario.accepted ?? [];
  return SCENARIO_CATEGORIES.map((category) => ({
    id: category,
    label: CATEGORY_LABELS[category],
    correct: category === scenario.correctCategory || accepted.includes(category),
    feedback: scenario.feedback?.[category] ?? "",
  }));
}

/** The answer shown as "Best-supported": the primary correct option. */
export function primaryCorrectOption(scenario: ScenarioSeed): ScenarioOption {
  const options = scenarioOptions(scenario);
  if (scenario.correctCategory && !scenario.options) {
    const primary = options.find((option) => option.id === scenario.correctCategory);
    if (primary) return primary;
  }
  const first = options.find((option) => option.correct);
  return first ?? { id: "", label: "", correct: false, feedback: "" };
}

/** True when the scenario answers with the five fixed classification labels. */
export function isClassicScenario(scenario: ScenarioSeed): boolean {
  return !scenario.options || scenario.options.length === 0;
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
  // The check taxonomy is the assessment taxonomy; the union previously lived
  // here as a copy and silently fell out of date when categories grew.
  category: AssessmentCategory;
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

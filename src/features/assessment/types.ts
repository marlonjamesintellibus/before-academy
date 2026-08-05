/**
 * Assessment content and payload model (docs/engineering/assessment-engine.md,
 * docs/content/assessments.md, phase1-content/03-assessment/assessment.md).
 * Sanitized types never carry is_correct or rationale (api-contracts rule).
 */

export type AssessmentCategory =
  | "traditional_software"
  | "automation"
  | "ai_characteristics"
  | "combined_systems"
  | "classification"
  | "ambiguity"
  | "constraint_reading"
  | "decomposition"
  | "edge_cases"
  | "estimation"
  | "reasoning_communication"
  | "sequences"
  | "syllogisms"
  | "coding_decoding"
  | "arrangements"
  | "quantitative_reasoning"
  | "misconceptions";

export type AssessmentFormat = "multiple_choice" | "multiple_select" | "scenario_decision";

export interface AssessmentOptionSeed {
  text: string;
  correct: boolean;
}

export interface AssessmentQuestionSeed {
  id: string;
  format: AssessmentFormat;
  category: AssessmentCategory;
  difficulty: "foundational" | "applied" | "challenging";
  stem: string;
  options: AssessmentOptionSeed[];
  /** Verdict-formula feedback shown in the post-submit review. */
  correctExplanation: string;
  incorrectExplanation: string;
  /** Always drawn in every attempt (QB-009 ambiguity, QB-010 misconceptions). */
  fixedDraw: boolean;
  /** Five-label items keep canonical option order; others rotate per attempt. */
  rotateOptions: boolean;
  learningOutcomes: string[];
  misconceptionTags: string[];
}

export interface AssessmentSeed {
  id: string;
  intro: string;
  questions: AssessmentQuestionSeed[];
}

/** What the client receives during an attempt: no is_correct, no rationale. */
export interface SanitizedQuestion {
  id: string;
  format: AssessmentFormat;
  category: AssessmentCategory;
  stem: string;
  options: { id: string; text: string }[];
}

export interface AttemptPayload {
  token: string;
  attemptNumber: number;
  questions: SanitizedQuestion[];
}

export interface AttemptAnswer {
  questionId: string;
  /** Selected option ids: one for MC/scenario, one or more for MS. */
  optionIds: string[];
}

export interface QuestionReview {
  questionId: string;
  category: AssessmentCategory;
  correct: boolean;
  correctOptionIds: string[];
  explanation: string;
  /** Misconception ids this question probes - drives targeted remediation routing. */
  misconceptions: string[];
}

export interface AttemptResult {
  score: number;
  total: number;
  passed: boolean;
  /** Minimum correct answers to pass at the configured threshold. */
  passingScore: number;
  categoriesFailed: AssessmentCategory[];
  review: QuestionReview[];
  attemptNumber: number;
}

export const CATEGORY_DISPLAY: Record<AssessmentCategory, string> = {
  traditional_software: "Traditional software",
  automation: "Automation",
  ai_characteristics: "AI characteristics",
  combined_systems: "Combined systems",
  classification: "Classification",
  ambiguity: "Ambiguity",
  misconceptions: "Misconceptions",
  constraint_reading: "Reading the problem",
  decomposition: "Breaking problems down",
  edge_cases: "Edge cases",
  estimation: "Estimation and checking",
  reasoning_communication: "Reasoning out loud",
  sequences: "Number and letter sequences",
  syllogisms: "Syllogisms and deduction",
  coding_decoding: "Codes and ciphers",
  arrangements: "Arrangements and relations",
  quantitative_reasoning: "Rates, clocks and trap arithmetic",
};

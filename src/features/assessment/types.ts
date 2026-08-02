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
};

/** Failed category → where to review (docs/content/assessments.md remediation map). */
export const REMEDIATION_TARGETS: Record<AssessmentCategory, { label: string; href: string }[]> = {
  traditional_software: [{ label: "Traditional software lesson block", href: "#p1-lesson-002" }],
  automation: [
    { label: "Automation lesson block", href: "#p1-lesson-003" },
    { label: "Combined systems lesson block", href: "#p1-lesson-005" },
  ],
  ai_characteristics: [
    { label: "AI lesson block (probabilistic outputs)", href: "#p1-lesson-004" },
  ],
  combined_systems: [
    { label: "Combined systems lesson block", href: "#p1-lesson-005" },
    { label: "The layer diagram", href: "#p1-dgm-001" },
  ],
  classification: [
    { label: "Sort the System activity", href: "/activity" },
    { label: "Compare the three", href: "#p1-lesson-005" },
  ],
  ambiguity: [
    { label: "Scenario 10: when the answer is 'not enough information'", href: "/activity" },
  ],
  misconceptions: [{ label: "The misconception callout", href: "#p1-lesson-005-misconception" }],
};

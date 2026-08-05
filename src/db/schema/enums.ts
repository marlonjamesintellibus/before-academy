import { pgEnum } from "drizzle-orm/pg-core";

/** Content lifecycle (ADR-021; docs/engineering/database.md). Content archives; learner data hard-deletes (ADR-022). */
export const contentStatus = pgEnum("content_status", [
  "draft",
  "in_review",
  "published",
  "archived",
]);

/** Layered disclosure (ADR-006). */
export const blockLayer = pgEnum("block_layer", ["quick", "explore", "deeper", "apply"]);

/** Practice vs graded split (ADR-029). */
export const questionKind = pgEnum("question_kind", ["check", "assessment"]);

/** Question formats (docs/content/assessments.md; scoring rules in assessment-engine.md). */
export const questionFormat = pgEnum("question_format", [
  "multiple_choice",
  "multiple_select",
  "matching",
  "sorting",
  "scenario_decision",
]);

/** Blueprint categories (docs/content/assessments.md). */
export const blueprintCategory = pgEnum("blueprint_category", [
  "traditional_software",
  "automation",
  "ai_characteristics",
  "combined_systems",
  "classification",
  "ambiguity",
  "misconceptions",
  // Reasoning taxonomy (UI Engineer Readiness pilot). Enum values are
  // append-only: expand-then-contract (ADR-023) allows adding, never removing.
  "constraint_reading",
  "decomposition",
  "edge_cases",
  "estimation",
  "reasoning_communication",
  // Aptitude item families (UIE-2 Logical Ability): the classic GQ formats.
  "sequences",
  "syllogisms",
  "coding_decoding",
  "arrangements",
  "quantitative_reasoning",
  // Web foundations families (UIE-3 HTML & CSS).
  "semantic_html",
  "css_box_model",
  "css_layout",
  "css_specificity",
  "web_accessibility",
]);

export const questionDifficulty = pgEnum("question_difficulty", [
  "foundational",
  "applied",
  "challenging",
]);

/** Sort the System classification labels (fixed five, docs/content canonical labels). */
export const scenarioCategory = pgEnum("scenario_category", [
  "traditional_software",
  "automation",
  "ai_assisted",
  "combination",
  "not_enough_information",
]);

/** Roles reserved beyond Phase 1 (docs/engineering/auth.md). */
export const learnerRole = pgEnum("learner_role", ["learner", "content_admin", "org_admin"]);

/** Attempt entry route (ADR-005). */
export const attemptRoute = pgEnum("attempt_route", ["lesson_first", "assessment_first"]);

/** Confidence prompt stage (pre-lesson / post-results). */
export const confidenceStage = pgEnum("confidence_stage", ["pre", "post"]);

/** Feedback report types (S13b). */
export const feedbackType = pgEnum("feedback_type", [
  "content_error",
  "technical_issue",
  "suggestion",
]);

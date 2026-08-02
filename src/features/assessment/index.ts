/**
 * assessment feature public API (client-safe). Server actions are imported
 * directly by client components (Next serializes them); scoring/selection are
 * pure and exported for tests.
 */
export { AssessmentFlow } from "./components/assessment-flow";
export { score } from "./scoring";
export { drawQuestions, shuffle } from "./selection";
export {
  CATEGORY_DISPLAY,
  REMEDIATION_TARGETS,
  type AssessmentCategory,
  type AssessmentSeed,
  type AttemptPayload,
  type AttemptResult,
  type SanitizedQuestion,
} from "./types";

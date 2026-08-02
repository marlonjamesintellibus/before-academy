import type { ScenarioCategory } from "./activity-types";

/**
 * Phase B content models (docs/roadmap/experience-plan.md): the opening
 * diagnostic (A1), misconception remediation modules (P1-REM), and extra
 * inline checks - all transformed from authored phase1-content sources.
 */

/** One predict-first diagnostic item (P1-DIAG-001-S0x). Feedback is deferred
 * until after the lesson (A1 design: the probe must not teach the answers). */
export interface DiagnosticItemSeed {
  id: string;
  body: string;
  correctCategory: ScenarioCategory;
  /** Additional accepted categories, if the source allows partial credit. */
  accepted: ScenarioCategory[];
}

export interface DiagnosticSeed {
  id: string;
  intro: string;
  items: DiagnosticItemSeed[];
}

/** A misconception remediation module (P1-REM-n remediates misconception Mn). */
export interface RemediationModuleSeed {
  id: string;
  misconceptionId: string;
  title: string;
  /** The misconception in the learner's voice. */
  claim: string;
  /** Fresh-wording corrective paragraphs (never the sentences that already failed). */
  body: string[];
  /** Mini-confirm: one quick question proving the correction landed. */
  miniConfirm: {
    prompt: string;
    options: { text: string; correct: boolean }[];
    feedbackCorrect: string;
    feedbackIncorrect: string;
  };
}

export interface RemediationSeed {
  modules: RemediationModuleSeed[];
  /** Assessment category → misconception ids to review for that category. */
  categoryMap: Record<string, string[]>;
}

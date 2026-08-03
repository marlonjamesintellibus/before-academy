import type { AssessmentSeed } from "@/features/assessment";
import type { ActivitySeed, CheckSeed, ScenarioSeed } from "./activity-types";
import { SCENARIO_CATEGORIES } from "./activity-types";
import type { LintIssue } from "./lint";
import type { SectionSeed } from "./types";

/**
 * Content-lint for the activity and knowledge check (Eng §14). Structural rules
 * from the binding design decisions in classification-activity.md: 10 scenarios,
 * canonical order, the 6→7 chatbot pair adjacent and fixed, five feedback
 * strings per scenario, resolvable remediation anchors.
 */

const BANNED =
  /—|\b(simply|obvious(ly)?|of course)\b|\beasy\b(?! to mix up)|\bfail(ed|ing|ure)?\b/i;

function lintLearnerText(id: string, text: string, issues: LintIssue[]): void {
  const match = text.match(BANNED);
  if (match) {
    issues.push({
      blockId: id,
      message: `banned wording: "${match[0]}" in "${text.slice(0, 50)}..."`,
    });
  }
}

function scenarioAnchors(section: SectionSeed): Set<string> {
  return new Set(section.blocks.map((block) => block.id.toLowerCase()));
}

export function lintActivity(
  activity: ActivitySeed,
  section: SectionSeed,
  options?: { fixedSet?: boolean },
): LintIssue[] {
  const issues: LintIssue[] = [];
  const anchors = scenarioAnchors(section);

  // The 10-scenario shape and the 6/7 minimal pair are Sort the System's
  // contract, not a property of activities in general. New sections opt out
  // with fixedSet: false and get contiguity + minimum-size rules instead.
  const fixedSet = options?.fixedSet ?? true;
  if (fixedSet && activity.scenarios.length !== 10) {
    issues.push({
      blockId: activity.id,
      message: `expected 10 scenarios, found ${activity.scenarios.length}`,
    });
  }
  if (!fixedSet && activity.scenarios.length < 4) {
    issues.push({
      blockId: activity.id,
      message: `an activity needs at least 4 scenarios, found ${activity.scenarios.length}`,
    });
  }

  const positions = activity.scenarios.map((scenario) => scenario.position).sort((a, b) => a - b);
  const expected = Array.from({ length: activity.scenarios.length }, (_, i) => i + 1).join(",");
  if (positions.join(",") !== expected) {
    issues.push({
      blockId: activity.id,
      message: `scenario positions must be exactly 1..${activity.scenarios.length} (got ${positions.join(",")})`,
    });
  }

  if (fixedSet) {
    const byPosition = new Map(activity.scenarios.map((scenario) => [scenario.position, scenario]));
    const six = byPosition.get(6);
    const seven = byPosition.get(7);
    if (!six || !seven || !six.id.endsWith("S06") || !seven.id.endsWith("S07")) {
      issues.push({
        blockId: activity.id,
        message: "the fixed 6→7 minimal pair must sit at positions 6 and 7",
      });
    }
  }

  for (const scenario of activity.scenarios) {
    const generic = Boolean(scenario.options && scenario.options.length > 0);
    if (generic && (scenario.correctCategory || scenario.feedback)) {
      issues.push({
        blockId: scenario.id,
        message: "a scenario carries either options or the five-label fields, never both",
      });
    }
    if (generic) {
      const opts = scenario.options ?? [];
      if (opts.length < 2) {
        issues.push({
          blockId: scenario.id,
          message: "a generic scenario needs at least 2 options",
        });
      }
      if (!opts.some((option) => option.correct)) {
        issues.push({ blockId: scenario.id, message: "no option is marked correct" });
      }
      const ids = new Set(opts.map((option) => option.id));
      if (ids.size !== opts.length) {
        issues.push({ blockId: scenario.id, message: "duplicate option ids" });
      }
      for (const option of opts) {
        if (!option.feedback.trim()) {
          issues.push({
            blockId: scenario.id,
            message: `option ${option.id} has no feedback; the wrong answer is where teaching happens`,
          });
        }
      }
    } else {
      for (const category of SCENARIO_CATEGORIES) {
        if (!scenario.feedback?.[category]) {
          issues.push({
            blockId: scenario.id,
            message: `missing feedback for category ${category}`,
          });
        }
      }
    }
    if (!scenario.clue) issues.push({ blockId: scenario.id, message: "missing clue" });
    if (!anchors.has(scenario.remediationAnchor.toLowerCase())) {
      issues.push({
        blockId: scenario.id,
        message: `remediation anchor "${scenario.remediationAnchor}" does not resolve to a lesson block`,
      });
    }
    lintScenarioText(scenario, issues);
  }

  return issues;
}

function lintScenarioText(scenario: ScenarioSeed, issues: LintIssue[]): void {
  lintLearnerText(scenario.id, scenario.body, issues);
  lintLearnerText(scenario.id, scenario.clue, issues);
  for (const text of Object.values(scenario.feedback ?? {})) {
    lintLearnerText(scenario.id, text, issues);
  }
  for (const option of scenario.options ?? []) {
    lintLearnerText(scenario.id, option.label, issues);
    lintLearnerText(scenario.id, option.feedback, issues);
  }
  if (scenario.prompt) lintLearnerText(scenario.id, scenario.prompt, issues);
  if (scenario.explanation) lintLearnerText(scenario.id, scenario.explanation, issues);
}

export function lintCheck(check: CheckSeed, section: SectionSeed): LintIssue[] {
  const issues: LintIssue[] = [];
  const anchors = scenarioAnchors(section);

  if (check.questions.length !== 4) {
    issues.push({
      blockId: check.id,
      message: `expected 4 check questions, found ${check.questions.length}`,
    });
  }

  for (const question of check.questions) {
    const correct = question.options.filter((option) => option.correct);
    if (correct.length !== 1) {
      issues.push({
        blockId: question.id,
        message: `expected exactly 1 correct option, found ${correct.length}`,
      });
    }
    if (!anchors.has(question.chip.anchor.toLowerCase())) {
      issues.push({
        blockId: question.id,
        message: `chip anchor "${question.chip.anchor}" does not resolve to a lesson block`,
      });
    }
    lintLearnerText(question.id, question.stem, issues);
    for (const option of question.options) lintLearnerText(question.id, option.text, issues);
    lintLearnerText(question.id, question.correctFeedback, issues);
    lintLearnerText(question.id, question.incorrectFeedback, issues);
  }

  return issues;
}

/**
 * Graded-bank lint (review finding: an empty draw pool or a question with no
 * correct option ships silently and fails at runtime). Publish-time gate.
 */
export function lintAssessment(seed: AssessmentSeed): LintIssue[] {
  const issues: LintIssue[] = [];
  const questions = seed.questions;

  if (questions.length < 10) {
    issues.push({
      blockId: seed.id,
      message: `expected >=10 bank items, found ${questions.length}`,
    });
  }

  const fixed = questions.filter((question) => question.fixedDraw);
  if (fixed.length !== 2) {
    issues.push({
      blockId: seed.id,
      message: `expected exactly 2 fixedDraw items, found ${fixed.length}`,
    });
  }

  const pools: [string, (category: string) => boolean][] = [
    ["ai_characteristics", (category) => category === "ai_characteristics"],
    ["combined_systems", (category) => category === "combined_systems"],
    ["classification", (category) => category === "classification"],
    [
      "traditional/automation",
      (category) => category === "traditional_software" || category === "automation",
    ],
  ];
  for (const [label, match] of pools) {
    if (!questions.some((question) => !question.fixedDraw && match(question.category))) {
      issues.push({ blockId: seed.id, message: `empty draw pool: ${label}` });
    }
  }

  for (const question of questions) {
    const correct = question.options.filter((option) => option.correct);
    if (correct.length === 0) {
      issues.push({ blockId: question.id, message: "no correct option" });
    }
    if (question.format !== "multiple_select" && correct.length > 1) {
      issues.push({
        blockId: question.id,
        message: `${correct.length} correct options on single-answer format`,
      });
    }
    lintLearnerText(question.id, question.stem, issues);
    for (const option of question.options) lintLearnerText(question.id, option.text, issues);
    lintLearnerText(question.id, question.correctExplanation, issues);
    lintLearnerText(question.id, question.incorrectExplanation, issues);
  }

  return issues;
}

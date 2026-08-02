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

export function lintActivity(activity: ActivitySeed, section: SectionSeed): LintIssue[] {
  const issues: LintIssue[] = [];
  const anchors = scenarioAnchors(section);

  if (activity.scenarios.length !== 10) {
    issues.push({
      blockId: activity.id,
      message: `expected 10 scenarios, found ${activity.scenarios.length}`,
    });
  }

  const positions = activity.scenarios.map((scenario) => scenario.position).sort((a, b) => a - b);
  if (positions.join(",") !== "1,2,3,4,5,6,7,8,9,10") {
    issues.push({
      blockId: activity.id,
      message: `scenario positions must be exactly 1..10 (got ${positions.join(",")})`,
    });
  }

  const byPosition = new Map(activity.scenarios.map((scenario) => [scenario.position, scenario]));
  const six = byPosition.get(6);
  const seven = byPosition.get(7);
  if (!six || !seven || !six.id.endsWith("S06") || !seven.id.endsWith("S07")) {
    issues.push({
      blockId: activity.id,
      message: "the fixed 6→7 minimal pair must sit at positions 6 and 7",
    });
  }

  for (const scenario of activity.scenarios) {
    for (const category of SCENARIO_CATEGORIES) {
      if (!scenario.feedback[category]) {
        issues.push({ blockId: scenario.id, message: `missing feedback for category ${category}` });
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
  for (const text of Object.values(scenario.feedback)) lintLearnerText(scenario.id, text, issues);
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

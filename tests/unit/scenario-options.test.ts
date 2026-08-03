import { describe, expect, it } from "vitest";
import {
  CATEGORY_LABELS,
  SCENARIO_CATEGORIES,
  isClassicScenario,
  primaryCorrectOption,
  scenarioOptions,
} from "@/features/content";
import { activitySeed } from "@/db/seed/activity-content";

/**
 * The normalizer is what lets one player serve both dialects, so the test that
 * matters is equivalence against the LIVE pilot-validated seed: for every
 * shipped scenario, the derived options must reproduce the legacy
 * computation's labels, order, correctness and feedback exactly.
 */
describe("classic equivalence against the shipped seed", () => {
  it("derives the five labels in canonical order for every scenario", () => {
    for (const scenario of activitySeed.scenarios) {
      const options = scenarioOptions(scenario);
      expect(options.map((option) => option.id)).toEqual([...SCENARIO_CATEGORIES]);
      expect(options.map((option) => option.label)).toEqual(
        SCENARIO_CATEGORIES.map((category) => CATEGORY_LABELS[category]),
      );
    }
  });

  it("reproduces the legacy correctness rule exactly", () => {
    for (const scenario of activitySeed.scenarios) {
      for (const option of scenarioOptions(scenario)) {
        const legacy =
          option.id === scenario.correctCategory ||
          (scenario.accepted ?? []).includes(option.id as never);
        expect(option.correct).toBe(legacy);
      }
    }
  });

  it("reproduces the legacy per-category feedback strings verbatim", () => {
    for (const scenario of activitySeed.scenarios) {
      for (const option of scenarioOptions(scenario)) {
        expect(option.feedback).toBe(scenario.feedback?.[option.id as never]);
      }
    }
  });

  it("keeps the primary correct answer as the declared category", () => {
    for (const scenario of activitySeed.scenarios) {
      expect(primaryCorrectOption(scenario).id).toBe(scenario.correctCategory);
    }
  });

  it("treats every shipped scenario as classic", () => {
    expect(activitySeed.scenarios.every(isClassicScenario)).toBe(true);
  });
});

describe("generic dialect", () => {
  const generic = {
    id: "AIA-5-ACT-001-S01",
    position: 1,
    title: "A drafted reply",
    body: "An assistant drafts a reply to a customer complaint.",
    difficulty: "applied" as const,
    clue: "someone is affected by the result",
    prompt: "What do you do with it?",
    options: [
      { id: "use", label: "Use as it stands", correct: false, feedback: "Someone depends on it." },
      { id: "review", label: "Review first", correct: true, feedback: "A person checks first." },
      {
        id: "refuse",
        label: "Do not use here",
        correct: false,
        feedback: "Drafting is fine here.",
      },
    ],
    remediationAnchor: "AIA-5-LESSON-005",
  };

  it("passes options through untouched", () => {
    expect(scenarioOptions(generic)).toBe(generic.options);
  });

  it("finds the primary correct option", () => {
    expect(primaryCorrectOption(generic).id).toBe("review");
  });

  it("is not classic", () => {
    expect(isClassicScenario(generic)).toBe(false);
  });
});

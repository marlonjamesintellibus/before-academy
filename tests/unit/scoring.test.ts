import { describe, expect, it } from "vitest";
import type { ScorableQuestion } from "@/features/assessment/scoring";
import { score } from "@/features/assessment/scoring";

const mc: ScorableQuestion = {
  id: "q-mc",
  category: "traditional_software",
  format: "multiple_choice",
  correctOptionIds: ["a"],
  explanationCorrect: "correct mc",
  explanationIncorrect: "incorrect mc",
};

const ms: ScorableQuestion = {
  id: "q-ms",
  category: "combined_systems",
  format: "multiple_select",
  correctOptionIds: ["a", "c"],
  explanationCorrect: "correct ms",
  explanationIncorrect: "incorrect ms",
};

const scenario: ScorableQuestion = {
  id: "q-sc",
  category: "automation",
  format: "scenario_decision",
  correctOptionIds: ["b"],
  explanationCorrect: "correct sc",
  explanationIncorrect: "incorrect sc",
};

describe("score", () => {
  it("exact match for multiple choice", () => {
    expect(score([mc], [{ questionId: "q-mc", optionIds: ["a"] }]).score).toBe(1);
    expect(score([mc], [{ questionId: "q-mc", optionIds: ["b"] }]).score).toBe(0);
  });

  it("exact match for scenario decision", () => {
    expect(score([scenario], [{ questionId: "q-sc", optionIds: ["b"] }]).score).toBe(1);
    expect(score([scenario], [{ questionId: "q-sc", optionIds: ["a"] }]).score).toBe(0);
  });

  it("multiple select is all-correct-no-extra", () => {
    expect(score([ms], [{ questionId: "q-ms", optionIds: ["a", "c"] }]).score).toBe(1);
    // Missing one correct
    expect(score([ms], [{ questionId: "q-ms", optionIds: ["a"] }]).score).toBe(0);
    // All correct plus an extra
    expect(score([ms], [{ questionId: "q-ms", optionIds: ["a", "c", "b"] }]).score).toBe(0);
    // Order does not matter
    expect(score([ms], [{ questionId: "q-ms", optionIds: ["c", "a"] }]).score).toBe(1);
  });

  it("unanswered questions score zero", () => {
    const outcome = score([mc, scenario], [{ questionId: "q-mc", optionIds: ["a"] }]);
    expect(outcome.score).toBe(1);
    expect(outcome.review.find((entry) => entry.questionId === "q-sc")?.correct).toBe(false);
  });

  it("categories_failed lists categories under 100%", () => {
    const outcome = score(
      [mc, ms, scenario],
      [
        { questionId: "q-mc", optionIds: ["a"] },
        { questionId: "q-ms", optionIds: ["a"] },
        { questionId: "q-sc", optionIds: ["b"] },
      ],
    );
    expect(outcome.categoriesFailed).toEqual(["combined_systems"]);
  });

  it("review carries the matching explanation", () => {
    const outcome = score([mc], [{ questionId: "q-mc", optionIds: ["b"] }]);
    expect(outcome.review[0]?.explanation).toBe("incorrect mc");
  });
});

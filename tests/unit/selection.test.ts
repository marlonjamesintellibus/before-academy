import { describe, expect, it } from "vitest";
import { drawQuestions } from "@/features/assessment/selection";
import { assessmentSeed } from "../../src/db/seed/assessment-content";

describe("drawQuestions against the real seed", () => {
  it("draws six questions covering six categories with the fixed pair", () => {
    const draw = drawQuestions(assessmentSeed.questions);
    expect(draw).toHaveLength(6);
    const ids = draw.map((question) => question.id);
    expect(ids).toContain("P1-QB-009");
    expect(ids).toContain("P1-QB-010");
    const categories = new Set(draw.map((question) => question.category));
    expect(categories.size).toBe(6);
    expect(categories.has("ambiguity")).toBe(true);
    expect(categories.has("misconceptions")).toBe(true);
    expect(categories.has("ai_characteristics")).toBe(true);
    expect(categories.has("combined_systems")).toBe(true);
    expect(categories.has("classification")).toBe(true);
  });

  it("never repeats the previous exact combination", () => {
    for (let run = 0; run < 50; run += 1) {
      const first = drawQuestions(assessmentSeed.questions).map((question) => question.id);
      const second = drawQuestions(assessmentSeed.questions, first).map((question) => question.id);
      expect([...second].sort().join(",")).not.toBe([...first].sort().join(","));
    }
  });

  it("prefers fresh questions in variable slots on retake", () => {
    const first = drawQuestions(assessmentSeed.questions, [], () => 0);
    const firstIds = first.map((question) => question.id);
    const retake = drawQuestions(assessmentSeed.questions, firstIds, () => 0);
    const variableRetake = retake.filter((question) => !question.fixedDraw);
    // Pools with 2 items must swap to the unused item when excluded.
    for (const question of variableRetake) {
      if (
        ["ai_characteristics", "combined_systems", "classification"].includes(question.category)
      ) {
        expect(firstIds).not.toContain(question.id);
      }
    }
  });
});

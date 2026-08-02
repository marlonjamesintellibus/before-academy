import { describe, expect, it } from "vitest";
import { score } from "@/features/assessment/scoring";
import { drawQuestions } from "@/features/assessment/selection";
import { assessmentSeed } from "../../src/db/seed/assessment-content";

/**
 * Scoring parity against the real seeded bank (M4 exit criterion): a full
 * draw answered with the seed's correct options scores 100%; answered with
 * a wrong option per question scores 0 with every category failed.
 */
function scorable() {
  return drawQuestions(assessmentSeed.questions).map((question) => ({
    id: question.id,
    category: question.category,
    format: question.format,
    correctOptionIds: question.options
      .map((option, optionIndex) => ({ option, id: `${question.id}-${optionIndex}` }))
      .filter((entry) => entry.option.correct)
      .map((entry) => entry.id),
    explanationCorrect: question.correctExplanation,
    explanationIncorrect: question.incorrectExplanation,
    allOptionIds: question.options.map((_, optionIndex) => `${question.id}-${optionIndex}`),
  }));
}

describe("scoring parity with the seeded bank", () => {
  it("all-correct answers pass with no failed categories", () => {
    const questions = scorable();
    const outcome = score(
      questions,
      questions.map((question) => ({
        questionId: question.id,
        optionIds: question.correctOptionIds,
      })),
    );
    expect(outcome.score).toBe(6);
    expect(outcome.categoriesFailed).toEqual([]);
  });

  it("all-wrong answers fail every category with the right breakdown", () => {
    const questions = scorable();
    const outcome = score(
      questions,
      questions.map((question) => ({
        questionId: question.id,
        optionIds: question.allOptionIds
          .filter((id) => !question.correctOptionIds.includes(id))
          .slice(0, 1),
      })),
    );
    expect(outcome.score).toBe(0);
    expect(outcome.categoriesFailed).toHaveLength(6);
    for (const entry of outcome.review) expect(entry.correct).toBe(false);
  });
});

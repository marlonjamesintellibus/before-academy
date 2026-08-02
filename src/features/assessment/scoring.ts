import type { AssessmentCategory, AttemptAnswer, QuestionReview } from "./types";

/**
 * Pure server-side scoring (docs/engineering/assessment-engine.md, ADR-029):
 * exact match (multiple choice, scenario decision), all-correct-no-extra
 * (multiple select). No partial credit in Phase 1 (flagged for validation).
 * categories_failed = categories under 100% in the attempt.
 */
export interface ScorableQuestion {
  id: string;
  category: AssessmentCategory;
  format: "multiple_choice" | "multiple_select" | "scenario_decision";
  correctOptionIds: string[];
  explanationCorrect: string;
  explanationIncorrect: string;
}

export interface ScoreOutcome {
  score: number;
  total: number;
  categoriesFailed: AssessmentCategory[];
  review: QuestionReview[];
}

export function score(questions: ScorableQuestion[], answers: AttemptAnswer[]): ScoreOutcome {
  const answerMap = new Map(answers.map((answer) => [answer.questionId, answer.optionIds]));
  const categoryHits = new Map<AssessmentCategory, { correct: number; total: number }>();
  const review: QuestionReview[] = [];
  let correctCount = 0;

  for (const question of questions) {
    const chosen = new Set(answerMap.get(question.id) ?? []);
    const wanted = new Set(question.correctOptionIds);
    const correct =
      chosen.size === wanted.size && [...wanted].every((optionId) => chosen.has(optionId));

    if (correct) correctCount += 1;
    const tally = categoryHits.get(question.category) ?? { correct: 0, total: 0 };
    tally.total += 1;
    if (correct) tally.correct += 1;
    categoryHits.set(question.category, tally);

    review.push({
      questionId: question.id,
      category: question.category,
      correct,
      correctOptionIds: question.correctOptionIds,
      explanation: correct ? question.explanationCorrect : question.explanationIncorrect,
    });
  }

  const categoriesFailed = [...categoryHits.entries()]
    .filter(([, tally]) => tally.correct < tally.total)
    .map(([category]) => category);

  return { score: correctCount, total: questions.length, categoriesFailed, review };
}

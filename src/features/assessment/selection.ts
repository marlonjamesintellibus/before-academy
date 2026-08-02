import type { AssessmentCategory, AssessmentQuestionSeed } from "./types";

/**
 * Blueprint draw (docs/content/assessments.md, assessment.md draw rule):
 * the fixed ambiguity + misconceptions items, one AI-characteristics, one
 * combined-systems, one classification, and one of traditional-software or
 * automation. Six questions, six categories. Excludes the actor's previous
 * exact combination (ADR-030 retake rule). Pure and seedable for tests.
 */
export function drawQuestions<T extends AssessmentQuestionSeed>(
  bank: T[],
  previousCombination: string[] = [],
  random: () => number = Math.random,
): T[] {
  const previous = new Set(previousCombination);

  function pick<T>(items: T[]): T {
    const index = Math.floor(random() * items.length);
    return items[Math.min(index, items.length - 1)] as T;
  }

  function fromPool(categories: AssessmentCategory[]): T {
    const pool = bank.filter(
      (question) => categories.includes(question.category) && !question.fixedDraw,
    );
    if (pool.length === 0) throw new Error(`empty question pool for ${categories.join("/")}`);
    // Prefer questions outside the previous combination for retake variety.
    const fresh = pool.filter((question) => !previous.has(question.id));
    return pick(fresh.length > 0 ? fresh : pool);
  }

  const attempt = () => {
    const fixed = bank.filter((question) => question.fixedDraw);
    const draw = [
      ...fixed,
      fromPool(["ai_characteristics"]),
      fromPool(["combined_systems"]),
      fromPool(["classification"]),
      fromPool(["traditional_software", "automation"]),
    ];
    return draw;
  };

  // Retakes must not repeat the previous exact combination; with fixed items the
  // variable slots guarantee an alternative exists, so a few redraws suffice.
  for (let tries = 0; tries < 10; tries += 1) {
    const draw = attempt();
    const ids = draw.map((question) => question.id).sort();
    if (previous.size === 0 || ids.join(",") !== [...previous].sort().join(",")) {
      return draw;
    }
  }
  return attempt();
}

/** Order-stable shuffle for option rotation (Fisher-Yates over a copy). */
export function shuffle<T>(items: T[], random: () => number = Math.random): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    const a = copy[i] as T;
    copy[i] = copy[j] as T;
    copy[j] = a;
  }
  return copy;
}

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

/**
 * Pathway draw: the Level 1 competency check across every section.
 *
 * Coverage first, then fill. Taking one item from each section before filling
 * the rest is what makes passing mean the pathway rather than whichever
 * sections happened to be sampled. Items seen in the previous attempt are
 * deprioritised so a retake changes the surface, and coverage is never
 * sacrificed to avoid a repeat: a repeated item is a smaller problem than an
 * unexamined section.
 */
export function drawPathwayQuestions<T extends { id: string; sectionSlug?: string }>(
  bank: T[],
  size: number,
  previousCombination: string[] = [],
  random: () => number = Math.random,
): T[] {
  const previous = new Set(previousCombination);
  const bySection = new Map<string, T[]>();
  for (const item of bank) {
    const key = item.sectionSlug ?? "unsectioned";
    bySection.set(key, [...(bySection.get(key) ?? []), item]);
  }

  function take(items: T[]): T | undefined {
    if (items.length === 0) return undefined;
    const fresh = items.filter((item) => !previous.has(item.id));
    const pool = fresh.length > 0 ? fresh : items;
    return pool[Math.floor(random() * pool.length)];
  }

  const picked: T[] = [];
  const pickedIds = new Set<string>();

  for (const items of bySection.values()) {
    const choice = take(items);
    if (choice && !pickedIds.has(choice.id)) {
      picked.push(choice);
      pickedIds.add(choice.id);
    }
  }

  const remaining = bank.filter((item) => !pickedIds.has(item.id));
  while (picked.length < size && remaining.length > 0) {
    const choice = take(remaining);
    if (!choice) break;
    picked.push(choice);
    pickedIds.add(choice.id);
    remaining.splice(remaining.indexOf(choice), 1);
  }

  return picked.slice(0, Math.max(size, bySection.size));
}

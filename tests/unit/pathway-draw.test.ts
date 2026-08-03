import { describe, expect, it } from "vitest";
import { drawPathwayQuestions } from "@/features/assessment/selection";

/**
 * The pathway draw exists so that passing means the pathway rather than
 * whichever sections happened to be sampled, so coverage is what these tests
 * defend.
 */
const bank = Array.from({ length: 7 }, (_, section) =>
  Array.from({ length: 8 }, (_, item) => ({
    id: `s${section}-q${item}`,
    sectionSlug: `section-${section}`,
  })),
).flat();

const sectionsOf = (picked: { sectionSlug?: string }[]) =>
  new Set(picked.map((item) => item.sectionSlug));

describe("pathway draw", () => {
  it("includes at least one question from every section", () => {
    const picked = drawPathwayQuestions(bank, 12);
    expect(sectionsOf(picked).size).toBe(7);
  });

  it("draws the requested number when the bank allows it", () => {
    expect(drawPathwayQuestions(bank, 12)).toHaveLength(12);
  });

  it("never returns duplicates", () => {
    const picked = drawPathwayQuestions(bank, 12);
    expect(new Set(picked.map((item) => item.id)).size).toBe(picked.length);
  });

  it("keeps coverage even when the size is smaller than the section count", () => {
    // Coverage wins: an unexamined section is worse than a longer attempt.
    const picked = drawPathwayQuestions(bank, 3);
    expect(sectionsOf(picked).size).toBe(7);
  });

  it("prefers questions the learner has not seen before", () => {
    const seen = bank.filter((item) => item.id.endsWith("q0")).map((item) => item.id);
    const picked = drawPathwayQuestions(bank, 12, seen);
    const repeats = picked.filter((item) => seen.includes(item.id));
    expect(repeats.length).toBe(0);
  });

  it("still covers a section whose every question was seen", () => {
    const allOfSectionThree = bank
      .filter((item) => item.sectionSlug === "section-3")
      .map((item) => item.id);
    const picked = drawPathwayQuestions(bank, 12, allOfSectionThree);
    expect(sectionsOf(picked).has("section-3")).toBe(true);
  });
});

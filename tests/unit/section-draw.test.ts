import { describe, expect, it } from "vitest";
import { drawSectionQuestions } from "@/features/assessment/selection";
import { aia1AssessmentSeed } from "@/db/seed/sections/aia-1-assessment";
import { aia2AssessmentSeed, aia4AssessmentSeed } from "@/db/seed/sections/banks-2-4";
import {
  aia5AssessmentSeed,
  aia6AssessmentSeed,
  aia7AssessmentSeed,
} from "@/db/seed/sections/banks-5-6-7";
import { uie1AssessmentSeed } from "@/db/seed/sections/uie-1-assessment";

/**
 * The regression this guards: the classic draw hardcoded the first section's
 * category slots, so starting an assessment on any other section threw
 * "empty question pool". The generic draw must work against every REAL bank,
 * not a convenient fixture.
 */
const banks = [
  aia1AssessmentSeed,
  aia2AssessmentSeed,
  aia4AssessmentSeed,
  aia5AssessmentSeed,
  aia6AssessmentSeed,
  aia7AssessmentSeed,
  uie1AssessmentSeed,
];

describe("generic section draw against every shipped bank", () => {
  for (const bank of banks) {
    it(`draws six from ${bank.id} with fixed items and category coverage`, () => {
      const drawn = drawSectionQuestions(bank.questions, 6);
      expect(drawn).toHaveLength(6);
      // No duplicates.
      expect(new Set(drawn.map((question) => question.id)).size).toBe(6);
      // Every fixed-draw item is present.
      for (const fixed of bank.questions.filter((question) => question.fixedDraw)) {
        expect(drawn.map((question) => question.id)).toContain(fixed.id);
      }
      // Coverage: at least as many distinct categories as possible for 6 slots.
      const bankCategories = new Set(bank.questions.map((question) => question.category)).size;
      const drawnCategories = new Set(drawn.map((question) => question.category)).size;
      expect(drawnCategories).toBeGreaterThanOrEqual(Math.min(bankCategories, 4));
    });

    it(`never repeats the exact previous combination from ${bank.id}`, () => {
      const first = drawSectionQuestions(bank.questions, 6, [], () => 0.42);
      const previous = first.map((question) => question.id);
      for (let round = 0; round < 5; round += 1) {
        const retake = drawSectionQuestions(bank.questions, 6, previous);
        expect(
          retake
            .map((question) => question.id)
            .sort()
            .join(","),
        ).not.toBe([...previous].sort().join(","));
      }
    });
  }
});

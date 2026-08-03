import { describe, expect, it } from "vitest";
import { assessmentStorageKeys } from "@/features/assessment/storage-keys";

/**
 * The bug this module fixes: all eight assessments shared one set of device
 * keys, so any pass marked the first section complete. These tests pin the
 * three properties that matter: legacy keys survive, scopes never collide,
 * and the pathway scope produces storage-safe names.
 */
describe("assessment storage keys", () => {
  it("keeps the first section's original keys exactly", () => {
    expect(assessmentStorageKeys("ai-automation-software")).toEqual({
      outcome: "ba.v1.assessment.ai-automation-software",
      attemptCount: "ba.v1.attempt_count",
      lastCombination: "ba.v1.last_combination",
      mirror: "ba.v1.attempt_mirror",
    });
  });

  it("scopes every other section's keys by slug", () => {
    const keys = assessmentStorageKeys("what-is-artificial-intelligence");
    expect(keys.outcome).toBe("ba.v1.assessment.what-is-artificial-intelligence");
    expect(keys.attemptCount).toBe("ba.v1.attempt_count.what-is-artificial-intelligence");
    expect(keys.lastCombination).toBe("ba.v1.last_combination.what-is-artificial-intelligence");
    expect(keys.mirror).toBe("ba.v1.attempt_mirror.what-is-artificial-intelligence");
  });

  it("gives the pathway scope its own storage-safe keys", () => {
    const keys = assessmentStorageKeys("pathway:ai-awareness");
    expect(keys.outcome).toBe("ba.v1.assessment.pathway-ai-awareness");
    expect(keys.outcome).not.toContain(":");
  });

  it("never collides across the scopes that exist", () => {
    const scopes = [
      "ai-automation-software",
      "what-is-artificial-intelligence",
      "ai-in-everyday-life",
      "what-ai-can-do",
      "what-ai-cannot-reliably-do",
      "myths-and-misconceptions",
      "where-to-go-next",
      "pathway:ai-awareness",
    ];
    const all = scopes.flatMap((scope) => Object.values(assessmentStorageKeys(scope)));
    expect(new Set(all).size).toBe(all.length);
  });
});

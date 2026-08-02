import { describe, expect, it } from "vitest";
import { buildSnapshot, resumeTarget, sectionStatus } from "@/features/progress/snapshot";

const EMPTY = { lesson: null, activity: null, check: null, assessment: null };

function lesson(completed: number, active = completed) {
  return { active, completed: Array.from({ length: completed }, (_, index) => index) };
}

describe("progress snapshot", () => {
  it("fresh visitor: not started, no resume target", () => {
    const snapshot = buildSnapshot(EMPTY);
    expect(sectionStatus(snapshot)).toBe("not_started");
    expect(resumeTarget(snapshot)).toBeNull();
  });

  it("mid-lesson resumes at the lesson with the active stage", () => {
    const snapshot = buildSnapshot({ ...EMPTY, lesson: lesson(2) });
    expect(sectionStatus(snapshot)).toBe("in_progress");
    expect(resumeTarget(snapshot)).toEqual({
      href: "/learn/ai-awareness/ai-automation-software",
      label: "the lesson (stage 3 of 5)",
    });
  });

  it("finished lesson resumes at the activity", () => {
    const snapshot = buildSnapshot({ ...EMPTY, lesson: lesson(5) });
    expect(resumeTarget(snapshot)?.href).toContain("/activity");
  });

  it("finished activity resumes at the check", () => {
    const snapshot = buildSnapshot({
      ...EMPTY,
      lesson: lesson(5),
      activity: { answers: { a: 1, b: 2 }, completed: true },
    });
    expect(resumeTarget(snapshot)?.href).toContain("/check");
  });

  it("finished check resumes at the assessment", () => {
    const snapshot = buildSnapshot({
      ...EMPTY,
      lesson: lesson(5),
      activity: { answers: {}, completed: true },
      check: { version: 1, answers: { q1: {} }, completed: true },
    });
    expect(resumeTarget(snapshot)?.href).toContain("/assessment");
  });

  it("a passed assessment completes the section and points at what's next", () => {
    const snapshot = buildSnapshot({
      ...EMPTY,
      assessment: {
        version: 1,
        attempts: 2,
        bestScore: 5,
        total: 6,
        passed: true,
        lastAttemptAt: "2026-08-02T12:00:00Z",
      },
    });
    expect(sectionStatus(snapshot)).toBe("complete");
    expect(resumeTarget(snapshot)).toEqual({ href: "/learn#next", label: "See what's next" });
  });

  it("payload privacy: snapshots never carry PII-shaped fields", () => {
    const snapshot = buildSnapshot({
      ...EMPTY,
      lesson: lesson(1),
      assessment: {
        version: 1,
        attempts: 1,
        bestScore: 4,
        total: 6,
        passed: false,
        lastAttemptAt: "2026-08-02T12:00:00Z",
      },
    });
    const serialized = JSON.stringify(snapshot).toLowerCase();
    for (const banned of ["email", "name", "answertext", "freetext", "address", "phone"]) {
      expect(serialized).not.toContain(banned);
    }
  });
});

describe("review schedule", () => {
  it("computes due and rusty states from anchors", async () => {
    const { reviewDue } = await import("@/features/progress/review-schedule");
    const now = Date.parse("2026-08-10T12:00:00Z");
    // No anchors: never due
    expect(reviewDue([null, undefined], now).due).toBe(false);
    // Yesterday: due, not rusty
    const yesterday = reviewDue(["2026-08-09T10:00:00Z"], now);
    expect(yesterday).toEqual({ due: true, dayOffset: 1, rusty: false });
    // Two hours ago: not due yet
    expect(reviewDue(["2026-08-10T10:00:00Z"], now).due).toBe(false);
    // Eight days ago: rusty
    expect(reviewDue(["2026-08-02T10:00:00Z"], now).rusty).toBe(true);
  });
});

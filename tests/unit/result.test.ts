import { describe, expect, it } from "vitest";
import { err, ok } from "@/lib/result";

describe("Result", () => {
  it("wraps success data", () => {
    const result = ok({ value: 42 });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data.value).toBe(42);
  });

  it("builds errors with learner-safe defaults", () => {
    const result = err("VALIDATION", "Please check the highlighted fields.", {
      fields: { email: "Enter a valid email address." },
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.code).toBe("VALIDATION");
      expect(result.error.retryable).toBe(false);
      expect(result.error.fields).toEqual({ email: "Enter a valid email address." });
    }
  });

  it("marks RATE_LIMITED retryable by default", () => {
    const result = err("RATE_LIMITED", "Too many requests.");
    if (!result.ok) expect(result.error.retryable).toBe(true);
  });
});

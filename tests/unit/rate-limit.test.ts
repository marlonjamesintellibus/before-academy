import { beforeEach, describe, expect, it } from "vitest";
import { checkRateLimit, RATE_LIMITS, resetRateLimits } from "@/lib/rate-limit";

describe("checkRateLimit", () => {
  beforeEach(() => resetRateLimits());

  it("allows up to the surface limit inside one window", () => {
    const start = 1_000_000;
    for (let i = 0; i < RATE_LIMITS.feedback.limit; i += 1) {
      expect(checkRateLimit("feedback", "g:abc", start + i).allowed).toBe(true);
    }
    expect(checkRateLimit("feedback", "g:abc", start + 10).allowed).toBe(false);
  });

  it("resets after the window elapses", () => {
    const start = 1_000_000;
    for (let i = 0; i < RATE_LIMITS.feedback.limit; i += 1) {
      checkRateLimit("feedback", "g:abc", start);
    }
    expect(checkRateLimit("feedback", "g:abc", start).allowed).toBe(false);
    expect(checkRateLimit("feedback", "g:abc", start + RATE_LIMITS.feedback.windowMs).allowed).toBe(
      true,
    );
  });

  it("scopes windows per key and per surface", () => {
    const start = 1_000_000;
    for (let i = 0; i < RATE_LIMITS.feedback.limit; i += 1) {
      checkRateLimit("feedback", "g:abc", start);
    }
    expect(checkRateLimit("feedback", "g:other", start).allowed).toBe(true);
    expect(checkRateLimit("attempt", "g:abc", start).allowed).toBe(true);
  });

  it("matches ADR-026 configured surfaces", () => {
    expect(RATE_LIMITS.auth).toEqual({ limit: 10, windowMs: 60_000 });
    expect(RATE_LIMITS.feedback).toEqual({ limit: 5, windowMs: 60_000 });
    expect(RATE_LIMITS.attempt).toEqual({ limit: 10, windowMs: 60_000 });
  });
});

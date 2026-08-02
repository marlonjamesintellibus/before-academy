import { beforeAll, describe, expect, it } from "vitest";
import { issueGuestToken, verifyGuestToken } from "@/lib/guest-token";

const TTL = 2 * 60 * 60 * 1000;

describe("guest attempt token", () => {
  beforeAll(() => {
    process.env.GUEST_TOKEN_SECRET = "unit-test-secret-not-used-anywhere";
  });

  it("round-trips claims", () => {
    const token = issueGuestToken({
      questionIds: ["P1-QB-001", "P1-QB-009"],
      issuedAt: Date.now(),
      attemptNumber: 2,
    });
    const claims = verifyGuestToken(token, TTL);
    expect(claims?.questionIds).toEqual(["P1-QB-001", "P1-QB-009"]);
    expect(claims?.attemptNumber).toBe(2);
  });

  it("rejects expired tokens", () => {
    const issuedAt = Date.now() - TTL - 1000;
    const token = issueGuestToken({ questionIds: ["a"], issuedAt, attemptNumber: 1 });
    expect(verifyGuestToken(token, TTL)).toBeNull();
  });

  it("rejects tampered payloads", () => {
    const token = issueGuestToken({
      questionIds: ["P1-QB-001"],
      issuedAt: Date.now(),
      attemptNumber: 1,
    });
    const [, signature] = token.split(".");
    const forged = `${Buffer.from(
      JSON.stringify({ questionIds: ["P1-QB-002"], issuedAt: Date.now(), attemptNumber: 1 }),
    ).toString("base64url")}.${signature}`;
    expect(verifyGuestToken(forged, TTL)).toBeNull();
  });

  it("rejects malformed tokens", () => {
    expect(verifyGuestToken("garbage", TTL)).toBeNull();
    expect(verifyGuestToken("a.b", TTL)).toBeNull();
  });
});

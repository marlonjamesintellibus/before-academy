import { beforeAll, describe, expect, it } from "vitest";
import { issueGuestToken, verifyGuestToken } from "@/lib/guest-token";

const TTL = 2 * 60 * 60 * 1000;

describe("guest attempt token", () => {
  beforeAll(() => {
    process.env.GUEST_TOKEN_SECRET = "unit-test-secret-not-used-anywhere";
  });

  it("round-trips claims", () => {
    const token = issueGuestToken({
      sectionSlug: "ai-automation-software",
      questionIds: ["P1-QB-001", "P1-QB-009"],
      issuedAt: Date.now(),
      attemptNumber: 2,
      anonymousId: "anon-1234",
    });
    const claims = verifyGuestToken(token, TTL);
    expect(claims?.questionIds).toEqual(["P1-QB-001", "P1-QB-009"]);
    expect(claims?.attemptNumber).toBe(2);
    expect(claims?.anonymousId).toBe("anon-1234");
  });

  it("rejects expired tokens", () => {
    const issuedAt = Date.now() - TTL - 1000;
    const token = issueGuestToken({
      sectionSlug: "ai-automation-software",
      questionIds: ["a"],
      issuedAt,
      attemptNumber: 1,
      anonymousId: "anon-1234",
    });
    expect(verifyGuestToken(token, TTL)).toBeNull();
  });

  it("rejects tampered payloads", () => {
    const token = issueGuestToken({
      sectionSlug: "ai-automation-software",
      questionIds: ["P1-QB-001"],
      issuedAt: Date.now(),
      attemptNumber: 1,
      anonymousId: "anon-1234",
    });
    const [, signature] = token.split(".");
    const forged = `${Buffer.from(
      JSON.stringify({
        sectionSlug: "ai-automation-software",
        questionIds: ["P1-QB-002"],
        issuedAt: Date.now(),
        attemptNumber: 1,
        anonymousId: "anon-1234",
      }),
    ).toString("base64url")}.${signature}`;
    expect(verifyGuestToken(forged, TTL)).toBeNull();
  });

  it("rejects malformed tokens", () => {
    expect(verifyGuestToken("garbage", TTL)).toBeNull();
    expect(verifyGuestToken("a.b", TTL)).toBeNull();
  });
});

describe("section binding", () => {
  /**
   * The section is part of the signed claims so a token cannot be replayed
   * against a different bank. Without this, a token would authorize any
   * section whose question ids happened to line up.
   */
  it("carries the issuing section through a round trip", () => {
    const token = issueGuestToken({
      sectionSlug: "what-ai-can-do",
      questionIds: ["q1"],
      issuedAt: Date.now(),
      attemptNumber: 1,
      anonymousId: "anon-1234",
    });
    expect(verifyGuestToken(token, 60_000)?.sectionSlug).toBe("what-ai-can-do");
  });

  it("rejects a token whose section claim was tampered with", () => {
    const token = issueGuestToken({
      sectionSlug: "what-ai-can-do",
      questionIds: ["q1"],
      issuedAt: Date.now(),
      attemptNumber: 1,
      anonymousId: "anon-1234",
    });
    const [payload = "", signature = ""] = token.split(".");
    const claims = JSON.parse(Buffer.from(payload, "base64url").toString());
    claims.sectionSlug = "what-ai-cannot-reliably-do";
    const forged = `${Buffer.from(JSON.stringify(claims)).toString("base64url")}.${signature}`;
    expect(verifyGuestToken(forged, 60_000)).toBeNull();
  });

  it("rejects a token with no section claim at all", () => {
    const payload = Buffer.from(
      JSON.stringify({
        questionIds: ["q1"],
        issuedAt: Date.now(),
        attemptNumber: 1,
        anonymousId: "anon-1234",
      }),
    ).toString("base64url");
    expect(verifyGuestToken(`${payload}.notasignature`, 60_000)).toBeNull();
  });
});

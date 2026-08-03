import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Signed guest attempt token (docs/engineering/assessment-engine.md):
 * question_ids + issued_at + attempt number, HMAC-signed with
 * GUEST_TOKEN_SECRET, 2h TTL. Keeps the server guest-stateless (ADR-025)
 * while scoring stays server-side.
 */
export interface GuestAttemptClaims {
  /**
   * The section the attempt belongs to. Part of the signed claims so a token
   * issued for one section cannot be replayed against another: without it, a
   * token would authorize any bank whose question ids happened to match.
   */
  sectionSlug: string;
  questionIds: string[];
  issuedAt: number;
  attemptNumber: number;
  /** Binds the token to its issuing guest; verified on submit. */
  anonymousId: string;
}

function secret(): string {
  const value = process.env.GUEST_TOKEN_SECRET;
  if (!value) throw new Error("GUEST_TOKEN_SECRET is not set - see .env.example");
  return value;
}

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function issueGuestToken(claims: GuestAttemptClaims): string {
  const payload = Buffer.from(JSON.stringify(claims)).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function verifyGuestToken(
  token: string,
  ttlMs: number,
  now: number = Date.now(),
): GuestAttemptClaims | null {
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;
  const expected = sign(payload);
  const given = Buffer.from(signature);
  const wanted = Buffer.from(expected);
  if (given.length !== wanted.length || !timingSafeEqual(given, wanted)) return null;
  try {
    const claims = JSON.parse(Buffer.from(payload, "base64url").toString()) as GuestAttemptClaims;
    if (!Array.isArray(claims.questionIds) || typeof claims.issuedAt !== "number") return null;
    if (typeof claims.sectionSlug !== "string" || claims.sectionSlug.length === 0) return null;
    if (typeof claims.attemptNumber !== "number" || typeof claims.anonymousId !== "string")
      return null;
    if (now - claims.issuedAt > ttlMs) return null;
    return claims;
  } catch {
    return null;
  }
}

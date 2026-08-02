import { beforeEach, describe, expect, it } from "vitest";
import { z } from "zod";
import type { Actor } from "@/lib/actor";
import { resetRateLimits } from "@/lib/rate-limit";
import { ok } from "@/lib/result";
import { withAction } from "@/lib/with-action";

const guest: Actor = { kind: "guest", anonymousId: "anon-1" };
const registered: Actor = { kind: "registered", userId: "user-1" };
const context = (actor: Actor) => ({ actor, requestId: "req-1" });

describe("withAction", () => {
  beforeEach(() => resetRateLimits());

  const echo = withAction(
    { name: "echo", schema: z.object({ message: z.string().min(1) }) },
    async (input) => ok(input.message),
  );

  it("returns VALIDATION with a field map on bad input", async () => {
    const result = await echo({ message: "" }, context(guest));
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.code).toBe("VALIDATION");
      expect(result.error.fields).toHaveProperty("message");
    }
  });

  it("runs the handler on valid input", async () => {
    const result = await echo({ message: "hello" }, context(guest));
    expect(result).toEqual({ ok: true, data: "hello" });
  });

  it("returns AUTH_REQUIRED for guests on persistence actions", async () => {
    const save = withAction(
      { name: "save", schema: z.object({}), requireRegistered: true },
      async () => ok("saved"),
    );
    const guestResult = await save({}, context(guest));
    expect(!guestResult.ok && guestResult.error.code).toBe("AUTH_REQUIRED");
    const registeredResult = await save({}, context(registered));
    expect(registeredResult.ok).toBe(true);
  });

  it("rate-limits per configured surface", async () => {
    const submit = withAction(
      { name: "submitFeedback", schema: z.object({}), rateLimit: "feedback" },
      async () => ok("ack"),
    );
    for (let i = 0; i < 5; i += 1) {
      expect((await submit({}, context(guest))).ok).toBe(true);
    }
    const limited = await submit({}, context(guest));
    expect(!limited.ok && limited.error.code).toBe("RATE_LIMITED");
  });

  it("classifies thrown errors as INTERNAL and never rethrows", async () => {
    const explode = withAction({ name: "explode", schema: z.object({}) }, async () => {
      throw new Error("secret internals");
    });
    const result = await explode({}, context(guest));
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error.code).toBe("INTERNAL");
      expect(result.error.message).not.toContain("secret");
      expect(result.error.retryable).toBe(true);
    }
  });
});

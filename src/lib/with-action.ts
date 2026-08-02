import { z } from "zod";
import type { Actor } from "@/lib/actor";
import { actorKey } from "@/lib/actor";
import { captureServer } from "@/lib/analytics-server";
import { logger } from "@/lib/logger";
import type { RateLimitSurface } from "@/lib/rate-limit";
import { checkRateLimit } from "@/lib/rate-limit";
import type { Result } from "@/lib/result";
import { err } from "@/lib/result";

/**
 * withAction() shell (docs/engineering/backend.md, error-handling.md, ADR-024).
 * Wraps every Server Action: validate → resolve actor → authorize → rate-limit →
 * run → classify errors. Actions never throw to the client.
 *
 * M0 note: actor resolution against BetterAuth sessions is stubbed until M6 wires
 * auth; handlers receive the actor the caller resolved. The ownership rule
 * (learner_id = session.userId, never client input) is enforced here from M1 on.
 */
export interface ActionContext {
  actor: Actor;
  requestId: string;
  /** Caller IP (x-forwarded-for head) - rate limits key on actor AND ip so a
   * rotated anonymousId cannot bypass the limiter (security review). */
  ip?: string;
}

export interface ActionOptions<Schema extends z.ZodType> {
  name: string;
  schema: Schema;
  /** Persistence actions require a registered actor (AUTH_REQUIRED otherwise). */
  requireRegistered?: boolean;
  rateLimit?: RateLimitSurface;
}

const GENERIC_ERROR_MESSAGE = "Something went wrong on our side. Please try again.";

export function withAction<Schema extends z.ZodType, T>(
  options: ActionOptions<Schema>,
  handler: (input: z.output<Schema>, context: ActionContext) => Promise<Result<T>>,
): (rawInput: unknown, context: ActionContext) => Promise<Result<T>> {
  return async (rawInput, context) => {
    const startedAt = Date.now();
    const log = logger.child({
      action: options.name,
      actor_kind: context.actor.kind,
      request_id: context.requestId,
    });

    try {
      const parsed = options.schema.safeParse(rawInput);
      if (!parsed.success) {
        const fields: Record<string, string> = {};
        for (const issue of parsed.error.issues) {
          const path = issue.path.join(".") || "_root";
          fields[path] ??= issue.message;
        }
        return err("VALIDATION", "Please check the highlighted fields.", { fields });
      }

      if (options.requireRegistered && context.actor.kind !== "registered") {
        return err("AUTH_REQUIRED", "Create a free account to save this.");
      }

      if (options.rateLimit) {
        const decision = checkRateLimit(
          options.rateLimit,
          `${context.ip ?? "unknown"}|${actorKey(context.actor)}`,
        );
        if (!decision.allowed) {
          return err("RATE_LIMITED", "Too many requests - give it a moment and try again.", {
            retryable: true,
          });
        }
      }

      const result = await handler(parsed.data, context);
      log.info({ ok: result.ok, duration_ms: Date.now() - startedAt }, "action.completed");
      return result;
    } catch (cause) {
      log.error({ err: cause, duration_ms: Date.now() - startedAt }, "action.unhandled");
      captureServer(context.actor, "error_event", {
        code: "INTERNAL",
        route: options.name,
        severity: "error",
      });
      return err("INTERNAL", GENERIC_ERROR_MESSAGE, { retryable: true });
    }
  };
}

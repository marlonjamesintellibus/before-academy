import pino from "pino";

/**
 * Structured JSON logs → Railway (docs/engineering/error-handling.md).
 * Fields: level, code, action, actor kind, duration_ms, request_id.
 * Never log payload bodies, tokens, answers, or raw actor ids at info level.
 */
export const logger = pino({
  level: process.env.LOG_LEVEL ?? "info",
  base: { app: "before-academy", env: process.env.APP_ENV ?? "development" },
});

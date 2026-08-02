/**
 * Closed error taxonomy and Result type (docs/engineering/error-handling.md).
 * Expected domain outcomes (assessment not passed, storage unavailable) are NOT
 * errors — they belong in success payloads. Additions to ErrorCode are reviewed changes.
 */
export const ERROR_CODES = [
  "VALIDATION",
  "AUTH_REQUIRED",
  "FORBIDDEN",
  "NOT_FOUND",
  "CONFLICT",
  "RATE_LIMITED",
  "INTERNAL",
] as const;

export type ErrorCode = (typeof ERROR_CODES)[number];

export interface ResultError {
  code: ErrorCode;
  /** Learner-safe copy (docs/product/ux-copy.md); internals go to logs only. */
  message: string;
  /** VALIDATION only: field name → inline message. */
  fields?: Record<string, string>;
  retryable: boolean;
}

export type Result<T> = { ok: true; data: T } | { ok: false; error: ResultError };

export function ok<T>(data: T): Result<T> {
  return { ok: true, data };
}

export function err<T = never>(
  code: ErrorCode,
  message: string,
  options: { fields?: Record<string, string>; retryable?: boolean } = {},
): Result<T> {
  const error: ResultError = {
    code,
    message,
    retryable: options.retryable ?? code === "RATE_LIMITED",
  };
  if (options.fields) error.fields = options.fields;
  return { ok: false, error };
}

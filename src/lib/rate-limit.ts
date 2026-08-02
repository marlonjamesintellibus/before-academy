/**
 * Fixed-window in-memory rate limiter (ADR-026).
 * Phase 1 runs a single Railway instance (ADR-017), so in-process state is sufficient;
 * revisit if the deployable ever scales horizontally.
 *
 * Configured surfaces (ADR-026): auth 10/min/IP · feedback 5/min/actor · attempts 10/min/actor.
 */
interface Window {
  count: number;
  resetAt: number;
}

const windows = new Map<string, Window>();

/** Sweep expired windows when the map grows; prevents unbounded memory (review finding). */
const SWEEP_THRESHOLD = 10_000;

function sweep(now: number): void {
  if (windows.size < SWEEP_THRESHOLD) return;
  for (const [key, window] of windows) {
    if (now >= window.resetAt) windows.delete(key);
  }
}

export interface RateLimitConfig {
  /** Max requests per window. */
  limit: number;
  /** Window length in milliseconds. */
  windowMs: number;
}

export const RATE_LIMITS = {
  auth: { limit: 10, windowMs: 60_000 },
  feedback: { limit: 5, windowMs: 60_000 },
  attempt: { limit: 10, windowMs: 60_000 },
} as const satisfies Record<string, RateLimitConfig>;

export type RateLimitSurface = keyof typeof RATE_LIMITS;

export interface RateLimitDecision {
  allowed: boolean;
  remaining: number;
  resetAt: number;
}

export function checkRateLimit(
  surface: RateLimitSurface,
  key: string,
  now: number = Date.now(),
): RateLimitDecision {
  const config = RATE_LIMITS[surface];
  sweep(now);
  const bucketKey = `${surface}:${key}`;
  const window = windows.get(bucketKey);

  if (!window || now >= window.resetAt) {
    windows.set(bucketKey, { count: 1, resetAt: now + config.windowMs });
    return { allowed: true, remaining: config.limit - 1, resetAt: now + config.windowMs };
  }

  if (window.count >= config.limit) {
    return { allowed: false, remaining: 0, resetAt: window.resetAt };
  }

  window.count += 1;
  return { allowed: true, remaining: config.limit - window.count, resetAt: window.resetAt };
}

/** Test-only: clear all windows. */
export function resetRateLimits(): void {
  windows.clear();
}

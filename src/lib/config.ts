/**
 * Assessment configuration (ADR-030): threshold and attempt size are
 * configuration, not code. Values are env-overridable so pilot evidence
 * changes data, not deploys. 80% and 6 are the provisional defaults.
 */
function envNumber(name: string, fallback: number): number {
  const raw = process.env[name];
  const parsed = raw ? Number(raw) : NaN;
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function getAssessmentConfig() {
  return {
    /** Provisional 80% (ADR-030); reviewed from pilot question analytics. */
    passThreshold: envNumber("ASSESSMENT_PASS_THRESHOLD", 0.8),
    /** Questions per attempt (blueprint minimum forces 6). */
    drawSize: envNumber("ASSESSMENT_DRAW_SIZE", 6),
    /** Pathway competency check: 12-15 per docs/content/content-map.md. */
    pathwayDrawSize: envNumber("PATHWAY_DRAW_SIZE", 12),
    /** Guest attempt token TTL in milliseconds (2h). */
    tokenTtlMs: envNumber("ASSESSMENT_TOKEN_TTL_MS", 2 * 60 * 60 * 1000),
  };
}

/**
 * Route constants (docs/product/information-architecture.md).
 * Steps are nested routes, not page sections (ADR-011).
 */
export const PATHWAY_SLUG = "ai-awareness";
export const UI_PATHWAY_SLUG = "ui-engineer-readiness";
export const SECTION_SLUG = "ai-automation-software";
export const LESSON_ROUTE = `/learn/${PATHWAY_SLUG}/${SECTION_SLUG}`;

/**
 * Chrome (breadcrumb title, level chip) per pathway. Section routes validate
 * against this registry instead of one hardcoded slug; publication in the
 * database remains the real gate, since getPublishedSection queries by the
 * (pathway, section) pair and unknown pairs 404.
 */
export const PATHWAY_META: Record<string, { title: string; levelChip: string }> = {
  [PATHWAY_SLUG]: { title: "AI Awareness", levelChip: "Level 1 · AI Awareness" },
  [UI_PATHWAY_SLUG]: {
    title: "UI Engineer Readiness",
    levelChip: "Pilot · UI Engineer Readiness",
  },
};

export function isKnownPathway(slug: string): boolean {
  return slug in PATHWAY_META;
}

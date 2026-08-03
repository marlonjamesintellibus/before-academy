import type { PublishedSection } from "../types";
import { LessonJourney } from "./lesson-journey";
import { SectionJourney } from "./section-journey";

/** The one section with a hand-built journey; everything else is data-driven. */
const BESPOKE_SECTION = "ai-automation-software";

/**
 * S03 lesson renderer: published blocks are presented as a five-stage journey.
 * The client leaf owns stage navigation and device resume state while this
 * server-safe wrapper preserves the content feature's public API.
 */
/**
 * The first section shipped as a hand-built journey with bespoke interactive
 * diagrams; every later section renders from its blocks through SectionJourney.
 * Dispatching here rather than generalizing the original keeps the validated,
 * pilot-ready experience free of regression risk.
 */
export function LessonView({
  content,
  sectionSlug,
  lessonRoute,
}: {
  content: PublishedSection;
  sectionSlug: string;
  lessonRoute: string;
}) {
  if (sectionSlug === BESPOKE_SECTION) {
    return <LessonJourney content={content} lessonRoute={lessonRoute} />;
  }
  return <SectionJourney content={content} sectionSlug={sectionSlug} lessonRoute={lessonRoute} />;
}

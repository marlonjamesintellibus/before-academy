import type { PublishedSection } from "../types";
import { LessonJourney } from "./lesson-journey";

/**
 * S03 lesson renderer: published blocks are presented as a five-stage journey.
 * The client leaf owns stage navigation and device resume state while this
 * server-safe wrapper preserves the content feature's public API.
 */
export function LessonView({
  content,
  lessonRoute,
}: {
  content: PublishedSection;
  lessonRoute: string;
}) {
  return <LessonJourney content={content} lessonRoute={lessonRoute} />;
}

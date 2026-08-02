/**
 * content feature public API. Cross-feature imports go through this index only
 * (lint-enforced, docs/engineering/repository.md).
 */
export { getPublishedSection } from "./queries";
export { LessonView } from "./components/lesson-view";
export { lintSection } from "./lint";
export type { LessonBlock, PublishedSection, SectionSeed } from "./types";

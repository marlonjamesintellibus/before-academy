/**
 * content feature public API (client-safe). Cross-feature imports go through
 * this index only (lint-enforced, docs/engineering/repository.md); database
 * reads live in ./server.
 */
export { LessonView } from "./components/lesson-view";
export { lintSection } from "./lint";
export { lintActivity, lintCheck } from "./activity-lint";
export {
  CATEGORY_LABELS,
  SCENARIO_CATEGORIES,
  type ScenarioCategory,
  type ActivitySeed,
  type CheckSeed,
  type ScenarioSeed,
  type PublishedScenario,
  type PublishedCheckQuestion,
} from "./activity-types";
export type { LessonBlock, PublishedSection, SectionSeed } from "./types";

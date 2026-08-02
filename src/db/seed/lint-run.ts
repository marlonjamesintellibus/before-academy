import { lintActivity, lintCheck } from "@/features/content/activity-lint";
import { lintSection } from "@/features/content/lint";
import { activitySeed, checkSeed } from "./activity-content";
import { sectionSeed } from "./section-content";

/** Standalone content-lint runner for CI (no database needed). */
const issues = [
  ...lintSection(sectionSeed),
  ...lintActivity(activitySeed, sectionSeed),
  ...lintCheck(checkSeed, sectionSeed),
];
if (issues.length > 0) {
  console.error(`content-lint: ${issues.length} issue(s)`);
  for (const issue of issues) console.error(`  [${issue.blockId}] ${issue.message}`);
  process.exit(1);
}
console.log("content-lint: clean");

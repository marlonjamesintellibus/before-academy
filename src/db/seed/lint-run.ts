import { lintActivity, lintAssessment, lintCheck } from "@/features/content/activity-lint";
import { lintSection } from "@/features/content/lint";
import { lintCanonicalRecords } from "@/features/content/canonical-lint";
import { activitySeed, checkSeed } from "./activity-content";
import { assessmentSeed } from "./assessment-content";
import { canonicalRecordSeeds, GLOSSARY_TERM_BY_KEY } from "./canonical-content";
import { sectionBundles } from "./sections";
import { sectionSeed } from "./section-content";

/** Standalone content-lint runner for CI (no database needed). */
const issues = [
  ...lintSection(sectionSeed),
  ...lintActivity(activitySeed, sectionSeed),
  ...lintCheck(checkSeed, sectionSeed),
  ...lintAssessment(assessmentSeed),
  ...lintCanonicalRecords(canonicalRecordSeeds, GLOSSARY_TERM_BY_KEY, sectionSeed),
  ...sectionBundles.flatMap((bundle) => lintSection(bundle.seed, { stage: bundle.status })),
];
if (issues.length > 0) {
  console.error(`content-lint: ${issues.length} issue(s)`);
  for (const issue of issues) console.error(`  [${issue.blockId}] ${issue.message}`);
  process.exit(1);
}
console.log("content-lint: clean");

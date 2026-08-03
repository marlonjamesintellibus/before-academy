import type { LintIssue } from "./lint";
import type { CanonicalRecordSeed } from "@/db/seed/canonical-content";
import type { SectionSeed } from "./types";

/**
 * Canonical-record lint (docs/content/knowledge-model.md).
 *
 * This is what converts the "rule of one" from an assertion in a document into
 * a build gate. Before this existed, canonical_records was an empty table and
 * nothing stopped a glossary definition from drifting away from the concept it
 * was supposed to quote.
 *
 * Checks here are structural and referential. Human gates (SME accuracy, the
 * standalone test, analogy judgment) stay human per governance.md.
 */

/** Register IDs from docs/content/misconceptions.md. M7 lands with AIA-5. */
const MISCONCEPTION_IDS = new Set(["M1", "M2", "M3", "M4", "M5", "M6"]);

/** knowledge-model.md: plain definitions are 25 words or fewer. */
const DEFINITION_WORD_LIMIT = 25;

const KEY_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function words(value: string): number {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Definitions are compared without a single trailing period: terminal
 * punctuation is a rendering convention (the glossary table in the docs omits
 * it, the seed includes it) and is not part of the approved wording. Every
 * other difference is drift and fails.
 */
function normalizeDefinition(value: string): string {
  return value.trim().replace(/\.$/, "");
}

export function lintCanonicalRecords(
  records: CanonicalRecordSeed[],
  glossaryTermByKey: Record<string, string>,
  section: SectionSeed,
): LintIssue[] {
  const issues: LintIssue[] = [];
  const keys = new Set(records.map((record) => record.key));
  const seen = new Set<string>();

  for (const record of records) {
    const at = record.key;

    if (!KEY_PATTERN.test(record.key)) {
      issues.push({ blockId: at, message: "key must be kebab-case" });
    }
    if (seen.has(record.key)) {
      issues.push({ blockId: at, message: "duplicate canonical key" });
    }
    seen.add(record.key);

    const required: [keyof CanonicalRecordSeed, string][] = [
      ["title", "title"],
      ["definition", "definition"],
      ["technicalDefinition", "technical definition"],
      ["whyItMatters", "why it matters"],
      ["presentationSummary", "presentation summary"],
      ["speakerNotes", "speaker notes"],
    ];
    for (const [field, label] of required) {
      if (!String(record[field] ?? "").trim()) {
        issues.push({ blockId: at, message: `${label} is required on a canonical record` });
      }
    }

    if (words(record.definition) > DEFINITION_WORD_LIMIT) {
      issues.push({
        blockId: at,
        message: `definition is ${words(record.definition)} words (limit ${DEFINITION_WORD_LIMIT})`,
      });
    }

    if (record.examples.length === 0) {
      issues.push({ blockId: at, message: "at least one approved example is required" });
    }
    for (const [index, example] of record.examples.entries()) {
      if (!example.text.trim() || !example.clue.trim()) {
        issues.push({
          blockId: at,
          message: `example ${index + 1} needs both text and the clue that identifies it`,
        });
      }
    }

    for (const [index, analogy] of record.analogies.entries()) {
      if (!analogy.boundary.trim()) {
        issues.push({
          blockId: at,
          message: `analogy ${index + 1} has no boundary; an analogy without its limit is how drift starts`,
        });
      }
    }

    for (const misconceptionId of record.misconceptionIds) {
      if (!MISCONCEPTION_IDS.has(misconceptionId)) {
        issues.push({
          blockId: at,
          message: `unknown misconception ${misconceptionId}; register it in misconceptions.md first`,
        });
      }
    }

    for (const relatedKey of record.relatedKeys) {
      if (!keys.has(relatedKey)) {
        issues.push({ blockId: at, message: `related key ${relatedKey} has no canonical record` });
      }
      if (relatedKey === record.key) {
        issues.push({ blockId: at, message: "a record cannot be related to itself" });
      }
    }
  }

  // Rule of one: a claimed glossary term must exist and must quote the record.
  const glossaryByTerm = new Map(section.glossary.map((entry) => [entry.term, entry]));
  for (const [key, term] of Object.entries(glossaryTermByKey)) {
    const record = records.find((candidate) => candidate.key === key);
    if (!record) {
      issues.push({ blockId: key, message: `glossary mapping names a record that does not exist` });
      continue;
    }
    const entry = glossaryByTerm.get(term);
    if (!entry) {
      issues.push({
        blockId: key,
        message: `record claims glossary term "${term}", which is not in the section glossary`,
      });
      continue;
    }
    if (normalizeDefinition(entry.definition) !== normalizeDefinition(record.definition)) {
      issues.push({
        blockId: key,
        message: `glossary definition for "${term}" has drifted from its canonical record; the record is the source`,
      });
    }
  }

  return issues;
}

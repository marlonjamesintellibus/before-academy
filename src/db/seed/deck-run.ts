import { writeFileSync } from "node:fs";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { canonicalRecords } from "@/db/schema";
import { buildDeck, type DeckExample, type DeckRecord } from "@/features/content/presentation";
import { canonicalRecordSeeds } from "./canonical-content";

/**
 * Generates the sample presentation from published canonical records
 * (roadmap brief s9 item 16). Run: npm run content:deck
 *
 * Reads the database rather than the seed files on purpose: the proof being
 * demonstrated is that the *published* record drives the deck, and only the
 * database knows which content version is live.
 */
const OUTPUT = "docs/exports/ai-awareness-core-concepts.md";
const TITLE = "AI Awareness: the core concepts";

function asExamples(value: unknown): DeckExample[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((entry) => {
    if (!entry || typeof entry !== "object") return [];
    const candidate = entry as Partial<DeckExample>;
    if (typeof candidate.text !== "string" || typeof candidate.clue !== "string") return [];
    return [{ text: candidate.text, clue: candidate.clue }];
  });
}

async function main() {
  const db = getDb();
  const unordered = await db
    .select()
    .from(canonicalRecords)
    .where(eq(canonicalRecords.status, "published"));

  // Teaching order, not alphabetical: the seed array is authored so each
  // concept builds on the previous one, and a deck that opens on "AI-assisted
  // system" would explain the composite before its parts.
  const order = new Map(canonicalRecordSeeds.map((seed, index) => [seed.key, index]));
  const rows = [...unordered].sort(
    (a, b) =>
      (order.get(a.key) ?? Number.MAX_SAFE_INTEGER) - (order.get(b.key) ?? Number.MAX_SAFE_INTEGER),
  );

  if (rows.length === 0) {
    console.error("no published canonical records; run npm run db:seed first");
    process.exit(1);
  }

  const missing = rows.filter((row) => !row.presentationSummary || !row.speakerNotes);
  if (missing.length > 0) {
    console.error(
      `records without deck wording: ${missing.map((row) => row.key).join(", ")}. ` +
        "content-lint requires both; the database is behind the seeds.",
    );
    process.exit(1);
  }

  const records: DeckRecord[] = rows.map((row) => ({
    key: row.key,
    title: row.title ?? row.key,
    definition: row.definition,
    presentationSummary: row.presentationSummary ?? "",
    speakerNotes: row.speakerNotes ?? "",
    examples: asExamples(row.examples),
    sources: row.sources,
  }));

  const contentVersion = Math.max(...rows.map((row) => row.version));
  const generatedOn = new Date().toISOString().slice(0, 10);

  writeFileSync(OUTPUT, buildDeck(records, { title: TITLE, contentVersion, generatedOn }));
  console.log(
    `deck written: ${OUTPUT} (${records.length} records, content version ${contentVersion})`,
  );
  process.exit(0);
}

void main();

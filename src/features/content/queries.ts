import { and, asc, eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { contentBlocks, glossaryTerms, pathways, sections } from "@/db/schema";
import type { LessonBlock, PublishedSection } from "./types";

/**
 * Record resolution (docs/engineering/content-engine.md): the lesson page reads
 * published rows only; drafts and in_review render nowhere in production.
 */
export async function getPublishedSection(
  pathwaySlug: string,
  sectionSlug: string,
): Promise<PublishedSection | null> {
  const db = getDb();

  const pathway = await db.query.pathways.findFirst({
    where: and(eq(pathways.slug, pathwaySlug), eq(pathways.status, "published")),
  });
  if (!pathway) return null;

  const section = await db.query.sections.findFirst({
    where: and(
      eq(sections.pathwayId, pathway.id),
      eq(sections.slug, sectionSlug),
      eq(sections.status, "published"),
    ),
  });
  if (!section) return null;

  const blocks = await db.query.contentBlocks.findMany({
    where: and(eq(contentBlocks.sectionId, section.id), eq(contentBlocks.status, "published")),
    orderBy: [asc(contentBlocks.position)],
  });

  const terms = await db.query.glossaryTerms.findMany({
    where: eq(glossaryTerms.status, "published"),
  });

  const glossary: PublishedSection["glossary"] = {};
  for (const term of terms) {
    if (!term.isChip) continue;
    glossary[term.term.toLowerCase()] = {
      definition: term.definition,
      ...(term.example ? { example: term.example } : {}),
    };
  }

  return {
    title: section.title,
    description: section.description,
    version: section.version,
    blocks: blocks.map((row) => row.body as LessonBlock),
    glossary,
  };
}

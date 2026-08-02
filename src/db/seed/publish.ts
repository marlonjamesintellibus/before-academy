import { createHash } from "node:crypto";
import { and, eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { contentBlocks, contentVersions, glossaryTerms, pathways, sections } from "@/db/schema";
import { lintSection } from "@/features/content/lint";
import { sectionSeed } from "./section-content";

/**
 * Idempotent seed/publish pipeline (ADR-027, ADR-021). Content lives as
 * reviewed seed files in the repo; publishing versions and snapshots it.
 * Re-running with unchanged content is a no-op (snapshot hash match).
 * Run: npm run db:seed (uses DATABASE_URL).
 */
async function publish() {
  const issues = lintSection(sectionSeed);
  if (issues.length > 0) {
    console.error("content-lint failed:");
    for (const issue of issues) console.error(`  [${issue.blockId}] ${issue.message}`);
    process.exit(1);
  }

  const db = getDb();
  const snapshot = JSON.stringify(sectionSeed);
  const hash = createHash("sha256").update(snapshot).digest("hex");

  await db.transaction(async (tx) => {
    const [pathway] = await tx
      .insert(pathways)
      .values({ ...sectionSeed.pathway, status: "published" })
      .onConflictDoUpdate({
        target: pathways.slug,
        set: {
          title: sectionSeed.pathway.title,
          description: sectionSeed.pathway.description,
          status: "published",
        },
      })
      .returning();
    if (!pathway) throw new Error("pathway upsert returned nothing");

    const existing = await tx.query.sections.findFirst({
      where: and(eq(sections.pathwayId, pathway.id), eq(sections.slug, sectionSeed.section.slug)),
    });

    if (existing) {
      const latest = await tx.query.contentVersions.findFirst({
        where: and(
          eq(contentVersions.sectionId, existing.id),
          eq(contentVersions.version, existing.version),
        ),
      });
      if (latest && (latest.snapshot as { hash?: string }).hash === hash) {
        console.log(`content unchanged (v${existing.version}); nothing to publish`);
        return;
      }
    }

    const version = existing ? existing.version + 1 : 1;
    const [section] = existing
      ? await tx
          .update(sections)
          .set({
            title: sectionSeed.section.title,
            description: sectionSeed.section.description,
            version,
            status: "published",
          })
          .where(eq(sections.id, existing.id))
          .returning()
      : await tx
          .insert(sections)
          .values({
            ...sectionSeed.section,
            pathwayId: pathway.id,
            version,
            status: "published",
          })
          .returning();
    if (!section) throw new Error("section upsert returned nothing");

    // Blocks: replace wholesale; history lives in content_versions snapshots (ADR-021).
    await tx.delete(contentBlocks).where(eq(contentBlocks.sectionId, section.id));
    await tx.insert(contentBlocks).values(
      sectionSeed.blocks.map((block, position) => ({
        sectionId: section.id,
        slug: block.id.toLowerCase(),
        blockType: block.type,
        layer: "quick" as const,
        position,
        body: block,
        status: "published" as const,
        version,
      })),
    );

    for (const entry of sectionSeed.glossary) {
      await tx
        .insert(glossaryTerms)
        .values({
          term: entry.term,
          definition: entry.definition,
          example: entry.example ?? null,
          isChip: entry.chip,
          status: "published",
          version,
        })
        .onConflictDoUpdate({
          target: glossaryTerms.term,
          set: {
            definition: entry.definition,
            example: entry.example ?? null,
            isChip: entry.chip,
            status: "published",
            version,
          },
        });
    }

    await tx.insert(contentVersions).values({
      sectionId: section.id,
      version,
      snapshot: { hash, seed: sectionSeed },
      publishedBy: process.env.USER ?? "seed-pipeline",
    });

    console.log(
      `published ${section.slug} v${version}: ${sectionSeed.blocks.length} blocks, ${sectionSeed.glossary.length} glossary terms`,
    );
  });

  process.exit(0);
}

publish().catch((error) => {
  console.error("publish failed:", error);
  process.exit(1);
});

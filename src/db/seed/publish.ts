import { createHash } from "node:crypto";
import { and, eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import {
  canonicalRecords,
  contentBlocks,
  contentVersions,
  glossaryTerms,
  pathways,
  questionOptions,
  questions,
  scenarios,
  sections,
} from "@/db/schema";
import { lintSection } from "@/features/content/lint";
import { lintActivity, lintAssessment, lintCheck } from "@/features/content/activity-lint";
import { lintCanonicalRecords } from "@/features/content/canonical-lint";
import { canonicalRecordSeeds, GLOSSARY_TERM_BY_KEY } from "./canonical-content";
import { sectionSeed } from "./section-content";
import { activitySeed, checkSeed } from "./activity-content";
import { assessmentSeed } from "./assessment-content";

/**
 * Idempotent seed/publish pipeline (ADR-027, ADR-021). Content lives as
 * reviewed seed files in the repo; publishing versions and snapshots it.
 * Re-running with unchanged content is a no-op (snapshot hash match).
 * Run: npm run db:seed (uses DATABASE_URL).
 */
async function publish() {
  const issues = [
    ...lintSection(sectionSeed),
    ...lintActivity(activitySeed, sectionSeed),
    ...lintCheck(checkSeed, sectionSeed),
    ...lintAssessment(assessmentSeed),
    ...lintCanonicalRecords(canonicalRecordSeeds, GLOSSARY_TERM_BY_KEY, sectionSeed),
  ];
  if (issues.length > 0) {
    console.error("content-lint failed:");
    for (const issue of issues) console.error(`  [${issue.blockId}] ${issue.message}`);
    process.exit(1);
  }

  const db = getDb();
  // Canonical records are content: a changed definition must produce a new
  // version and snapshot, so they belong inside the idempotency hash. Leaving
  // them out would make an edit to a definition a silent no-op.
  const snapshot = JSON.stringify({
    sectionSeed,
    activitySeed,
    checkSeed,
    assessmentSeed,
    canonicalRecordSeeds,
  });
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

    // Canonical records first: the glossary links to them, so they must exist
    // before terms are written (docs/content/knowledge-model.md, rule of one).
    const recordIdByKey = new Map<string, string>();
    for (const record of canonicalRecordSeeds) {
      const [row] = await tx
        .insert(canonicalRecords)
        .values({
          key: record.key,
          title: record.title,
          definition: record.definition,
          technicalDefinition: record.technicalDefinition,
          whyItMatters: record.whyItMatters,
          examples: record.examples,
          analogies: record.analogies,
          misconceptionIds: [...record.misconceptionIds],
          relatedKeys: [...record.relatedKeys],
          presentationSummary: record.presentationSummary,
          speakerNotes: record.speakerNotes,
          sources: [...record.sources],
          status: "published",
          version,
          owner: "content-owner",
          technicalReviewer: "sme",
          educationalReviewer: "education-lead",
        })
        .onConflictDoUpdate({
          target: canonicalRecords.key,
          set: {
            title: record.title,
            definition: record.definition,
            technicalDefinition: record.technicalDefinition,
            whyItMatters: record.whyItMatters,
            examples: record.examples,
            analogies: record.analogies,
            misconceptionIds: [...record.misconceptionIds],
            relatedKeys: [...record.relatedKeys],
            presentationSummary: record.presentationSummary,
            speakerNotes: record.speakerNotes,
            sources: [...record.sources],
            status: "published",
            version,
          },
        })
        .returning({ id: canonicalRecords.id });
      if (row) recordIdByKey.set(record.key, row.id);
    }

    const recordIdByTerm = new Map<string, string>();
    for (const [key, term] of Object.entries(GLOSSARY_TERM_BY_KEY)) {
      const recordId = recordIdByKey.get(key);
      if (recordId) recordIdByTerm.set(term, recordId);
    }

    for (const entry of sectionSeed.glossary) {
      const canonicalRecordId = recordIdByTerm.get(entry.term) ?? null;
      await tx
        .insert(glossaryTerms)
        .values({
          term: entry.term,
          canonicalRecordId,
          definition: entry.definition,
          example: entry.example ?? null,
          isChip: entry.chip,
          status: "published",
          version,
        })
        .onConflictDoUpdate({
          target: glossaryTerms.term,
          set: {
            canonicalRecordId,
            definition: entry.definition,
            example: entry.example ?? null,
            isChip: entry.chip,
            status: "published",
            version,
          },
        });
    }

    // Sort the System scenarios (S04): replace wholesale, same versioning model.
    await tx.delete(scenarios).where(eq(scenarios.sectionId, section.id));
    await tx.insert(scenarios).values(
      activitySeed.scenarios.map((scenario) => ({
        sectionId: section.id,
        contentId: scenario.id,
        position: scenario.position,
        body: scenario.body,
        correctCategory: scenario.correctCategory,
        acceptedCategories: scenario.accepted,
        clue: scenario.clue,
        ambiguityNote: scenario.ambiguityNote ?? null,
        feedback: {
          title: scenario.title,
          difficulty: scenario.difficulty,
          byCategory: scenario.feedback,
          ...(scenario.explanation ? { explanation: scenario.explanation } : {}),
          remediationAnchor: scenario.remediationAnchor,
        },
        status: "published" as const,
        version,
      })),
    );

    // Knowledge check questions (S05, kind=check; never in graded draws, ADR-029).
    const existingCheck = await tx.query.questions.findMany({
      where: and(eq(questions.sectionId, section.id), eq(questions.kind, "check")),
    });
    for (const row of existingCheck) {
      await tx.delete(questions).where(eq(questions.id, row.id));
    }
    for (const question of checkSeed.questions) {
      const [inserted] = await tx
        .insert(questions)
        .values({
          sectionId: section.id,
          contentId: question.id,
          kind: "check" as const,
          format: "multiple_choice" as const,
          category: question.category,
          difficulty: question.difficulty,
          stem: question.stem,
          explanation: JSON.stringify({
            correctFeedback: question.correctFeedback,
            incorrectFeedback: question.incorrectFeedback,
            chipLabel: question.chip.label,
          }),
          remediationBlockId: question.chip.anchor,
          learningOutcomes: question.learningOutcomes,
          misconceptionTags: question.misconceptionTags,
          useTags: ["check"],
          status: "published" as const,
          version,
        })
        .returning();
      if (!inserted) throw new Error("question insert returned nothing");
      await tx.insert(questionOptions).values(
        question.options.map((option, position) => ({
          questionId: inserted.id,
          position,
          body: option.text,
          isCorrect: option.correct,
        })),
      );
    }

    // Graded core bank (kind=assessment, ADR-029): replace wholesale like check.
    const existingAssessment = await tx.query.questions.findMany({
      where: and(eq(questions.sectionId, section.id), eq(questions.kind, "assessment")),
    });
    for (const row of existingAssessment) {
      await tx.delete(questions).where(eq(questions.id, row.id));
    }
    for (const question of assessmentSeed.questions) {
      const [inserted] = await tx
        .insert(questions)
        .values({
          sectionId: section.id,
          contentId: question.id,
          kind: "assessment" as const,
          format: question.format,
          category: question.category,
          difficulty: question.difficulty,
          stem: question.stem,
          explanation: JSON.stringify({
            correctExplanation: question.correctExplanation,
            incorrectExplanation: question.incorrectExplanation,
            fixedDraw: question.fixedDraw,
            rotateOptions: question.rotateOptions,
          }),
          remediationBlockId: question.category,
          learningOutcomes: question.learningOutcomes,
          misconceptionTags: question.misconceptionTags,
          useTags: ["assessment"],
          status: "published" as const,
          version,
        })
        .returning();
      if (!inserted) throw new Error("assessment question insert returned nothing");
      await tx.insert(questionOptions).values(
        question.options.map((option, position) => ({
          questionId: inserted.id,
          position,
          body: option.text,
          isCorrect: option.correct,
        })),
      );
    }

    await tx.insert(contentVersions).values({
      sectionId: section.id,
      version,
      snapshot: { hash, seed: sectionSeed },
      publishedBy: process.env.USER ?? "seed-pipeline",
    });

    console.log(
      `published ${section.slug} v${version}: ${sectionSeed.blocks.length} blocks, ${sectionSeed.glossary.length} glossary terms, ${activitySeed.scenarios.length} scenarios, ${checkSeed.questions.length} check questions, ${assessmentSeed.questions.length} bank items`,
    );
  });

  process.exit(0);
}

publish().catch((error) => {
  console.error("publish failed:", error);
  process.exit(1);
});

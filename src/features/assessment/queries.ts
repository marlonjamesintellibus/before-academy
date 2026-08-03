import { and, asc, eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { pathways, questionOptions, questions, sections } from "@/db/schema";
import type { AssessmentCategory, AssessmentFormat, AssessmentQuestionSeed } from "./types";

/**
 * Server-only bank read (kind=assessment). Full rows including correctness -
 * NEVER ship these to the client; sanitization happens in actions.ts.
 */
export interface BankQuestion extends AssessmentQuestionSeed {
  options: { id: string; text: string; correct: boolean }[];
  /** Which section the item came from. Used by the pathway draw for coverage. */
  sectionSlug?: string;
}

/** Marks a pathway-scoped attempt in the signed token: `pathway:<slug>`. */
export const PATHWAY_SCOPE_PREFIX = "pathway:";

export function pathwayScope(pathwaySlug: string): string {
  return `${PATHWAY_SCOPE_PREFIX}${pathwaySlug}`;
}

interface QuestionMeta {
  correctExplanation: string;
  incorrectExplanation: string;
  fixedDraw: boolean;
  rotateOptions: boolean;
}

export async function getAssessmentBank(sectionSlug: string): Promise<BankQuestion[]> {
  const db = getDb();
  const section = await db.query.sections.findFirst({
    where: and(eq(sections.slug, sectionSlug), eq(sections.status, "published")),
  });
  if (!section) return [];

  const rows = await db.query.questions.findMany({
    where: and(
      eq(questions.sectionId, section.id),
      eq(questions.kind, "assessment"),
      eq(questions.status, "published"),
    ),
    orderBy: [asc(questions.contentId)],
  });

  const bank: BankQuestion[] = [];
  for (const row of rows) {
    const options = await db.query.questionOptions.findMany({
      where: eq(questionOptions.questionId, row.id),
      orderBy: [asc(questionOptions.position)],
    });
    const meta = JSON.parse(row.explanation) as QuestionMeta;
    bank.push({
      id: row.contentId,
      format: row.format as AssessmentFormat,
      category: row.category as AssessmentCategory,
      difficulty: row.difficulty,
      stem: row.stem,
      options: options.map((option) => ({
        id: option.id,
        text: option.body,
        correct: option.isCorrect,
      })),
      correctExplanation: meta.correctExplanation,
      incorrectExplanation: meta.incorrectExplanation,
      fixedDraw: meta.fixedDraw,
      rotateOptions: meta.rotateOptions,
      learningOutcomes: row.learningOutcomes,
      misconceptionTags: row.misconceptionTags,
    });
  }
  return bank;
}

/**
 * Every published assessment item across a pathway's sections, tagged with its
 * section so the draw can guarantee coverage. This is the Level 1 competency
 * bank: passing it should mean the pathway, not one section.
 */
export async function getPathwayAssessmentBank(pathwaySlug: string): Promise<BankQuestion[]> {
  const db = getDb();
  const pathway = await db.query.pathways.findFirst({
    where: and(eq(pathways.slug, pathwaySlug), eq(pathways.status, "published")),
  });
  if (!pathway) return [];

  const rows = await db.query.sections.findMany({
    where: and(eq(sections.pathwayId, pathway.id), eq(sections.status, "published")),
    orderBy: [asc(sections.position)],
  });

  const bank: BankQuestion[] = [];
  for (const section of rows) {
    const items = await getAssessmentBank(section.slug);
    for (const item of items) bank.push({ ...item, sectionSlug: section.slug });
  }
  return bank;
}

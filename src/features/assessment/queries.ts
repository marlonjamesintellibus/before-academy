import { and, asc, eq, inArray } from "drizzle-orm";
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

/**
 * Assembles bank rows from question rows plus their options, grouped in memory.
 *
 * Batched deliberately: the first version issued one options query PER
 * question inside a sequential loop, so the pathway bank cost 76 round trips
 * (60 questions + 7 sections + 2) and the page took 9.6 seconds every load.
 * Question count grows with every section authored, so the N+1 got worse as
 * the content grew. Two queries now, regardless of bank size.
 */
async function loadOptions(questionIds: string[]) {
  if (questionIds.length === 0) return new Map<string, (typeof rows)[number][]>();
  const db = getDb();
  const rows = await db.query.questionOptions.findMany({
    where: inArray(questionOptions.questionId, questionIds),
    orderBy: [asc(questionOptions.position)],
  });
  const grouped = new Map<string, typeof rows>();
  for (const option of rows) {
    const list = grouped.get(option.questionId);
    if (list) list.push(option);
    else grouped.set(option.questionId, [option]);
  }
  return grouped;
}

type QuestionRow = Awaited<ReturnType<typeof loadQuestions>>[number];

async function loadQuestions(sectionIds: string[]) {
  if (sectionIds.length === 0) return [];
  const db = getDb();
  return db.query.questions.findMany({
    where: and(
      inArray(questions.sectionId, sectionIds),
      eq(questions.kind, "assessment"),
      eq(questions.status, "published"),
    ),
    orderBy: [asc(questions.contentId)],
  });
}

function toBankQuestion(
  row: QuestionRow,
  options: { id: string; body: string; isCorrect: boolean }[],
): BankQuestion {
  const meta = JSON.parse(row.explanation) as QuestionMeta;
  return {
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
  };
}

export async function getAssessmentBank(sectionSlug: string): Promise<BankQuestion[]> {
  const db = getDb();
  const section = await db.query.sections.findFirst({
    where: and(eq(sections.slug, sectionSlug), eq(sections.status, "published")),
  });
  if (!section) return [];

  const rows = await loadQuestions([section.id]);
  const options = await loadOptions(rows.map((row) => row.id));
  return rows.map((row) => toBankQuestion(row, options.get(row.id) ?? []));
}

/**
 * Every published assessment item across a pathway's sections, tagged with its
 * section so the draw can guarantee coverage. This is the Level 1 competency
 * bank: passing it should mean the pathway, not one section.
 *
 * Four round trips whatever the bank size: pathway, sections, questions,
 * options.
 */
export async function getPathwayAssessmentBank(pathwaySlug: string): Promise<BankQuestion[]> {
  const db = getDb();
  const pathway = await db.query.pathways.findFirst({
    where: and(eq(pathways.slug, pathwaySlug), eq(pathways.status, "published")),
  });
  if (!pathway) return [];

  const sectionRows = await db.query.sections.findMany({
    where: and(eq(sections.pathwayId, pathway.id), eq(sections.status, "published")),
    orderBy: [asc(sections.position)],
  });
  const slugById = new Map(sectionRows.map((section) => [section.id, section.slug]));

  const rows = await loadQuestions(sectionRows.map((section) => section.id));
  const options = await loadOptions(rows.map((row) => row.id));

  // Section order preserved: the draw takes coverage in pathway order.
  const order = new Map(sectionRows.map((section, index) => [section.id, index]));
  return rows
    .slice()
    .sort((a, b) => (order.get(a.sectionId) ?? 0) - (order.get(b.sectionId) ?? 0))
    .map((row) => {
      const slug = slugById.get(row.sectionId);
      return {
        ...toBankQuestion(row, options.get(row.id) ?? []),
        ...(slug ? { sectionSlug: slug } : {}),
      };
    });
}

import { and, asc, eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { questionOptions, questions, sections } from "@/db/schema";
import type { AssessmentCategory, AssessmentFormat, AssessmentQuestionSeed } from "./types";

/**
 * Server-only bank read (kind=assessment). Full rows including correctness -
 * NEVER ship these to the client; sanitization happens in actions.ts.
 */
export interface BankQuestion extends AssessmentQuestionSeed {
  options: { id: string; text: string; correct: boolean }[];
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

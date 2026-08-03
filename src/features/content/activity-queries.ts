import { and, asc, eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { questionOptions, questions, scenarios, sections } from "@/db/schema";
import type {
  PublishedCheckQuestion,
  PublishedScenario,
  ScenarioCategory,
  ScenarioSeed,
} from "./activity-types";

/**
 * Published activity/check reads. Practice content ships whole to the client
 * (immediate feedback is the product; devtools visibility is an accepted
 * ADR-025 consequence). Graded assessment payloads are sanitized elsewhere -
 * never reuse these queries for kind=assessment.
 */

interface ScenarioMeta {
  title: string;
  difficulty: ScenarioSeed["difficulty"];
  byCategory: Record<ScenarioCategory, string>;
  options?: ScenarioSeed["options"];
  prompt?: string;
  explanation?: string;
  remediationAnchor: string;
}

export async function getPublishedScenarios(sectionSlug: string): Promise<PublishedScenario[]> {
  const db = getDb();
  const section = await db.query.sections.findFirst({
    where: and(eq(sections.slug, sectionSlug), eq(sections.status, "published")),
  });
  if (!section) return [];

  const rows = await db.query.scenarios.findMany({
    where: and(eq(scenarios.sectionId, section.id), eq(scenarios.status, "published")),
    orderBy: [asc(scenarios.position)],
  });

  return rows.map((row) => {
    const meta = row.feedback as unknown as ScenarioMeta;
    const generic = Boolean(meta.options && meta.options.length > 0);
    return {
      id: row.contentId,
      position: row.position,
      title: meta.title,
      body: row.body,
      difficulty: meta.difficulty,
      // Generic scenarios round-trip their options; classic ones their labels.
      ...(row.correctCategory && !generic
        ? { correctCategory: row.correctCategory as ScenarioCategory }
        : {}),
      ...(generic ? {} : { accepted: row.acceptedCategories as ScenarioCategory[] }),
      clue: row.clue,
      ...(row.ambiguityNote ? { ambiguityNote: row.ambiguityNote } : {}),
      ...(generic ? {} : { feedback: meta.byCategory }),
      ...(meta.options ? { options: meta.options } : {}),
      ...(meta.prompt ? { prompt: meta.prompt } : {}),
      ...(meta.explanation ? { explanation: meta.explanation } : {}),
      remediationAnchor: meta.remediationAnchor,
    };
  });
}

interface CheckQuestionMeta {
  correctFeedback: string;
  incorrectFeedback: string;
  chipLabel: string;
}

export async function getPublishedCheckQuestions(
  sectionSlug: string,
): Promise<PublishedCheckQuestion[]> {
  const db = getDb();
  const section = await db.query.sections.findFirst({
    where: and(eq(sections.slug, sectionSlug), eq(sections.status, "published")),
  });
  if (!section) return [];

  const rows = await db.query.questions.findMany({
    where: and(
      eq(questions.sectionId, section.id),
      eq(questions.kind, "check"),
      eq(questions.status, "published"),
    ),
    orderBy: [asc(questions.contentId)],
  });

  const result: PublishedCheckQuestion[] = [];
  for (const row of rows) {
    const options = await db.query.questionOptions.findMany({
      where: eq(questionOptions.questionId, row.id),
      orderBy: [asc(questionOptions.position)],
    });
    const meta = JSON.parse(row.explanation) as CheckQuestionMeta;
    result.push({
      id: row.contentId,
      stem: row.stem,
      options: options.map((option) => ({
        id: option.id,
        text: option.body,
        correct: option.isCorrect,
      })),
      correctFeedback: meta.correctFeedback,
      incorrectFeedback: meta.incorrectFeedback,
      chip: { label: meta.chipLabel, anchor: row.remediationBlockId },
    });
  }
  return result;
}

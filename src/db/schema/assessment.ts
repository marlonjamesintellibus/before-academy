import {
  boolean,
  index,
  integer,
  jsonb,
  pgTable,
  text,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { id, locale, timestamps } from "./helpers";
import { sections } from "./content";
import {
  blueprintCategory,
  contentStatus,
  questionDifficulty,
  questionFormat,
  questionKind,
  scenarioCategory,
} from "./enums";

/**
 * Assessment entities (docs/engineering/database.md, assessment-engine.md).
 * kind separates check (practice) from assessment (graded) - ADR-029.
 * Every question resolves a remediation_block_id (content-lint, Eng §14).
 */

export const questions = pgTable(
  "questions",
  {
    id: id(),
    sectionId: uuid("section_id")
      .notNull()
      .references(() => sections.id),
    contentId: text("content_id").notNull(),
    kind: questionKind("kind").notNull(),
    format: questionFormat("format").notNull(),
    category: blueprintCategory("category").notNull(),
    difficulty: questionDifficulty("difficulty").notNull(),
    stem: text("stem").notNull(),
    explanation: text("explanation").notNull(),
    remediationBlockId: text("remediation_block_id").notNull(),
    learningOutcomes: text("learning_outcomes").array().notNull().default([]),
    misconceptionTags: text("misconception_tags").array().notNull().default([]),
    /** Extended-bank use tags: retake, check, diagnostic, remediation. */
    useTags: text("use_tags").array().notNull().default([]),
    status: contentStatus("status").notNull().default("draft"),
    version: integer("version").notNull().default(1),
    ...locale,
    ...timestamps,
  },
  (table) => [
    uniqueIndex("questions_content_id_idx").on(table.contentId),
    index("questions_section_kind_category_idx").on(table.sectionId, table.kind, table.category),
  ],
);

export const questionOptions = pgTable(
  "question_options",
  {
    id: id(),
    questionId: uuid("question_id")
      .notNull()
      .references(() => questions.id, { onDelete: "cascade" }),
    position: integer("position").notNull(),
    body: text("body").notNull(),
    /** Never leaves the server outside submitAttempt review (api-contracts rule). */
    isCorrect: boolean("is_correct").notNull().default(false),
    rationale: text("rationale"),
    ...locale,
    ...timestamps,
  },
  (table) => [index("question_options_question_id_idx").on(table.questionId)],
);

export const scenarios = pgTable(
  "scenarios",
  {
    id: id(),
    sectionId: uuid("section_id")
      .notNull()
      .references(() => sections.id),
    contentId: text("content_id").notNull(),
    position: integer("position").notNull(),
    body: text("body").notNull(),
    /** Null for scenarios that carry their own options (generic dialect);
     * correctness then lives in the feedback jsonb meta. Expand migration
     * 0003 dropped the NOT NULL. */
    correctCategory: scenarioCategory("correct_category"),
    /** Additional accepted categories for honest-ambiguity items. */
    acceptedCategories: text("accepted_categories").array().notNull().default([]),
    clue: text("clue").notNull(),
    ambiguityNote: text("ambiguity_note"),
    feedback: jsonb("feedback").notNull(),
    status: contentStatus("status").notNull().default("draft"),
    version: integer("version").notNull().default(1),
    ...locale,
    ...timestamps,
  },
  (table) => [
    uniqueIndex("scenarios_content_id_idx").on(table.contentId),
    index("scenarios_section_id_idx").on(table.sectionId),
  ],
);

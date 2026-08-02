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
import { id, timestamps } from "./helpers";
import { attemptRoute, confidenceStage } from "./enums";
import { learnerProfiles } from "./auth";
import { sections } from "./content";

/**
 * Learner state (docs/engineering/database.md).
 * learner_id ALWAYS resolves from the session, never client input (ADR-024).
 * All learner rows hard-delete on account deletion via cascade (ADR-022);
 * guests store nothing here - device-only (ADR-025).
 * Rows record the content_version the learner experienced (ADR-021).
 */

export const sectionProgress = pgTable(
  "section_progress",
  {
    id: id(),
    learnerId: uuid("learner_id")
      .notNull()
      .references(() => learnerProfiles.id, { onDelete: "cascade" }),
    sectionId: uuid("section_id")
      .notNull()
      .references(() => sections.id),
    /** ProgressSnapshot steps - shape frozen at M5 exit (roadmap D5). */
    steps: jsonb("steps").notNull(),
    contentVersion: integer("content_version").notNull(),
    completed: boolean("completed").notNull().default(false),
    /** Set at guest→registered migration; migrated data is range-clamped. */
    source: text("source"),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("section_progress_learner_section_idx").on(table.learnerId, table.sectionId),
  ],
);

export const attempts = pgTable(
  "attempts",
  {
    id: id(),
    learnerId: uuid("learner_id")
      .notNull()
      .references(() => learnerProfiles.id, { onDelete: "cascade" }),
    sectionId: uuid("section_id")
      .notNull()
      .references(() => sections.id),
    number: integer("number").notNull(),
    questionIds: uuid("question_ids").array().notNull(),
    score: integer("score"),
    passed: boolean("passed"),
    categoriesFailed: text("categories_failed").array().notNull().default([]),
    route: attemptRoute("route").notNull().default("lesson_first"),
    idempotencyKey: text("idempotency_key").notNull(),
    contentVersion: integer("content_version").notNull(),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("attempts_idempotency_key_idx").on(table.idempotencyKey),
    index("attempts_learner_section_number_idx").on(table.learnerId, table.sectionId, table.number),
  ],
);

export const attemptAnswers = pgTable(
  "attempt_answers",
  {
    id: id(),
    attemptId: uuid("attempt_id")
      .notNull()
      .references(() => attempts.id, { onDelete: "cascade" }),
    questionId: uuid("question_id").notNull(),
    answer: jsonb("answer").notNull(),
    correct: boolean("correct"),
    ...timestamps,
  },
  (table) => [index("attempt_answers_attempt_id_idx").on(table.attemptId)],
);

export const confidenceResponses = pgTable(
  "confidence_responses",
  {
    id: id(),
    learnerId: uuid("learner_id")
      .notNull()
      .references(() => learnerProfiles.id, { onDelete: "cascade" }),
    sectionId: uuid("section_id")
      .notNull()
      .references(() => sections.id),
    stage: confidenceStage("stage").notNull(),
    /** 1–5, validated at the action boundary. */
    value: integer("value").notNull(),
    contentVersion: integer("content_version").notNull(),
    ...timestamps,
  },
  (table) => [
    index("confidence_responses_learner_section_idx").on(table.learnerId, table.sectionId),
  ],
);

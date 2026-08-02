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
import { blockLayer, contentStatus } from "./enums";

/**
 * Content entities (docs/engineering/database.md, docs/engineering/content-engine.md).
 * Published rows are never edited in place (ADR-021); deletion = status archive (ADR-022).
 * Learner-facing copy lives ONLY in these tables.
 */

export const pathways = pgTable(
  "pathways",
  {
    id: id(),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    status: contentStatus("status").notNull().default("draft"),
    version: integer("version").notNull().default(1),
    owner: text("owner"),
    ...locale,
    ...timestamps,
  },
  (table) => [uniqueIndex("pathways_slug_idx").on(table.slug)],
);

export const sections = pgTable(
  "sections",
  {
    id: id(),
    pathwayId: uuid("pathway_id")
      .notNull()
      .references(() => pathways.id),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    position: integer("position").notNull(),
    status: contentStatus("status").notNull().default("draft"),
    version: integer("version").notNull().default(1),
    owner: text("owner"),
    ...locale,
    ...timestamps,
  },
  (table) => [
    uniqueIndex("sections_pathway_slug_idx").on(table.pathwayId, table.slug),
    index("sections_pathway_id_idx").on(table.pathwayId),
  ],
);

export const canonicalRecords = pgTable(
  "canonical_records",
  {
    id: id(),
    key: text("key").notNull(),
    definition: text("definition").notNull(),
    status: contentStatus("status").notNull().default("draft"),
    version: integer("version").notNull().default(1),
    owner: text("owner"),
    reviewedAt: text("reviewed_at"),
    ...locale,
    ...timestamps,
  },
  (table) => [uniqueIndex("canonical_records_key_idx").on(table.key)],
);

export const contentBlocks = pgTable(
  "content_blocks",
  {
    id: id(),
    sectionId: uuid("section_id")
      .notNull()
      .references(() => sections.id),
    canonicalRecordId: uuid("canonical_record_id").references(() => canonicalRecords.id),
    slug: text("slug").notNull(),
    blockType: text("block_type").notNull(),
    layer: blockLayer("layer").notNull().default("quick"),
    position: integer("position").notNull(),
    body: jsonb("body").notNull(),
    categoryTags: text("category_tags").array().notNull().default([]),
    status: contentStatus("status").notNull().default("draft"),
    version: integer("version").notNull().default(1),
    ...locale,
    ...timestamps,
  },
  (table) => [
    index("content_blocks_section_id_idx").on(table.sectionId),
    index("content_blocks_canonical_record_id_idx").on(table.canonicalRecordId),
    uniqueIndex("content_blocks_section_slug_idx").on(table.sectionId, table.slug),
  ],
);

export const glossaryTerms = pgTable(
  "glossary_terms",
  {
    id: id(),
    canonicalRecordId: uuid("canonical_record_id").references(() => canonicalRecords.id),
    term: text("term").notNull(),
    definition: text("definition").notNull(),
    example: text("example"),
    isChip: boolean("is_chip").notNull().default(false),
    status: contentStatus("status").notNull().default("draft"),
    version: integer("version").notNull().default(1),
    ...locale,
    ...timestamps,
  },
  (table) => [
    uniqueIndex("glossary_terms_term_idx").on(table.term),
    index("glossary_terms_canonical_record_id_idx").on(table.canonicalRecordId),
  ],
);

export const diagrams = pgTable(
  "diagrams",
  {
    id: id(),
    sectionId: uuid("section_id")
      .notNull()
      .references(() => sections.id),
    slug: text("slug").notNull(),
    title: text("title").notNull(),
    /** Storage path: diagrams/{section}/{version}/ — immutable per version. */
    storagePath: text("storage_path").notNull(),
    altText: text("alt_text").notNull(),
    longTextAlternative: text("long_text_alternative").notNull(),
    status: contentStatus("status").notNull().default("draft"),
    version: integer("version").notNull().default(1),
    ...locale,
    ...timestamps,
  },
  (table) => [uniqueIndex("diagrams_section_slug_idx").on(table.sectionId, table.slug)],
);

/** Immutable publish snapshots = the content audit trail (ADR-021, ADR-034 content rollback). */
export const contentVersions = pgTable(
  "content_versions",
  {
    id: id(),
    sectionId: uuid("section_id")
      .notNull()
      .references(() => sections.id),
    version: integer("version").notNull(),
    snapshot: jsonb("snapshot").notNull(),
    publishedBy: text("published_by"),
    ...timestamps,
  },
  (table) => [
    uniqueIndex("content_versions_section_version_idx").on(table.sectionId, table.version),
  ],
);

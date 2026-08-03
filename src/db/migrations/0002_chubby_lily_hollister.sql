ALTER TABLE "canonical_records" ADD COLUMN "title" text;--> statement-breakpoint
ALTER TABLE "canonical_records" ADD COLUMN "technical_definition" text;--> statement-breakpoint
ALTER TABLE "canonical_records" ADD COLUMN "why_it_matters" text;--> statement-breakpoint
ALTER TABLE "canonical_records" ADD COLUMN "examples" jsonb DEFAULT '[]'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "canonical_records" ADD COLUMN "analogies" jsonb DEFAULT '[]'::jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "canonical_records" ADD COLUMN "misconception_ids" text[] DEFAULT '{}' NOT NULL;--> statement-breakpoint
ALTER TABLE "canonical_records" ADD COLUMN "related_keys" text[] DEFAULT '{}' NOT NULL;--> statement-breakpoint
ALTER TABLE "canonical_records" ADD COLUMN "presentation_summary" text;--> statement-breakpoint
ALTER TABLE "canonical_records" ADD COLUMN "speaker_notes" text;--> statement-breakpoint
ALTER TABLE "canonical_records" ADD COLUMN "sources" text[] DEFAULT '{}' NOT NULL;--> statement-breakpoint
ALTER TABLE "canonical_records" ADD COLUMN "technical_reviewer" text;--> statement-breakpoint
ALTER TABLE "canonical_records" ADD COLUMN "educational_reviewer" text;--> statement-breakpoint
ALTER TABLE "canonical_records" ADD COLUMN "next_review_at" text;
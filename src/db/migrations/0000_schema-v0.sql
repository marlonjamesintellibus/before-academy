CREATE TYPE "public"."attempt_route" AS ENUM('lesson_first', 'assessment_first');--> statement-breakpoint
CREATE TYPE "public"."block_layer" AS ENUM('quick', 'explore', 'deeper', 'apply');--> statement-breakpoint
CREATE TYPE "public"."blueprint_category" AS ENUM('traditional_software', 'automation', 'ai_characteristics', 'combined_systems', 'classification', 'ambiguity', 'misconceptions');--> statement-breakpoint
CREATE TYPE "public"."confidence_stage" AS ENUM('pre', 'post');--> statement-breakpoint
CREATE TYPE "public"."content_status" AS ENUM('draft', 'in_review', 'published', 'archived');--> statement-breakpoint
CREATE TYPE "public"."feedback_type" AS ENUM('content_error', 'technical_issue', 'suggestion');--> statement-breakpoint
CREATE TYPE "public"."learner_role" AS ENUM('learner', 'content_admin', 'org_admin');--> statement-breakpoint
CREATE TYPE "public"."question_difficulty" AS ENUM('foundational', 'applied', 'challenging');--> statement-breakpoint
CREATE TYPE "public"."question_format" AS ENUM('multiple_choice', 'multiple_select', 'matching', 'sorting', 'scenario_decision');--> statement-breakpoint
CREATE TYPE "public"."question_kind" AS ENUM('check', 'assessment');--> statement-breakpoint
CREATE TYPE "public"."scenario_category" AS ENUM('traditional_software', 'automation', 'ai_assisted', 'combination', 'not_enough_information');--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"access_token_expires_at" timestamp with time zone,
	"refresh_token_expires_at" timestamp with time zone,
	"scope" text,
	"id_token" text,
	"password" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "learner_profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"role" "learner_role" DEFAULT 'learner' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"token" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "canonical_records" (
	"id" uuid PRIMARY KEY NOT NULL,
	"key" text NOT NULL,
	"definition" text NOT NULL,
	"status" "content_status" DEFAULT 'draft' NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"owner" text,
	"reviewed_at" text,
	"locale" text DEFAULT 'en' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "content_blocks" (
	"id" uuid PRIMARY KEY NOT NULL,
	"section_id" uuid NOT NULL,
	"canonical_record_id" uuid,
	"slug" text NOT NULL,
	"block_type" text NOT NULL,
	"layer" "block_layer" DEFAULT 'quick' NOT NULL,
	"position" integer NOT NULL,
	"body" jsonb NOT NULL,
	"category_tags" text[] DEFAULT '{}' NOT NULL,
	"status" "content_status" DEFAULT 'draft' NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"locale" text DEFAULT 'en' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "content_versions" (
	"id" uuid PRIMARY KEY NOT NULL,
	"section_id" uuid NOT NULL,
	"version" integer NOT NULL,
	"snapshot" jsonb NOT NULL,
	"published_by" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "diagrams" (
	"id" uuid PRIMARY KEY NOT NULL,
	"section_id" uuid NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"storage_path" text NOT NULL,
	"alt_text" text NOT NULL,
	"long_text_alternative" text NOT NULL,
	"status" "content_status" DEFAULT 'draft' NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"locale" text DEFAULT 'en' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "glossary_terms" (
	"id" uuid PRIMARY KEY NOT NULL,
	"canonical_record_id" uuid,
	"term" text NOT NULL,
	"definition" text NOT NULL,
	"example" text,
	"is_chip" boolean DEFAULT false NOT NULL,
	"status" "content_status" DEFAULT 'draft' NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"locale" text DEFAULT 'en' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pathways" (
	"id" uuid PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"status" "content_status" DEFAULT 'draft' NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"owner" text,
	"locale" text DEFAULT 'en' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sections" (
	"id" uuid PRIMARY KEY NOT NULL,
	"pathway_id" uuid NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"position" integer NOT NULL,
	"status" "content_status" DEFAULT 'draft' NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"owner" text,
	"locale" text DEFAULT 'en' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "question_options" (
	"id" uuid PRIMARY KEY NOT NULL,
	"question_id" uuid NOT NULL,
	"position" integer NOT NULL,
	"body" text NOT NULL,
	"is_correct" boolean DEFAULT false NOT NULL,
	"rationale" text,
	"locale" text DEFAULT 'en' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "questions" (
	"id" uuid PRIMARY KEY NOT NULL,
	"section_id" uuid NOT NULL,
	"content_id" text NOT NULL,
	"kind" "question_kind" NOT NULL,
	"format" "question_format" NOT NULL,
	"category" "blueprint_category" NOT NULL,
	"difficulty" "question_difficulty" NOT NULL,
	"stem" text NOT NULL,
	"explanation" text NOT NULL,
	"remediation_block_id" text NOT NULL,
	"learning_outcomes" text[] DEFAULT '{}' NOT NULL,
	"misconception_tags" text[] DEFAULT '{}' NOT NULL,
	"use_tags" text[] DEFAULT '{}' NOT NULL,
	"status" "content_status" DEFAULT 'draft' NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"locale" text DEFAULT 'en' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "scenarios" (
	"id" uuid PRIMARY KEY NOT NULL,
	"section_id" uuid NOT NULL,
	"content_id" text NOT NULL,
	"position" integer NOT NULL,
	"body" text NOT NULL,
	"correct_category" "scenario_category" NOT NULL,
	"accepted_categories" text[] DEFAULT '{}' NOT NULL,
	"clue" text NOT NULL,
	"ambiguity_note" text,
	"feedback" jsonb NOT NULL,
	"status" "content_status" DEFAULT 'draft' NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"locale" text DEFAULT 'en' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "attempt_answers" (
	"id" uuid PRIMARY KEY NOT NULL,
	"attempt_id" uuid NOT NULL,
	"question_id" uuid NOT NULL,
	"answer" jsonb NOT NULL,
	"correct" boolean,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "attempts" (
	"id" uuid PRIMARY KEY NOT NULL,
	"learner_id" uuid NOT NULL,
	"section_id" uuid NOT NULL,
	"number" integer NOT NULL,
	"question_ids" uuid[] NOT NULL,
	"score" integer,
	"passed" boolean,
	"categories_failed" text[] DEFAULT '{}' NOT NULL,
	"route" "attempt_route" DEFAULT 'lesson_first' NOT NULL,
	"idempotency_key" text NOT NULL,
	"content_version" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "confidence_responses" (
	"id" uuid PRIMARY KEY NOT NULL,
	"learner_id" uuid NOT NULL,
	"section_id" uuid NOT NULL,
	"stage" "confidence_stage" NOT NULL,
	"value" integer NOT NULL,
	"content_version" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "section_progress" (
	"id" uuid PRIMARY KEY NOT NULL,
	"learner_id" uuid NOT NULL,
	"section_id" uuid NOT NULL,
	"steps" jsonb NOT NULL,
	"content_version" integer NOT NULL,
	"completed" boolean DEFAULT false NOT NULL,
	"source" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "feedback_reports" (
	"id" uuid PRIMARY KEY NOT NULL,
	"type" "feedback_type" NOT NULL,
	"message" text NOT NULL,
	"route" text NOT NULL,
	"content_version" integer,
	"email" text,
	"actor_kind" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "notify_requests" (
	"id" uuid PRIMARY KEY NOT NULL,
	"target" text NOT NULL,
	"email" text NOT NULL,
	"user_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "learner_profiles" ADD CONSTRAINT "learner_profiles_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "content_blocks" ADD CONSTRAINT "content_blocks_section_id_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."sections"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "content_blocks" ADD CONSTRAINT "content_blocks_canonical_record_id_canonical_records_id_fk" FOREIGN KEY ("canonical_record_id") REFERENCES "public"."canonical_records"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "content_versions" ADD CONSTRAINT "content_versions_section_id_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."sections"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "diagrams" ADD CONSTRAINT "diagrams_section_id_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."sections"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "glossary_terms" ADD CONSTRAINT "glossary_terms_canonical_record_id_canonical_records_id_fk" FOREIGN KEY ("canonical_record_id") REFERENCES "public"."canonical_records"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sections" ADD CONSTRAINT "sections_pathway_id_pathways_id_fk" FOREIGN KEY ("pathway_id") REFERENCES "public"."pathways"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "question_options" ADD CONSTRAINT "question_options_question_id_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."questions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "questions" ADD CONSTRAINT "questions_section_id_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."sections"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scenarios" ADD CONSTRAINT "scenarios_section_id_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."sections"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attempt_answers" ADD CONSTRAINT "attempt_answers_attempt_id_attempts_id_fk" FOREIGN KEY ("attempt_id") REFERENCES "public"."attempts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attempts" ADD CONSTRAINT "attempts_learner_id_learner_profiles_id_fk" FOREIGN KEY ("learner_id") REFERENCES "public"."learner_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "attempts" ADD CONSTRAINT "attempts_section_id_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."sections"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "confidence_responses" ADD CONSTRAINT "confidence_responses_learner_id_learner_profiles_id_fk" FOREIGN KEY ("learner_id") REFERENCES "public"."learner_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "confidence_responses" ADD CONSTRAINT "confidence_responses_section_id_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."sections"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "section_progress" ADD CONSTRAINT "section_progress_learner_id_learner_profiles_id_fk" FOREIGN KEY ("learner_id") REFERENCES "public"."learner_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "section_progress" ADD CONSTRAINT "section_progress_section_id_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."sections"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "learner_profiles_user_id_idx" ON "learner_profiles" USING btree ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "canonical_records_key_idx" ON "canonical_records" USING btree ("key");--> statement-breakpoint
CREATE INDEX "content_blocks_section_id_idx" ON "content_blocks" USING btree ("section_id");--> statement-breakpoint
CREATE INDEX "content_blocks_canonical_record_id_idx" ON "content_blocks" USING btree ("canonical_record_id");--> statement-breakpoint
CREATE UNIQUE INDEX "content_blocks_section_slug_idx" ON "content_blocks" USING btree ("section_id","slug");--> statement-breakpoint
CREATE UNIQUE INDEX "content_versions_section_version_idx" ON "content_versions" USING btree ("section_id","version");--> statement-breakpoint
CREATE UNIQUE INDEX "diagrams_section_slug_idx" ON "diagrams" USING btree ("section_id","slug");--> statement-breakpoint
CREATE UNIQUE INDEX "glossary_terms_term_idx" ON "glossary_terms" USING btree ("term");--> statement-breakpoint
CREATE INDEX "glossary_terms_canonical_record_id_idx" ON "glossary_terms" USING btree ("canonical_record_id");--> statement-breakpoint
CREATE UNIQUE INDEX "pathways_slug_idx" ON "pathways" USING btree ("slug");--> statement-breakpoint
CREATE UNIQUE INDEX "sections_pathway_slug_idx" ON "sections" USING btree ("pathway_id","slug");--> statement-breakpoint
CREATE INDEX "sections_pathway_id_idx" ON "sections" USING btree ("pathway_id");--> statement-breakpoint
CREATE INDEX "question_options_question_id_idx" ON "question_options" USING btree ("question_id");--> statement-breakpoint
CREATE UNIQUE INDEX "questions_content_id_idx" ON "questions" USING btree ("content_id");--> statement-breakpoint
CREATE INDEX "questions_section_kind_category_idx" ON "questions" USING btree ("section_id","kind","category");--> statement-breakpoint
CREATE UNIQUE INDEX "scenarios_content_id_idx" ON "scenarios" USING btree ("content_id");--> statement-breakpoint
CREATE INDEX "scenarios_section_id_idx" ON "scenarios" USING btree ("section_id");--> statement-breakpoint
CREATE INDEX "attempt_answers_attempt_id_idx" ON "attempt_answers" USING btree ("attempt_id");--> statement-breakpoint
CREATE UNIQUE INDEX "attempts_idempotency_key_idx" ON "attempts" USING btree ("idempotency_key");--> statement-breakpoint
CREATE INDEX "attempts_learner_section_number_idx" ON "attempts" USING btree ("learner_id","section_id","number");--> statement-breakpoint
CREATE INDEX "confidence_responses_learner_section_idx" ON "confidence_responses" USING btree ("learner_id","section_id");--> statement-breakpoint
CREATE UNIQUE INDEX "section_progress_learner_section_idx" ON "section_progress" USING btree ("learner_id","section_id");--> statement-breakpoint
CREATE INDEX "feedback_reports_route_idx" ON "feedback_reports" USING btree ("route");--> statement-breakpoint
CREATE INDEX "notify_requests_target_idx" ON "notify_requests" USING btree ("target");
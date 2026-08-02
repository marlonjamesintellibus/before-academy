-- Custom SQL migration file, put your code below! --

-- RLS deny-all backstop (docs/engineering/security.md, ADR-024).
-- The app connects with the service role and authorizes in withAction();
-- enabling RLS with no policies denies Supabase's anon/authenticated API
-- roles everything. Defense in depth, not the authorization mechanism.

ALTER TABLE "pathways" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "sections" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "content_blocks" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "canonical_records" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "glossary_terms" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "diagrams" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "content_versions" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "questions" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "question_options" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "scenarios" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "section_progress" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "attempts" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "attempt_answers" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "confidence_responses" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "learner_profiles" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "feedback_reports" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "notify_requests" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "user" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "session" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "account" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "verification" ENABLE ROW LEVEL SECURITY;

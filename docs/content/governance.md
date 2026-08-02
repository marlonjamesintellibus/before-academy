---
title: Content Governance
category: content
owner: content-owner
status: approved
related: [../engineering/content-engine.md, ../adr/adr-027-pr-seed-publishing.md]
last_updated: 2026-07-31
---

# Content Governance

Lifecycle: **Planned → Drafting → Technical review (SME) → Educational review → Approval (content owner) → Published (merge = record) → Monitored → Updated or Archived.** Operationalized as PR review on seed JSON (ADR-027): merge is the approval record; publish script versions + snapshots.

## Minimum reviewers by item class
Lesson blocks + diagram text: SME + education lead · Questions + scenarios: SME + instructional reviewer · Glossary/canonical definitions: SME + education lead + content-owner sign-off · Feedback copy: education lead. Every item carries owner, reviewers, status, version, review dates.

## QA gates
**Automated (content-lint, in CI):** required fields, readability range, alt/long text present, remediation links resolve, blueprint coverage, banned words. **Human:** standalone test on Quick layers, analogy boundary stated, feedback-formula compliance, misconception references by ID, terminology discipline.

## Changes, corrections, archiving
Learner reports (S13b) + analytics flags open content issues; content owner triages weekly. Factual errors take the expedited path: publish within 48h, version bump, change log. Superseded content archives with its replacement noted - never deleted. Content analytics thresholds (review triggers): scenario first-attempt accuracy <40% or >95%; "Not enough information" chosen when evidence sufficed; the 6/7 pair monitored for order effects.

## Related Documents
- [../engineering/content-engine.md](../engineering/content-engine.md) - the pipeline enforcing this
- [../roadmap/dependencies.md](../roadmap/dependencies.md) - D4 content-approval gates

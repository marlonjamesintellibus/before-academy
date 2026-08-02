---
title: Content Engine
category: engineering
owner: engineering-lead
status: approved
depends_on: [database.md, ../content/knowledge-model.md]
related: [../adr/adr-027-pr-seed-publishing.md]
last_updated: 2026-07-31
---

# Content Engine

Implements the canonical-record model ([../content/knowledge-model.md](../content/knowledge-model.md)): one approved record per concept; blocks, questions, scenarios, glossary, diagram text, and the presentation export all reference it.

## Blocks & rendering
A section is an ordered list of typed blocks (hook, why_it_matters, objectives, concept ×4 with quick/explore/deeper bodies, diagram, misconception, activity_intro, takeaway, next_step). Bodies are portable rich-text JSON (paragraphs, emphasis, lists, glossary marks) — never raw HTML (the content model is the XSS defense). Pipeline: resolve slugs → one query loads published section + blocks + records → block-type → renderer map (pure components in `features/content/components`). Glossary marks resolve at render time; chips get definitions as props.

## Authoring & publishing (Phase 1 — ADR-027)
Content lives as reviewed JSON in `db/seed/content`; the Git PR **is** the governance approval record (writer → SME/education review → merge). An idempotent publish script bumps version, snapshots to content_versions, sets published, and calls `revalidatePath`. Preview envs may render `in_review` behind APP_ENV. Content-lint gates the pipeline: required fields, readability range, alt/long text present, remediation links resolve, blueprint coverage, banned-word list.

## Status flow & rollback
draft → in_review → published → archived. Only published renders. Content rollback = republish a prior content_versions snapshot (version flip) — never a code deploy.

## Diagrams & localization readiness
SVG-first in Storage at `diagrams/{section}/{version}/`, immutable per version; `diagrams` rows ([database.md](database.md)) carry alt_text + the long text alternative (versions with the diagram). All learner-facing content tables carry `locale` (default 'en', per database.md conventions); no runtime i18n ships — the reserved shape prevents a schema rewrite. UI strings live in one `strings.ts` mirroring [../product/ux-copy.md](../product/ux-copy.md).

## Related Documents
- [../content/governance.md](../content/governance.md) — the review lifecycle this pipeline implements
- [../implementation/add-a-lesson.md](../implementation/add-a-lesson.md)

---
title: Naming Conventions
category: shared
owner: engineering-lead
status: approved
used_by: [engineering, roadmap]
related: [../engineering/standards.md, ../engineering/database.md]
last_updated: 2026-07-31
---

# Naming Conventions

| Domain | Rule | Example |
|---|---|---|
| Files/folders | kebab-case | `feedback-panel.tsx` |
| Components | PascalCase export, `{Component}Props` | `FeedbackPanel` |
| Hooks | `use` prefix | `useDeviceStore` |
| Server action files | `actions.ts` per feature | `features/assessment/actions.ts` |
| Branches | `{type}/{story-id}-{slug}` | `feat/BA-2.3.1-depth-panels` |
| Database | snake_case, plural tables, `{entity}_id` FKs, uuid v7 ids | `section_progress` |
| Analytics events | `object_action` snake_case, typed constants in `lib/analytics/events.ts` | `assessment_submitted` |
| Device storage keys | `ba.v1.*`, schema-versioned payloads | `ba.v1.progress` |
| Backlog | `BA-M{n}` epic → `BA-{n}.{f}` feature → `BA-{n}.{f}.{s}` story | `BA-3.1.2` |
| ADRs | `adr-{nnn}-{slug}.md`, new ones from 042 | `adr-024-app-layer-authorization.md` |
| Tests | colocated `{file}.test.ts`; E2E `j{n}-{slug}.spec.ts` | `j1-standard-route.spec.ts` |

Route segments match screen routes exactly ([../product/information-architecture.md](../product/information-architecture.md)); a rename is a cross-doc change.

## Related Documents
- [../engineering/standards.md](../engineering/standards.md)

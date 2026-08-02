---
title: Delivery Process (DoR, DoD, QA, Releases)
category: roadmap
owner: engineering-lead
status: approved
related: [../engineering/testing.md, ../engineering/standards.md]
last_updated: 2026-07-31
---

# Delivery Process

## Flow
Trunk-based: story branches ≤3 days (`{type}/{story-id}-{slug}`), one story per PR (~≤400 lines), squash to main, CI green + one review. Merge → staging auto-deploy; release tag → production. Preview deploys serve design/content review. Milestones are planning increments - never branches. Vertical slicing: a story crosses UI → action → data (+ events, + a11y) as one unit.

## Definition of Ready
Spec-refs resolve and answer the behaviour questions (gaps get labelled recommendations approved by the owning lead) · content dependency satisfied (or explicitly renders flagged drafts for preview) · acceptance criteria written (Given/When/Then) · dependencies green, consumed interfaces frozen · analytics + a11y expectations named from spec · sized ≤3 days.

## Definition of Done (global - every story)
1. Implemented per spec-refs; deviations = ADR. 2. PR reviewed + merged; CI fully green. 3. Tests at the right layer. 4. A11y behaviours verified for the touched surface. 5. Events implemented via `events.ts` and observed once. 6. Docs updated where contracts changed. 7. Staging-verified against acceptance by someone other than the implementer. 8. Product/education sign-off for learner-visible copy or learning behaviour.

## QA inside milestones
Test tasks live in the same milestone; automated layers per [../engineering/testing.md](../engineering/testing.md); each milestone closes with a scripted staging walkthrough. Cumulative regression: journeys accumulate; M9 runs everything + manual passes. Content QA gates the seed pipeline like code tests gate merges. User testing: concept checks with beginners during M2; moderated usability M8–M9; pilot analytics M9. Severity-1 comprehension failures interrupt the current milestone; everything else routes to the M9 revision cycle.

## Release ladder
Preview (every PR) → Staging (every merge) → Internal (milestone exits, sign-offs) → Beta (M8, moderated participants) → Pilot (M9, production, controlled beginners) → Public (post-Phase-1 leadership decision, outside this roadmap). Rollback: code = image revert; content = version flip; both rehearsed in M9. Pilot incidents: sev-1 → immediate rollback + comms; sev-2 → fix-forward ≤48h.

## Related Documents
- [../implementation/README.md](../implementation/README.md) - AI workflow + checkpoints

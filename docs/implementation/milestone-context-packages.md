---
title: "Workflow: Milestone Context Packages"
category: implementation
owner: engineering-lead
status: approved
last_updated: 2026-07-31
---

# Milestone Context Packages

Per-milestone context lives at `docs/context/m{n}.md` (created when the milestone starts). A package contains: the milestone's row + notes from [../roadmap/milestones.md](../roadmap/milestones.md) · its backlog slice from [../roadmap/backlog.md](../roadmap/backlog.md) · links (not copies) to the docs its stories implement · the interfaces it consumes that are frozen (e.g., D3 content schema, D5 ProgressSnapshot).

**Agent loop per story:** load the package → pick the top Ready story → restate acceptance criteria → plan files → implement vertically → self-check DoD ([../roadmap/delivery-process.md](../roadmap/delivery-process.md)) → PR with spec citations → stop at human checkpoints.

**Prompt shapes:**
- Implement: "Load docs/context/m3.md. Implement BA-3.1.2 (scenario feedback panel). Follow engineering/standards.md and the DoD. Acceptance: [paste]. Plan first; list files; then implement with tests."
- Review: "Review this diff against product/screens/activity-and-check.md and content/feedback.md. Flag spec deviations, missing events, a11y gaps. No restyling; no scope."
- Refactor: "Within features/assessment only, reduce duplication introduced during M4. No behaviour change; tests stay green; note anything needing an ADR."

## Related Documents
- [../roadmap/milestones.md](../roadmap/milestones.md) — the milestone definitions packages slice
- [../engineering/standards.md](../engineering/standards.md) — always-loaded conventions

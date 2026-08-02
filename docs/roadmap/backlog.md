---
title: Backlog Structure
category: roadmap
owner: product-owner
status: approved
related: [../shared/naming-conventions.md]
last_updated: 2026-07-31
---

# Backlog

Hierarchy: **Epic (BA-M{n}) → Feature (BA-{n}.{f}) → Story (BA-{n}.{f}.{s}) → tasks inside the story** (eng/QA/content/docs — no orphan testing epics). Stories phrased as capability; every story carries ≥1 spec-ref label (a story with none is a scope alarm). Board columns: Backlog → Ready → In progress → In review → Verified (staging) → Done.

## Epic → feature map
- **BA-M0 Foundation:** 0.1 repo & CI · 0.2 environments · 0.3 data layer · 0.4 design foundation · 0.5 lib core
- **BA-M1 Shell:** 1.1 layout & chrome · 1.2 routes (S01/S02/shell/404) · 1.3 responsive & motion · 1.4 analytics init
- **BA-M2 Lesson:** 2.1 content engine · 2.2 publish pipeline + lint · 2.3 S03 experience · 2.4 lesson analytics
- **BA-M3 Interaction:** 3.1 activity player · 3.2 feedback system · 3.3 knowledge check · 3.4 interaction analytics
- **BA-M4 Assessment:** 4.1 attempt service · 4.2 scoring · 4.3 attempt UX · 4.4 results & remediation · 4.5 analytics
- **BA-M5 Guest:** 5.1 device store · 5.2 resume · 5.3 guest attempt tokens · 5.4 completion states · 5.5 anonymous identity
- **BA-M6 Auth:** 6.1 BetterAuth · 6.2 auth UX · 6.3 conversion · 6.4 migration · 6.5 dashboard · 6.6 saveProgress
- **BA-M7 Analytics:** 7.1 server capture · 7.2 event audit · 7.3 funnels & dashboards · 7.4 errors & alerts · 7.5 web-vitals
- **BA-M8 Quality:** 8.1 a11y audit & fixes · 8.2 performance · 8.3 responsive sweep · 8.4 copy consistency
- **BA-M9 Launch:** 9.1 regression & security · 9.2 ops readiness · 9.3 production release · 9.4 pilot · 9.5 revision cycle · 9.6 completion report

## Related Documents
- [milestones.md](milestones.md) — what each epic must exit with

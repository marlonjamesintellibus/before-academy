---
title: Information Architecture, Routes & Navigation
category: product
owner: product-designer
status: approved
used_by: [engineering/frontend.md, screens]
related: [../adr/adr-011-step-per-url.md]
last_updated: 2026-07-31
---

# Information Architecture, Routes & Navigation

## Route table
| Route | Screen | Auth | Notes |
|---|---|---|---|
| `/` | S01 Home | Public | Canonical entry; CTA deep-links to lesson |
| `/learn` | S02 Pathway Overview | Public | The **AI Awareness pathway** overview, not a pathway index: Section 1 enabled, future sections "Coming soon" |
| `/learn/ai-awareness/ai-automation-software` | S03 Lesson | Public | Resumable scroll for guests |
| `…/activity` | S04 Sort the System | Public | Deep-linkable; no prior step required |
| `…/check` | S05 Knowledge Check | Public | 4 questions, immediate feedback |
| `…/assessment` | S06/S07 | Public | Intro state → attempt state (nav-guarded) |
| `…/assessment/results` | S08 Results | Public | Pass/fail states; fail links to review |
| `…/review?categories=` | S09 Remediation | Public | Filtered lesson by failed category |
| `/auth/sign-up`, `/auth/sign-in` | S10 | Public | return-to redirect; migration on success |
| `/dashboard` | S11 | Registered | Guests redirected with toast |
| `/learn#next` | S12 Next-Step Preview | Public | Anchor on S02 |

Steps are **nested routes, not page sections** (ADR-011): deep-linkable remediation and assessment-first entry, predictable back button, clean funnels.

## Navigation model
- **Global header:** wordmark → Home; "Learn" → /learn; right side: guest = "Sign in" link + "Create free account" secondary; registered = avatar menu (Dashboard, Settings, Sign out). During assessment attempts the header collapses to wordmark + "Exit assessment" (minimal chrome).
- **Singular by design.** Phase 1 ships one pathway ([vision-and-scope.md](vision-and-scope.md): other pathways are out of scope), so no chrome may use the plural. Nav reads "Learn" because it names a destination and survives the change; breadcrumbs read "AI Awareness" because they name the section's actual parent. A "Pathways" label promising a list the page cannot show was the defect this replaced.
- **When a second pathway is defined**, promote `/learn` to a genuine index listing pathways, move this overview to `/learn/ai-awareness`, and restore the plural label. The `/learn/[pathway]/[section]` route shape already supports it, so no re-architecting is required. The trigger is a *defined* second pathway: the long-term seven-level arc is named in vision-and-scope.md but its pathways are not specified anywhere, and an index must never invent curriculum.
- **Lesson-local:** desktop ≥1024px = sticky left ToC rail with step state icons; mobile = sticky progress bar + "Contents" sheet + horizontal stepper. A **Continue** button ends every content block.
- **Breadcrumbs:** lesson/step screens only; mobile shows parent level only; `nav aria-label="Breadcrumb"`.
- **Deep links:** all step routes shareable; unknown routes → 404 with Home + lesson links; post-auth returns via return-to with migration first.

## Related Documents
- [screens/README.md](screens/README.md)
- [../engineering/frontend.md](../engineering/frontend.md) - rendering strategy per route

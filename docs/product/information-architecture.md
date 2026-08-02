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
| `/learn` | S02 Pathway Overview | Public | Section 1 enabled; future sections "Coming soon" |
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
- **Global header:** wordmark → Home; "Pathways" → /learn; right side: guest = "Sign in" link + "Create free account" secondary; registered = avatar menu (Dashboard, Settings, Sign out). During assessment attempts the header collapses to wordmark + "Exit assessment" (minimal chrome).
- **Lesson-local:** desktop ≥1024px = sticky left ToC rail with step state icons; mobile = sticky progress bar + "Contents" sheet + horizontal stepper. A **Continue** button ends every content block.
- **Breadcrumbs:** lesson/step screens only; mobile shows parent level only; `nav aria-label="Breadcrumb"`.
- **Deep links:** all step routes shareable; unknown routes → 404 with Home + lesson links; post-auth returns via return-to with migration first.

## Related Documents
- [screens/README.md](screens/README.md)
- [../engineering/frontend.md](../engineering/frontend.md) - rendering strategy per route

---
title: "Screens: Auth & Dashboard (S10–S11)"
category: product
owner: product-designer
status: approved
depends_on: [../../engineering/auth.md]
related: [../../engineering/auth.md]
last_updated: 2026-07-31
---

# S10 Sign Up / Sign In · S11 Dashboard

## S10 auth (`/auth/*`)
Single card: email + password (visibility toggle, inline on-blur validation) **or** one OAuth button (Google). Contextual benefit line from the trigger ("Your Section 1 progress will be saved"). Equal-weight **Continue as guest** returns to prior route. Labels always visible (no placeholder-as-label); errors via `aria-describedby`; submit disabled only while in flight. Success: migration (≤2s spinner) → "Progress saved to your account" toast → return-to redirect. Abandon: prior route, guest progress intact.
Events: `auth_viewed(trigger)`, `auth_completed(method)`, `auth_abandoned`, `progress_migrated`.

## S11 dashboard (`/dashboard`, registered only)
"Continue learning" card on top (Coursera resume pattern); Section 1 status card with per-step states; assessment history (date, score, outcome); next-step preview. Empty state: friendly prompt into the lesson (~20 minutes). Guests hitting the route are redirected to `/` with an explanation toast.
Events: `dashboard_viewed`, `dashboard_continue_clicked`, `history_item_expanded`.

### Account management
An account menu (header, registered only) offers **Sign out** and **Delete account**. Delete opens the S13e confirmation modal ([modals.md](modals.md)); on confirm the client calls `deleteAccount` ([../../engineering/api-contracts.md](../../engineering/api-contracts.md)), then signs out and redirects to `/` with a "Your account and data have been deleted" toast. Deletion is permanent (ADR-022 hard delete) and the modal says so plainly.
Events: `account_deletion_started`, `account_deleted`.

## Related Documents
- [../personas-and-journeys.md](../personas-and-journeys.md) - J3 conversion flow
- [../../engineering/auth.md](../../engineering/auth.md) - BetterAuth, sessions, migration

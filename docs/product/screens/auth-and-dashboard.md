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

## Build status: simulated session until M6

Both screens are built and testable ahead of BetterAuth, against the simulated session in `src/lib/preview-session.ts`. What that is and is not:

- It is a stand-in for the **provider**, not for authorization. The session lives in device storage, anyone can write it, and no server action trusts it. Actor resolution ([../../engineering/auth.md](../../engineering/auth.md)) is untouched, so a simulated session grants access to nothing.
- It is **off unless `NEXT_PUBLIC_PREVIEW_AUTH=1`**, and hard-blocked whenever `APP_ENV=production`. `/dashboard` returns 404 and `/auth/*` stays the coming-soon placeholder in production, so the pilot runs guest-only exactly as planned.
- There is **no password field**. A fake one would train testers to type real credentials into device storage and would prove nothing. The real S10 card below is built at M6.
- The session shape mirrors BetterAuth's, and consumers read it through `usePreviewSession()`, which subscribes to a change event the way a real auth client's session store does. M6 replaces the three functions in that module and the screens do not change.
- Attempt history shows the latest graded attempt only, because that is all device storage holds. A full history needs the account it is waiting on, and the screen says so rather than faking rows.

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

/**
 * account feature public API. Cross-feature imports go through this index only
 * (lint-enforced, docs/engineering/repository.md).
 *
 * Everything here runs against the simulated session in lib/preview-session.ts
 * until BetterAuth lands at M6; the screens are built to the S10/S11 spec so
 * the milestone swaps the provider, not the UI.
 */
export { AccountMenu } from "./components/account-menu";
export { DashboardView } from "./components/dashboard-view";
export { PreviewSignIn } from "./components/preview-sign-in";
export { usePreviewSession } from "./use-preview-session";

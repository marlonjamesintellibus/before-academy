"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOutPreview } from "@/lib/preview-session";
import { strings } from "@/lib/strings";
import { usePreviewSession } from "../use-preview-session";

/**
 * Header account area (docs/product/screens/auth-and-dashboard.md). Guests see
 * the sign-in pair; a signed-in learner sees their dashboard link and sign out.
 *
 * Delete account is deliberately absent: it needs the deleteAccount server
 * action (ADR-022 hard delete), and a simulated session must never offer a
 * destructive control it cannot actually perform.
 *
 * Until the session hydrates this renders the guest links, which is what the
 * server rendered, so there is no hydration mismatch and no layout shift for
 * the overwhelmingly common guest case.
 */
export function AccountMenu({ enabled }: { enabled: boolean }) {
  const { session } = usePreviewSession();
  const router = useRouter();

  // `enabled` is resolved in the layout, a server component, so it sees the
  // real APP_ENV. Without it a production build with the flag mistakenly set
  // would offer a Dashboard link to a route that 404s.
  if (!enabled || !session) {
    return (
      <>
        <Link
          href="/auth/sign-in"
          className="inline-flex min-h-11 items-center whitespace-nowrap text-body text-sky hover:text-surface-card"
        >
          {strings.actions.signIn}
        </Link>
        <Link
          href="/auth/sign-up"
          className="whitespace-nowrap rounded-(--radius-control) bg-primary px-4 py-2 text-body font-semibold text-surface-card transition-colors duration-(--duration-state) hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky"
        >
          {strings.actions.createAccount}
        </Link>
      </>
    );
  }

  return (
    <>
      <Link
        href="/dashboard"
        className="inline-flex min-h-11 items-center whitespace-nowrap text-body text-sky underline-offset-8 hover:text-surface-card hover:underline hover:decoration-2"
      >
        {strings.account.dashboard}
      </Link>
      <span className="hidden text-caption text-sky sm:inline">{session.user.email}</span>
      <button
        type="button"
        onClick={() => {
          signOutPreview();
          router.push("/");
          router.refresh();
        }}
        className="inline-flex min-h-11 items-center whitespace-nowrap rounded-(--radius-control) border border-sky/40 px-4 py-2 text-body font-medium text-sky transition-colors duration-(--duration-state) hover:border-sky hover:text-surface-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky"
      >
        {strings.account.signOut}
      </button>
    </>
  );
}

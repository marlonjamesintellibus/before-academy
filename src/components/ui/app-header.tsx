import Link from "next/link";
import { strings } from "@/lib/strings";

/**
 * AppHeader (docs/product/components.md, information-architecture.md):
 * wordmark → Home; Pathways → /learn; guest right side = Sign in + Create free
 * account. Minimal (assessment) and Registered variants land with their
 * milestones. nav landmark; the skip link in the root layout precedes it.
 */
export interface AppHeaderProps {
  variant?: "default" | "minimal";
}

export function AppHeader({ variant = "default" }: AppHeaderProps) {
  return (
    <header className="border-b border-surface-alt">
      <nav
        aria-label="Main"
        className="mx-auto flex min-h-14 w-full max-w-[1440px] items-center gap-6 px-4 md:px-6"
      >
        <Link href="/" className="text-subheading font-bold text-ink hover:text-primary">
          Before Academy
        </Link>
        {variant === "default" ? (
          <>
            <Link href="/learn" className="text-body text-ink-muted hover:text-primary">
              Pathways
            </Link>
            <span className="flex-1" />
            <Link href="/auth/sign-in" className="text-body text-ink-muted hover:text-primary">
              {strings.actions.signIn}
            </Link>
            <Link
              href="/auth/sign-up"
              className="rounded-(--radius-control) border border-primary px-3 py-1.5 text-body font-semibold text-primary hover:bg-highlight"
            >
              {strings.actions.createAccount}
            </Link>
          </>
        ) : null}
      </nav>
    </header>
  );
}

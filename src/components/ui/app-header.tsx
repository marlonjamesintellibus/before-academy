import Link from "next/link";
import { strings } from "@/lib/strings";

/**
 * AppHeader (docs/product/components.md, design-system v3): navy shell frames
 * the learning surface. Wordmark → Home; Pathways → /learn; guest right side =
 * Sign in + Create free account. nav landmark; skip link in layout precedes.
 */
export interface AppHeaderProps {
  variant?: "default" | "minimal";
}

export function AppHeader({ variant = "default" }: AppHeaderProps) {
  return (
    <header className="bg-navy">
      <nav
        aria-label="Main"
        className="mx-auto flex min-h-16 w-full max-w-[1280px] flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 md:px-6"
      >
        <Link
          href="/"
          className="whitespace-nowrap font-display text-subheading font-bold text-surface-card hover:text-sky"
        >
          Before Academy
          <span aria-hidden="true" className="text-sky">
            .
          </span>
        </Link>
        {variant === "default" ? (
          <>
            <Link
              href="/learn"
              className="inline-flex min-h-11 items-center text-body font-medium text-sky underline-offset-8 hover:text-surface-card hover:underline hover:decoration-2"
            >
              Pathways
            </Link>
            <span className="flex-1" />
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
        ) : null}
      </nav>
    </header>
  );
}

import Link from "next/link";
import { strings } from "@/lib/strings";

/**
 * AppHeader (docs/product/components.md, information-architecture.md):
 * wordmark → Home; Pathways → /learn; guest right side = Sign in + Create free
 * account. Serif wordmark with the terracotta full stop is the brand mark
 * (design-system v2). nav landmark; the skip link in the root layout precedes.
 */
export interface AppHeaderProps {
  variant?: "default" | "minimal";
}

export function AppHeader({ variant = "default" }: AppHeaderProps) {
  return (
    <header className="border-b-2 border-ink/80 bg-surface">
      <nav
        aria-label="Main"
        className="mx-auto flex min-h-16 w-full max-w-[1440px] items-center gap-6 px-4 md:px-6"
      >
        <Link
          href="/"
          className="font-display text-subheading font-bold text-ink hover:text-primary"
        >
          Before Academy
          <span aria-hidden="true" className="text-accent">
            .
          </span>
        </Link>
        {variant === "default" ? (
          <>
            <Link
              href="/learn"
              className="text-body font-medium text-ink-muted underline-offset-8 hover:text-ink hover:underline hover:decoration-accent hover:decoration-2"
            >
              Pathways
            </Link>
            <span className="flex-1" />
            <Link href="/auth/sign-in" className="text-body text-ink-muted hover:text-ink">
              {strings.actions.signIn}
            </Link>
            <Link
              href="/auth/sign-up"
              className="rounded-(--radius-control) border-2 border-ink px-3 py-1.5 text-body font-semibold text-ink shadow-[2px_2px_0_rgba(22,22,31,0.9)] transition-all duration-(--duration-state) hover:-translate-y-0.5 hover:bg-highlight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {strings.actions.createAccount}
            </Link>
          </>
        ) : null}
      </nav>
    </header>
  );
}

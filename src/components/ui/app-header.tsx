import type { ReactNode } from "react";
import Link from "next/link";

/**
 * AppHeader (docs/product/components.md, design-system v3): navy shell frames
 * the learning surface. Wordmark → Home; Learn → /learn (singular: /learn is
 * the AI Awareness pathway overview, not an index - see
 * information-architecture.md). nav landmark; skip link in layout precedes.
 *
 * The account area arrives as a slot because the import layering is
 * app → features → lib (repository.md): this component cannot reach the
 * account feature, so the layout passes it in.
 */
export interface AppHeaderProps {
  variant?: "default" | "minimal";
  /** Right-hand account area; the layout supplies it from the account feature. */
  accountSlot?: ReactNode;
}

export function AppHeader({ variant = "default", accountSlot }: AppHeaderProps) {
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
              Learn
            </Link>
            <span className="flex-1" />
            {accountSlot}
          </>
        ) : null}
      </nav>
    </header>
  );
}

import Link from "next/link";

/**
 * AppFooter (docs/product/components.md, design-system v3): navy shell close.
 * About/Report a problem (S13b modal lands at its milestone - mailto until then).
 */
export function AppFooter() {
  return (
    <footer className="mt-auto bg-navy">
      <div className="mx-auto flex w-full max-w-[1280px] flex-wrap items-center gap-x-6 gap-y-2 px-4 py-6 text-caption text-sky md:px-6">
        <span className="font-display text-body font-semibold text-surface-card">
          Before Academy
          <span aria-hidden="true" className="text-sky">
            .
          </span>
        </span>
        <span className="flex-1" />
        <Link href="/learn" className="inline-flex min-h-11 items-center hover:text-surface-card">
          Learn
        </Link>
        <a
          href="mailto:feedback@intellibus.com"
          className="inline-flex min-h-11 items-center hover:text-surface-card"
        >
          Report a problem
        </a>
      </div>
    </footer>
  );
}

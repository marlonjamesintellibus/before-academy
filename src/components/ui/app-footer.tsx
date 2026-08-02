import Link from "next/link";

/**
 * AppFooter (docs/product/components.md): contentinfo landmark; About,
 * Report a problem (S13b feedback modal lands at its milestone - mailto
 * placeholder until then), Privacy.
 */
export function AppFooter() {
  return (
    <footer className="mt-auto border-t-2 border-ink/80 bg-surface-alt">
      <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center gap-x-6 gap-y-2 px-4 py-6 text-caption text-ink-muted md:px-6">
        <span className="font-display text-body font-semibold text-ink">
          Before Academy
          <span aria-hidden="true" className="text-accent">
            .
          </span>
        </span>
        <span className="flex-1" />
        <Link href="/learn" className="hover:text-ink">
          Pathways
        </Link>
        <a href="mailto:feedback@intellibus.com" className="hover:text-ink">
          Report a problem
        </a>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { Fragment } from "react";

/**
 * Breadcrumbs (docs/product/components.md): lesson/step screens only;
 * mobile shows parent level only; nav aria-label="Breadcrumb"; aria-current
 * on the current page.
 */
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const parent = items.length > 1 ? items[items.length - 2] : undefined;
  return (
    <nav aria-label="Breadcrumb" className="text-caption text-ink-muted">
      {/* Mobile: parent level only */}
      {parent?.href ? (
        <Link href={parent.href} className="hover:text-primary md:hidden">
          ← {parent.label}
        </Link>
      ) : null}
      <ol className="hidden items-center gap-2 md:flex">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;
          return (
            <Fragment key={item.label}>
              {index > 0 ? <li aria-hidden="true">/</li> : null}
              <li>
                {isCurrent || !item.href ? (
                  <span aria-current={isCurrent ? "page" : undefined} className="text-ink">
                    {item.label}
                  </span>
                ) : (
                  <Link href={item.href} className="hover:text-primary">
                    {item.label}
                  </Link>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

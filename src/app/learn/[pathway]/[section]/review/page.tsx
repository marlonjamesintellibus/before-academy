import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { TrackOnMount } from "@/components/track";
import type { AssessmentCategory } from "@/features/assessment";
import { CATEGORY_DISPLAY, REMEDIATION_TARGETS } from "@/features/assessment";
import { LESSON_ROUTE, PATHWAY_SLUG, SECTION_SLUG } from "@/lib/routes";
import { strings } from "@/lib/strings";

export const metadata: Metadata = { title: "Review" };

interface ReviewPageProps {
  params: Promise<{ pathway: string; section: string }>;
  searchParams: Promise<{ categories?: string }>;
}

/**
 * S09 remediation (docs/product/screens/assessment.md): filtered review by
 * failed category, deep-linkable (?categories=), retake bar. Never punitive.
 */
export default async function ReviewPage({ params, searchParams }: ReviewPageProps) {
  const { pathway, section } = await params;
  if (pathway !== PATHWAY_SLUG || section !== SECTION_SLUG) notFound();
  const { categories } = await searchParams;

  const valid = Object.keys(CATEGORY_DISPLAY) as AssessmentCategory[];
  const requested = (categories ?? "")
    .split(",")
    .filter((entry): entry is AssessmentCategory => valid.includes(entry as AssessmentCategory));
  const toReview = requested.length > 0 ? requested : valid;

  return (
    <main id="main" className="mx-auto w-full max-w-[680px] flex-1 px-4 py-8">
      <TrackOnMount event="remediation_viewed" />
      <Breadcrumbs
        items={[
          { label: "Pathways", href: "/learn" },
          { label: strings.pathway.sectionOneTitle, href: LESSON_ROUTE },
          { label: "Review" },
        ]}
      />
      <h1 className="mt-6 text-display font-bold">What to review</h1>
      <p className="mt-3 text-body text-ink-muted">
        Focused review for the areas that need it. Retake when you&rsquo;re ready - the questions
        will be different.
      </p>

      <ul className="mt-8 flex flex-col gap-4">
        {toReview.map((category) => (
          <li key={category} className="rounded-(--radius-control) border border-surface-alt p-5">
            <h2 className="text-subheading font-semibold">{CATEGORY_DISPLAY[category]}</h2>
            <ul className="mt-2 flex flex-col gap-1">
              {REMEDIATION_TARGETS[category].map((target) => (
                <li key={target.href}>
                  <Link
                    href={`${LESSON_ROUTE}${target.href}`}
                    className="text-body text-primary underline-offset-4 hover:underline"
                  >
                    {target.label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Link
          href={`${LESSON_ROUTE}/assessment`}
          className="inline-flex min-h-11 items-center rounded-(--radius-control) bg-primary px-5 py-2.5 text-body font-semibold text-surface hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Retake assessment
        </Link>
      </div>
    </main>
  );
}

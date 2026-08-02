import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { RemediationReview } from "@/features/assessment/components/remediation-review";
import type { AssessmentCategory } from "@/features/assessment";
import { CATEGORY_DISPLAY } from "@/features/assessment";
import { LESSON_ROUTE, PATHWAY_SLUG, SECTION_SLUG } from "@/lib/routes";
import { strings } from "@/lib/strings";

export const metadata: Metadata = { title: "Review" };

interface ReviewPageProps {
  params: Promise<{ pathway: string; section: string }>;
  searchParams: Promise<{ categories?: string; m?: string }>;
}

/**
 * S09 remediation (docs/product/screens/assessment.md): misconception-routed
 * review by failed category (?categories=) and probed misconceptions (?m=),
 * deep-linkable, with the pinned retake bar. Never punitive.
 */
export default async function ReviewPage({ params, searchParams }: ReviewPageProps) {
  const { pathway, section } = await params;
  if (pathway !== PATHWAY_SLUG || section !== SECTION_SLUG) notFound();
  const { categories, m } = await searchParams;

  const valid = Object.keys(CATEGORY_DISPLAY) as AssessmentCategory[];
  const requested = (categories ?? "")
    .split(",")
    .filter((entry): entry is AssessmentCategory => valid.includes(entry as AssessmentCategory));
  const misconceptions = (m ?? "").split(",").filter((entry) => /^M\d{1,2}$/.test(entry));

  return (
    <main id="main" className="mx-auto w-full max-w-[680px] flex-1 px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Pathways", href: "/learn" },
          { label: strings.pathway.sectionOneTitle, href: LESSON_ROUTE },
          { label: "Review" },
        ]}
      />
      <h1 className="mt-6 text-display font-bold">What to review</h1>
      <RemediationReview
        categories={requested}
        misconceptions={misconceptions}
        lessonRoute={LESSON_ROUTE}
      />
    </main>
  );
}

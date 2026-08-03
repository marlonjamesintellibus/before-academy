import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { AssessmentFlow } from "@/features/assessment";
import { PATHWAY_SLUG } from "@/lib/routes";
import { assessmentSeed } from "@/db/seed/assessment-content";

export const metadata: Metadata = { title: "Assessment" };

interface AssessmentPageProps {
  params: Promise<{ pathway: string; section: string }>;
  searchParams: Promise<{ route?: string }>;
}

/**
 * S06/S07/S08 (docs/product/screens/assessment.md): intro → attempt → results.
 * Assessment-first entry is a supported route with identical rules (ADR-005).
 */
export default async function AssessmentPage({ params, searchParams }: AssessmentPageProps) {
  const { pathway, section } = await params;
  if (pathway !== PATHWAY_SLUG) notFound();
  const { route } = await searchParams;

  return (
    <main id="main" className="mx-auto w-full max-w-[680px] flex-1 px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "AI Awareness", href: "/learn" },
          { label: "Lesson", href: `/learn/${pathway}/${section}` },
          { label: "Assessment" },
        ]}
      />
      <h1 className="mt-6 text-display font-bold">Assessment</h1>
      <div className="mt-8">
        <AssessmentFlow
          intro={assessmentSeed.intro}
          lessonRoute={`/learn/${pathway}/${section}`}
          sectionSlug={section}
          assessmentFirst={route === "assessment_first"}
        />
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { AssessmentFlow } from "@/features/assessment";
import { isKnownPathway, PATHWAY_META } from "@/lib/routes";
import { assessmentSeed } from "@/db/seed/assessment-content";
import { assessmentForSection } from "@/db/seed/sections";
import { getAssessmentBank } from "@/features/assessment/queries";

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
  if (!isKnownPathway(pathway)) notFound();

  // A section without a bank must not advertise an assessment: the intro would
  // promise a step that createAttempt would then refuse.
  const bank = await getAssessmentBank(section);
  if (bank.length === 0) notFound();

  const { route } = await searchParams;

  return (
    <main id="main" className="mx-auto w-full max-w-[680px] flex-1 px-4 py-8">
      <Breadcrumbs
        items={[
          { label: PATHWAY_META[pathway]?.title ?? "Pathway", href: "/learn" },
          { label: "Lesson", href: `/learn/${pathway}/${section}` },
          { label: "Assessment" },
        ]}
      />
      <h1 className="mt-6 text-display font-bold">Assessment</h1>
      <div className="mt-8">
        <AssessmentFlow
          intro={
            // Per-bank intro; the classic section's seed lives outside the
            // bundle registry, so it stays the fallback rather than the
            // default for everyone (the bug this replaces).
            assessmentForSection(section)?.intro ?? assessmentSeed.intro
          }
          lessonRoute={`/learn/${pathway}/${section}`}
          sectionSlug={section}
          assessmentFirst={route === "assessment_first"}
        />
      </div>
    </main>
  );
}

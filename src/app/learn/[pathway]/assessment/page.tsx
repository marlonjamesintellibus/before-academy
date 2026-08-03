import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { AssessmentFlow } from "@/features/assessment";
import { getPathwayAssessmentBank, pathwayScope } from "@/features/assessment/queries";
import { PATHWAY_SLUG } from "@/lib/routes";
import { getAssessmentConfig } from "@/lib/config";

export const metadata: Metadata = { title: "AI Awareness assessment" };

interface PathwayAssessmentPageProps {
  params: Promise<{ pathway: string }>;
  searchParams: Promise<{ route?: string }>;
}

/**
 * The Level 1 competency check: one assessment across every section, which is
 * what "passing AI Awareness" should mean (docs/content/content-map.md).
 *
 * A static `assessment` segment sits beside the dynamic `[section]`, and Next
 * resolves static ahead of dynamic, so this wins without a guard. The cost is
 * that no section may ever be slugged "assessment", which is a fair trade for
 * a readable URL.
 */
export default async function PathwayAssessmentPage({
  params,
  searchParams,
}: PathwayAssessmentPageProps) {
  const { pathway } = await params;
  if (pathway !== PATHWAY_SLUG) notFound();

  const bank = await getPathwayAssessmentBank(pathway);
  if (bank.length === 0) notFound();

  const { route } = await searchParams;

  return (
    <main id="main" className="mx-auto w-full max-w-[680px] flex-1 px-4 py-8">
      <Breadcrumbs
        items={[{ label: "AI Awareness", href: "/learn" }, { label: "Pathway assessment" }]}
      />
      <AssessmentFlow
        intro={`${getAssessmentConfig().pathwayDrawSize} questions across the whole pathway, drawn so every section is represented. Pass at 80 percent, retake any time with a different combination.`}
        lessonRoute="/learn"
        sectionSlug={pathwayScope(pathway)}
        assessmentFirst={route === "assessment_first"}
      />
    </main>
  );
}

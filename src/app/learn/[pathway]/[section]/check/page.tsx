import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CheckPlayer } from "@/features/activity";
import { getPublishedCheckQuestions } from "@/features/content/server";
import { LESSON_ROUTE, PATHWAY_SLUG, SECTION_SLUG } from "@/lib/routes";
import { strings } from "@/lib/strings";
import { checkSeed } from "@/db/seed/activity-content";

export const metadata: Metadata = { title: "Knowledge check" };
export const revalidate = 300;

interface CheckPageProps {
  params: Promise<{ pathway: string; section: string }>;
}

/** S05 Knowledge check (docs/product/screens/activity-and-check.md): practice, never graded. */
export default async function CheckPage({ params }: CheckPageProps) {
  const { pathway, section } = await params;
  if (pathway !== PATHWAY_SLUG || section !== SECTION_SLUG) notFound();

  const questions = await getPublishedCheckQuestions(section);
  if (questions.length === 0) notFound();

  return (
    <main id="main" className="mx-auto w-full max-w-[680px] flex-1 px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Pathways", href: "/learn" },
          { label: strings.pathway.sectionOneTitle, href: LESSON_ROUTE },
          { label: "Knowledge check" },
        ]}
      />
      <h1 className="mt-6 text-display font-bold">{checkSeed.label}</h1>
      <div className="mt-8">
        <CheckPlayer
          questions={questions}
          intro={checkSeed.intro}
          completion={checkSeed.completion.body}
          lessonRoute={LESSON_ROUTE}
        />
      </div>
    </main>
  );
}

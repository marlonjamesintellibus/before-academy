import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { CheckPlayer } from "@/features/activity";
import { getPublishedCheckQuestions } from "@/features/content/server";
import { isKnownPathway } from "@/lib/routes";
import { checkSeed } from "@/db/seed/activity-content";
import { checkForSection } from "@/db/seed/sections";
import { SECTION_SLUG } from "@/lib/routes";

export const metadata: Metadata = { title: "Knowledge check" };
export const revalidate = 300;

interface CheckPageProps {
  params: Promise<{ pathway: string; section: string }>;
}

/** S05 Knowledge check (docs/product/screens/activity-and-check.md): practice, never graded. */
export default async function CheckPage({ params }: CheckPageProps) {
  const { pathway, section } = await params;
  if (!isKnownPathway(pathway)) notFound();

  const questions = await getPublishedCheckQuestions(section);
  if (questions.length === 0) notFound();

  const meta = section === SECTION_SLUG ? checkSeed : checkForSection(section);
  if (!meta) notFound();

  return (
    <main id="main" className="mx-auto w-full max-w-[680px] flex-1 px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "AI Awareness", href: "/learn" },
          { label: "Lesson", href: `/learn/${pathway}/${section}` },
          { label: "Knowledge check" },
        ]}
      />
      <h1 className="mt-6 text-display font-bold">{meta.label}</h1>
      <div className="mt-8">
        <CheckPlayer
          questions={questions}
          intro={meta.intro}
          completion={meta.completion.body}
          lessonRoute={`/learn/${pathway}/${section}`}
          {...(section === SECTION_SLUG ? {} : { storageKey: `ba.v1.knowledge-check.${section}` })}
        />
      </div>
    </main>
  );
}

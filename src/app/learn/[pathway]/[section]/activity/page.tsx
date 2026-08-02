import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ActivityPlayer } from "@/features/activity";
import { getPublishedScenarios } from "@/features/content/server";
import { LESSON_ROUTE, PATHWAY_SLUG, SECTION_SLUG } from "@/lib/routes";
import { strings } from "@/lib/strings";
import { activitySeed } from "@/db/seed/activity-content";

export const metadata: Metadata = { title: "Sort the System" };
export const revalidate = 300;

interface ActivityPageProps {
  params: Promise<{ pathway: string; section: string }>;
}

/** S04 Sort the System (docs/product/screens/activity-and-check.md). */
export default async function ActivityPage({ params }: ActivityPageProps) {
  const { pathway, section } = await params;
  if (pathway !== PATHWAY_SLUG || section !== SECTION_SLUG) notFound();

  const scenarios = await getPublishedScenarios(section);
  if (scenarios.length === 0) notFound();

  return (
    <main id="main" className="mx-auto w-full max-w-[680px] flex-1 px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "Pathways", href: "/learn" },
          { label: strings.pathway.sectionOneTitle, href: LESSON_ROUTE },
          { label: "Sort the System" },
        ]}
      />
      <h1 className="mt-6 text-display font-bold">{activitySeed.title}</h1>
      <div className="mt-8">
        <ActivityPlayer
          scenarios={scenarios}
          intro={activitySeed.intro}
          instructions={activitySeed.instructions}
          lessonRoute={LESSON_ROUTE}
        />
      </div>
    </main>
  );
}

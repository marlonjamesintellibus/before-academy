import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ActivityPlayer } from "@/features/activity";
import { getPublishedScenarios } from "@/features/content/server";
import { isKnownPathway, SECTION_SLUG } from "@/lib/routes";
import { activitySeed } from "@/db/seed/activity-content";
import { activityForSection } from "@/db/seed/sections";

export async function generateMetadata({ params }: ActivityPageProps): Promise<Metadata> {
  const { section } = await params;
  const meta = section === SECTION_SLUG ? activitySeed : activityForSection(section);
  return { title: meta?.title ?? "Activity" };
}
export const revalidate = 300;

interface ActivityPageProps {
  params: Promise<{ pathway: string; section: string }>;
}

/** S04 Sort the System (docs/product/screens/activity-and-check.md). */
export default async function ActivityPage({ params }: ActivityPageProps) {
  const { pathway, section } = await params;
  if (!isKnownPathway(pathway)) notFound();

  // Meta comes from the section's seed; a section with no activity 404s
  // rather than serving another section's framing around no scenarios.
  const meta = section === SECTION_SLUG ? activitySeed : activityForSection(section);
  if (!meta) notFound();

  const scenarios = await getPublishedScenarios(section);
  if (scenarios.length === 0) notFound();

  const lessonRoute = `/learn/${pathway}/${section}`;

  return (
    <main id="main" className="mx-auto w-full max-w-[680px] flex-1 px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "AI Awareness", href: "/learn" },
          { label: "Lesson", href: lessonRoute },
          { label: meta.title },
        ]}
      />
      <h1 className="mt-6 text-display font-bold">{meta.title}</h1>
      <div className="mt-8">
        <ActivityPlayer
          scenarios={scenarios}
          intro={meta.intro}
          instructions={meta.instructions}
          lessonRoute={lessonRoute}
          {...(section === SECTION_SLUG ? {} : { storageKey: `ba.v1.activity.${section}` })}
        />
      </div>
    </main>
  );
}

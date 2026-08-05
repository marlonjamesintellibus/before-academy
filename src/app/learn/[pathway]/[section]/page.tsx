import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { TrackOnMount } from "@/components/track";
import { LessonView } from "@/features/content";
import { getPublishedSection } from "@/features/content/server";
import { isKnownPathway, PATHWAY_META } from "@/lib/routes";
import { strings } from "@/lib/strings";

interface SectionPageProps {
  params: Promise<{ pathway: string; section: string }>;
}

/** Title follows the published section, so every section reads correctly. */
export async function generateMetadata({ params }: SectionPageProps): Promise<Metadata> {
  const { pathway, section } = await params;
  const content = await getPublishedSection(pathway, section);
  return { title: content?.title ?? "Lesson" };
}

/** ISR (ADR-034, ADR-012): render on demand, cache, revalidate; publish flips content. */
export const revalidate = 300;

/**
 * S03 Lesson (docs/product/screens/lesson.md): full lesson from versioned
 * published records. Unknown slugs 404 (IA deep-link rule).
 */
export default async function SectionPage({ params }: SectionPageProps) {
  const { pathway, section } = await params;
  if (!isKnownPathway(pathway)) notFound();
  const meta = PATHWAY_META[pathway];
  if (!meta) notFound();

  // Any published section under the pathway renders; unpublished slugs 404 via
  // the query, which keeps the IA deep-link rule without hardcoding a list.
  const content = await getPublishedSection(pathway, section);
  if (!content) notFound();
  const sectionRoute = `/learn/${pathway}/${section}`;
  // Honest estimate from the stages themselves; "20 minutes" was hardcoded
  // for every section and understated the deeper modules.
  const minutes =
    3 +
    content.blocks
      .filter((block) => block.type === "concept")
      .reduce((total, block) => total + (block.minutes ?? 4), 0);

  return (
    <main id="main" className="w-full flex-1 py-8">
      <TrackOnMount event="lesson_viewed" />
      <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6">
        <Breadcrumbs items={[{ label: meta.title, href: "/learn" }, { label: content.title }]} />
        <h1 className="mt-6 max-w-[680px] text-display font-bold">{content.title}</h1>
        <p className="mt-3 max-w-[680px] text-body text-ink-muted">{content.description}</p>
        <ul className="mt-4 flex flex-wrap gap-2 text-caption font-medium text-ink-muted">
          <li className="rounded-(--radius-chip) bg-primary-tint px-3 py-1 text-primary">
            {meta.levelChip}
          </li>
          <li className="rounded-(--radius-chip) bg-surface-alt px-3 py-1">
            About {minutes} minutes
          </li>
          <li className="rounded-(--radius-chip) bg-surface-alt px-3 py-1">
            Lesson → activity → practice → assessment
          </li>
        </ul>
      </div>
      <div className="mt-10">
        <LessonView content={content} sectionSlug={section} lessonRoute={sectionRoute} />
      </div>
    </main>
  );
}

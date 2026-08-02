import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { TrackOnMount } from "@/components/track";
import { LessonView } from "@/features/content";
import { getPublishedSection } from "@/features/content/server";
import { LESSON_ROUTE, PATHWAY_SLUG, SECTION_SLUG } from "@/lib/routes";
import { strings } from "@/lib/strings";

export const metadata: Metadata = { title: "AI, Automation and Traditional Software" };

/** ISR (ADR-034, ADR-012): render on demand, cache, revalidate; publish flips content. */
export const revalidate = 300;

interface SectionPageProps {
  params: Promise<{ pathway: string; section: string }>;
}

/**
 * S03 Lesson (docs/product/screens/lesson.md): full lesson from versioned
 * published records. Unknown slugs 404 (IA deep-link rule).
 */
export default async function SectionPage({ params }: SectionPageProps) {
  const { pathway, section } = await params;
  if (pathway !== PATHWAY_SLUG || section !== SECTION_SLUG) notFound();

  const content = await getPublishedSection(pathway, section);
  if (!content) notFound();

  return (
    <main id="main" className="w-full flex-1 py-8">
      <TrackOnMount event="lesson_viewed" />
      <div className="mx-auto w-full max-w-[1280px] px-4 md:px-6">
        <Breadcrumbs
          items={[
            { label: "Pathways", href: "/learn" },
            { label: strings.pathway.title, href: "/learn" },
            { label: content.title },
          ]}
        />
        <h1 className="mt-6 max-w-[680px] text-display font-bold">{content.title}</h1>
        <p className="mt-3 max-w-[680px] text-body text-ink-muted">{content.description}</p>
        <ul className="mt-4 flex flex-wrap gap-2 text-caption font-medium text-ink-muted">
          <li className="rounded-(--radius-chip) bg-primary-tint px-3 py-1 text-primary">
            Level 1 · AI Awareness
          </li>
          <li className="rounded-(--radius-chip) bg-surface-alt px-3 py-1">About 20 minutes</li>
          <li className="rounded-(--radius-chip) bg-surface-alt px-3 py-1">
            Lesson → activity → practice → assessment
          </li>
        </ul>
      </div>
      <div className="mt-10">
        <LessonView content={content} lessonRoute={LESSON_ROUTE} />
      </div>
    </main>
  );
}

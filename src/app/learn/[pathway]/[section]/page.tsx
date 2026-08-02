import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { TrackOnMount } from "@/components/track";
import { PATHWAY_SLUG, SECTION_SLUG } from "@/lib/routes";
import { strings } from "@/lib/strings";

export const metadata: Metadata = { title: "AI, Automation and Traditional Software" };

interface SectionPageProps {
  params: Promise<{ pathway: string; section: string }>;
}

/**
 * S03 Lesson shell (docs/product/screens/lesson.md). M1 ships the navigable
 * shell - reading column, breadcrumbs, block scaffold; real content renders
 * from versioned records at M2. Unknown slugs → 404 (IA deep-link rule).
 */
export default async function SectionPage({ params }: SectionPageProps) {
  const { pathway, section } = await params;
  if (pathway !== PATHWAY_SLUG || section !== SECTION_SLUG) notFound();

  return (
    <main id="main" className="mx-auto w-full max-w-[680px] flex-1 px-4 py-8">
      <TrackOnMount event="lesson_viewed" />
      <Breadcrumbs
        items={[
          { label: "Pathways", href: "/learn" },
          { label: strings.pathway.title, href: "/learn" },
          { label: strings.pathway.sectionOneTitle },
        ]}
      />
      <h1 className="mt-6 text-display font-bold">{strings.pathway.sectionOneTitle}</h1>
      <p className="mt-3 text-body text-ink-muted">{strings.pathway.sectionOneDescription}</p>

      <div className="mt-10 rounded-(--radius-control) border border-dashed border-surface-alt p-6 text-body text-ink-muted">
        The lesson content renders here from versioned content records (milestone M2). The shell -
        routing, breadcrumbs, reading column, and analytics - is in place.
      </div>

      <div className="mt-8">
        <Link href="/learn" className="text-body text-primary underline-offset-4 hover:underline">
          ← Back to the pathway
        </Link>
      </div>
    </main>
  );
}

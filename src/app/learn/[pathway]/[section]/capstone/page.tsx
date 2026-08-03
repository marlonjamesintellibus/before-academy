import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Capstone } from "@/features/progress";
import { LESSON_ROUTE, PATHWAY_SLUG, SECTION_SLUG } from "@/lib/routes";
import { strings } from "@/lib/strings";

export const metadata: Metadata = { title: "Capstone" };

interface CapstonePageProps {
  params: Promise<{ pathway: string; section: string }>;
}

/** Capstone route (experience-plan Phase E): optional workplace transfer task. */
export default async function CapstonePage({ params }: CapstonePageProps) {
  const { pathway, section } = await params;
  if (pathway !== PATHWAY_SLUG || section !== SECTION_SLUG) notFound();

  return (
    <main id="main" className="mx-auto w-full max-w-[680px] flex-1 px-4 py-8">
      <Breadcrumbs
        items={[
          { label: "AI Awareness", href: "/learn" },
          { label: strings.pathway.sectionOneTitle, href: LESSON_ROUTE },
          { label: "Capstone" },
        ]}
      />
      <Capstone />
    </main>
  );
}

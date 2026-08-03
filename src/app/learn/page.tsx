import type { Metadata } from "next";
import { TrackOnMount, TrackOnVisible, TrackedLink } from "@/components/track";
import {
  ResumeBanner,
  SkillMap,
  ReviewSession,
  ResetProgress,
  PathwayProgress,
  PathwaySections,
} from "@/features/progress";
import { strings } from "@/lib/strings";

export const metadata: Metadata = { title: "AI Awareness" };

/**
 * S02 Pathway Overview (docs/product/screens/marketing-and-pathway.md,
 * content-map.md decision 7): all seven sections as equals in learner order,
 * with the pathway assessment as the close. Standing state lives in the aside.
 * Sections never lock (ADR-003).
 */
export default function PathwayPage() {
  return (
    <main id="main" className="w-full flex-1">
      <ResumeBanner />

      <div className="shell-gradient">
        <div className="mx-auto w-full max-w-[1280px] px-4 py-10 md:px-6 md:py-14">
          <TrackOnMount event="pathway_viewed" />
          <p className="eyebrow !text-sky">Pathway</p>
          <h1 className="mt-3 text-display font-bold text-surface-card">{strings.pathway.title}</h1>
          <p className="mt-3 max-w-[62ch] text-subheading text-sky">
            {strings.pathway.description}
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-caption font-medium text-sky">
            {strings.pathway.meta.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-[1280px] gap-8 px-4 py-12 md:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12">
        <div>
          <PathwaySections />

          {/* The pathway close: passing this is what completing AI Awareness
              means. Carries the old next-preview visibility event so the S12
              funnel keeps its measurement point. */}
          <TrackOnVisible event="next_preview_viewed">
            <section
              id="next"
              aria-label={strings.pathway.pathwayAssessment.title}
              className="mt-8 rounded-(--radius-card) border border-primary/25 bg-primary-tint p-6"
            >
              <h2 className="font-display text-subheading font-bold text-ink">
                {strings.pathway.pathwayAssessment.title}
              </h2>
              <p className="mt-2 text-body text-ink-muted">
                {strings.pathway.pathwayAssessment.description}
              </p>
              <TrackedLink
                event="cta_assessment_first_clicked"
                href="/learn/ai-awareness/assessment"
                className="mt-4 inline-flex min-h-11 items-center rounded-(--radius-control) bg-primary px-5 py-2.5 text-body font-semibold text-surface-card shadow-(--shadow-card) hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {strings.pathway.pathwayAssessment.cta}
              </TrackedLink>
            </section>
          </TrackOnVisible>
          <ReviewSession />
        </div>

        <aside aria-label="Your standing" className="flex flex-col">
          <PathwayProgress />
          <SkillMap />
          <ResetProgress />
        </aside>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import { TrackOnMount, TrackOnVisible, TrackedButton, TrackedLink } from "@/components/track";
import {
  ResumeBanner,
  SectionMicrostatus,
  SectionStatusChip,
  SectionUnits,
  SkillMap,
  ReviewSession,
  ResetProgress,
  PathwayProgress,
} from "@/features/progress";
import { LESSON_ROUTE } from "@/lib/routes";
import { strings } from "@/lib/strings";

export const metadata: Metadata = { title: "AI Awareness" };

/**
 * S02 Pathway Overview + S12 Next-Step Preview anchor
 * (docs/product/screens/marketing-and-pathway.md, design-system v3). Navy band
 * frames the pathway; sections run in the main column with standing state in
 * the aside. Sections never lock (ADR-003) - future ones are previews.
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
          <ol className="flex flex-col gap-5">
            <li>
              <TrackedLink
                event="section_card_clicked"
                properties={{ section: "ai-automation-software" }}
                href={LESSON_ROUTE}
                className="panel block p-6 transition-all duration-(--duration-state) hover:-translate-y-0.5 hover:shadow-(--shadow-card-hover) focus-visible:outline-2 focus-visible:outline-primary"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 items-center justify-center rounded-(--radius-chip) bg-primary font-display text-subheading font-bold text-surface-card"
                  >
                    1
                  </span>
                  <span className="font-display text-subheading font-semibold text-ink">
                    {strings.pathway.sectionOneTitle}
                  </span>
                  <SectionStatusChip />
                </div>
                <p className="mt-3 text-body text-ink-muted">
                  {strings.pathway.sectionOneDescription}
                </p>
                <SectionMicrostatus />
              </TrackedLink>
              <SectionUnits />
            </li>
            <li>
              <TrackOnVisible event="next_preview_viewed">
                <div
                  id="next"
                  className="rounded-(--radius-card) border border-border bg-surface-alt p-6"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="flex h-10 w-10 items-center justify-center rounded-(--radius-chip) bg-border font-display text-subheading font-bold text-ink-muted"
                    >
                      2
                    </span>
                    <span className="font-display text-subheading font-semibold text-ink-muted">
                      Applying AI at Work
                    </span>
                    <span className="rounded-(--radius-chip) bg-primary-tint px-3 py-0.5 text-caption font-semibold text-primary">
                      {strings.pathway.comingSoon}
                    </span>
                  </div>
                  <p className="mt-3 text-body text-ink-muted">{strings.pathway.previewNote}</p>
                  <TrackedButton
                    event="notify_me_clicked"
                    className="mt-4 inline-flex min-h-11 items-center rounded-(--radius-control) border border-primary bg-surface-card px-4 py-2 text-body font-semibold text-primary transition-colors duration-(--duration-state) hover:bg-primary-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {strings.actions.notifyMe}
                  </TrackedButton>
                </div>
              </TrackOnVisible>
            </li>
          </ol>
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

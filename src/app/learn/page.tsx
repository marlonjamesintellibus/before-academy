import type { Metadata } from "next";
import { TrackOnMount, TrackOnVisible, TrackedButton, TrackedLink } from "@/components/track";
import { LESSON_ROUTE } from "@/lib/routes";
import { strings } from "@/lib/strings";

export const metadata: Metadata = { title: "Pathways" };

/**
 * S02 Pathway Overview + S12 Next-Step Preview anchor
 * (docs/product/screens/marketing-and-pathway.md, design-system v2).
 * Static for M1; per-step microstatus and progress states arrive with guest
 * progress (M5). Sections never lock (ADR-003) - future ones are previews.
 */
export default function PathwayPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-[720px] flex-1 px-4 py-12">
      <TrackOnMount event="pathway_viewed" />
      <p className="eyebrow">Pathway</p>
      <h1 className="mt-3 text-display font-bold">{strings.pathway.title}</h1>
      <p className="mt-3 text-body text-ink-muted">{strings.pathway.description}</p>
      <p className="mt-1 text-caption text-ink-muted">{strings.pathway.totalTime}</p>

      <ol className="mt-10 flex flex-col gap-5">
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
              <span className="rounded-(--radius-chip) bg-surface-alt px-3 py-0.5 text-caption font-medium text-ink-muted">
                {strings.pathway.notStarted}
              </span>
            </div>
            <p className="mt-3 text-body text-ink-muted">{strings.pathway.sectionOneDescription}</p>
          </TrackedLink>
        </li>
        <li>
          <TrackOnVisible event="next_preview_viewed">
            <div
              id="next"
              className="rounded-(--radius-card) border-2 border-dashed border-border bg-surface-alt/60 p-6"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 items-center justify-center rounded-(--radius-chip) border-2 border-border font-display text-subheading font-bold text-ink-muted"
                >
                  2
                </span>
                <span className="font-display text-subheading font-semibold text-ink-muted">
                  Applying AI at Work
                </span>
                <span className="rounded-(--radius-chip) bg-primary-tint px-3 py-0.5 text-caption font-medium text-primary">
                  {strings.pathway.comingSoon}
                </span>
              </div>
              <p className="mt-3 text-body text-ink-muted">{strings.pathway.previewNote}</p>
              <TrackedButton
                event="notify_me_clicked"
                className="mt-4 inline-flex min-h-11 items-center rounded-(--radius-control) border border-primary px-4 py-2 text-body font-semibold text-primary transition-colors duration-(--duration-state) hover:bg-primary-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {strings.actions.notifyMe}
              </TrackedButton>
            </div>
          </TrackOnVisible>
        </li>
      </ol>
    </main>
  );
}

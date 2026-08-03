import Link from "next/link";
import { TrackOnMount, TrackedLink } from "@/components/track";
import { LandingDemo } from "@/features/content";
import { ResumeBanner } from "@/features/progress";

import { strings } from "@/lib/strings";

/**
 * S01 marketing home (docs/product/screens/marketing-and-pathway.md,
 * design-system v3): navy hero pairs the promise with a live scenario, so the
 * product demonstrates itself above the fold instead of describing itself.
 * Resume banner arrives with guest progress (M5).
 */
export default function HomePage() {
  return (
    <main id="main" className="flex-1">
      <ResumeBanner />
      <div className="shell-gradient">
        <div className="mx-auto grid w-full max-w-[1280px] gap-10 px-4 py-14 md:px-6 md:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:items-center lg:gap-16">
          <div>
            <TrackOnMount event="home_viewed" />
            <p className="eyebrow !text-sky">{strings.home.eyebrow}</p>
            <h1 className="mt-4 text-display font-bold text-surface-card md:text-[2.75rem] md:leading-[3.25rem]">
              <span className="block text-balance">{strings.home.headlineLead}</span>
              <span className="block text-balance text-sky">{strings.home.headlineFoil}</span>
            </h1>
            <p className="mt-5 max-w-[48ch] text-subheading text-sky">{strings.home.promise}</p>

            <div className="mt-9 flex flex-wrap items-center gap-5">
              <TrackedLink
                event="cta_start_clicked"
                href="/learn/ai-awareness/what-is-artificial-intelligence"
                aria-label={strings.home.startCtaLabel}
                className="inline-flex min-h-12 items-center rounded-(--radius-control) bg-primary px-6 py-3 text-body font-semibold text-surface-card shadow-(--shadow-card) transition-all duration-(--duration-state) hover:-translate-y-0.5 hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky"
              >
                {strings.actions.startLearning}
              </TrackedLink>
              <TrackedLink
                event="cta_assessment_first_clicked"
                href="/learn/ai-awareness/assessment?route=assessment_first"
                className="text-body font-medium text-sky underline decoration-2 underline-offset-4 hover:text-surface-card"
              >
                {strings.actions.assessmentFirst}
              </TrackedLink>
            </div>
          </div>

          <LandingDemo />
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1280px] px-4 pb-16 md:px-6">
        <ul className="-mt-8 grid gap-4 sm:grid-cols-3">
          {strings.home.outcomes.map((outcome, index) => (
            <li key={outcome.title} className="panel px-5 py-4">
              <span aria-hidden="true" className="font-display text-heading font-bold text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-1 text-body font-semibold">{outcome.title}</p>
              <p className="mt-1 text-caption text-ink-muted">{outcome.body}</p>
            </li>
          ))}
        </ul>

        <Link
          href="/learn"
          className="panel mt-10 flex flex-wrap items-center gap-6 p-6 transition-all duration-(--duration-state) hover:-translate-y-0.5 hover:shadow-(--shadow-card-hover) focus-visible:outline-2 focus-visible:outline-primary"
        >
          <div className="flex-1">
            <p className="eyebrow">{strings.pathway.title} pathway</p>
            <p className="mt-2 font-display text-subheading font-bold text-ink">
              Seven sections, from the first honest definition to the judgment you can use at work
            </p>
            <p className="mt-1 text-body text-ink-muted">
              Each 15 to 25 minutes: lesson, activity, practice, and graded questions - closed by
              one assessment across the whole pathway
            </p>
          </div>
          <span
            aria-hidden="true"
            className="flex h-11 w-11 items-center justify-center rounded-(--radius-chip) bg-primary-tint text-subheading font-bold text-primary"
          >
            →
          </span>
        </Link>
      </div>
    </main>
  );
}

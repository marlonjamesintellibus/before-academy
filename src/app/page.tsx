import Link from "next/link";
import { TrackOnMount, TrackedLink } from "@/components/track";
import { ResumeBanner } from "@/features/progress";
import { LESSON_ROUTE } from "@/lib/routes";
import { strings } from "@/lib/strings";

/**
 * S01 marketing home (docs/product/screens/marketing-and-pathway.md,
 * design-system v3): premium navy hero into one-scroll lesson entry.
 * Resume banner arrives with guest progress (M5).
 */
export default function HomePage() {
  return (
    <main id="main" className="flex-1">
      <ResumeBanner />
      <div className="shell-gradient">
        <div className="mx-auto w-full max-w-[880px] px-4 py-16 md:py-24">
          <TrackOnMount event="home_viewed" />
          <p className="eyebrow !text-sky">AI Awareness · Free · No account needed</p>
          <h1 className="mt-4 max-w-[18ch] text-display font-bold text-surface-card md:text-[2.75rem] md:leading-[3.25rem]">
            {strings.home.headline}
          </h1>
          <p className="mt-5 max-w-[52ch] text-subheading text-sky">{strings.home.promise}</p>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            <TrackedLink
              event="cta_start_clicked"
              href={LESSON_ROUTE}
              aria-label={strings.home.startCtaLabel}
              className="inline-flex min-h-12 items-center rounded-(--radius-control) bg-primary px-6 py-3 text-body font-semibold text-surface-card shadow-(--shadow-card) transition-all duration-(--duration-state) hover:-translate-y-0.5 hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky"
            >
              {strings.actions.startLearning}
            </TrackedLink>
            <TrackedLink
              event="cta_assessment_first_clicked"
              href={`${LESSON_ROUTE}/assessment?route=assessment_first`}
              className="text-body font-medium text-sky underline decoration-2 underline-offset-4 hover:text-surface-card"
            >
              {strings.actions.assessmentFirst}
            </TrackedLink>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[880px] px-4 pb-16">
        <ul className="-mt-8 grid gap-4 sm:grid-cols-3">
          {strings.home.valueStrip.map((value, index) => (
            <li key={value} className="panel px-5 py-4">
              <span aria-hidden="true" className="font-display text-heading font-bold text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-1 text-body font-semibold">{value}</p>
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
              {strings.pathway.sectionOneTitle}
            </p>
            <p className="mt-1 text-body text-ink-muted">
              {strings.pathway.totalTime} · Lesson, activity, practice, and assessment
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

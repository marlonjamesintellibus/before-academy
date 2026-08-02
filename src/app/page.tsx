import Link from "next/link";
import { TrackOnMount, TrackedLink } from "@/components/track";
import { LESSON_ROUTE } from "@/lib/routes";
import { strings } from "@/lib/strings";

/**
 * S01 marketing home (docs/product/screens/marketing-and-pathway.md,
 * design-system v2): one scroll into the lesson. Editorial hero on the
 * dot-grid marketing surface; resume banner arrives with guest progress (M5).
 */
export default function HomePage() {
  return (
    <main id="main" className="flex-1">
      <div aria-hidden="true" className="dot-grid absolute inset-x-0 h-[420px]" />
      <div className="relative mx-auto w-full max-w-[720px] px-4 py-14 md:py-20">
        <TrackOnMount event="home_viewed" />
        <p className="eyebrow">AI Awareness · Free · No account needed</p>
        <h1 className="mt-4 text-display font-bold md:text-[2.5rem] md:leading-[3rem]">
          {strings.home.headline}
        </h1>
        <p className="mt-5 max-w-[56ch] text-subheading text-ink-muted">{strings.home.promise}</p>

        <div className="mt-9 flex flex-wrap items-center gap-5">
          <TrackedLink
            event="cta_start_clicked"
            href={LESSON_ROUTE}
            aria-label={strings.home.startCtaLabel}
            className="inline-flex min-h-12 items-center rounded-(--radius-control) border-2 border-ink bg-primary px-6 py-3 text-body font-semibold text-surface shadow-[4px_4px_0_rgba(22,22,31,0.9)] transition-all duration-(--duration-state) hover:-translate-y-0.5 hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {strings.actions.startLearning}
          </TrackedLink>
          <TrackedLink
            event="cta_assessment_first_clicked"
            href={`${LESSON_ROUTE}/assessment?route=assessment_first`}
            className="text-body font-medium text-primary underline decoration-2 underline-offset-4 hover:text-primary-strong"
          >
            {strings.actions.assessmentFirst}
          </TrackedLink>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-3">
          {strings.home.valueStrip.map((value, index) => (
            <li key={value} className="panel px-4 py-3">
              <span aria-hidden="true" className="font-display text-heading font-bold text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="mt-1 text-body font-semibold">{value}</p>
            </li>
          ))}
        </ul>

        <Link
          href="/learn"
          className="panel mt-10 block p-6 transition-all duration-(--duration-state) hover:-translate-y-0.5 hover:shadow-(--shadow-card-hover) focus-visible:outline-2 focus-visible:outline-primary"
        >
          <p className="eyebrow">{strings.pathway.title} pathway</p>
          <p className="mt-2 font-display text-subheading font-semibold text-ink">
            {strings.pathway.sectionOneTitle}
          </p>
          <p className="mt-1 text-body text-ink-muted">{strings.pathway.totalTime} →</p>
        </Link>
      </div>
    </main>
  );
}

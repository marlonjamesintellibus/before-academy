import Link from "next/link";
import { TrackOnMount, TrackedLink } from "@/components/track";
import { LESSON_ROUTE } from "@/lib/routes";
import { strings } from "@/lib/strings";

/**
 * S01 Home (docs/product/screens/marketing-and-pathway.md): one scroll into the
 * lesson. Resume banner arrives with guest progress (M5).
 */
export default function HomePage() {
  return (
    <main id="main" className="mx-auto w-full max-w-[720px] flex-1 px-4 py-12 md:py-16">
      <TrackOnMount event="home_viewed" />
      <h1 className="text-display font-bold">{strings.home.headline}</h1>
      <p className="mt-4 text-body text-ink-muted">{strings.home.promise}</p>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <TrackedLink
          event="cta_start_clicked"
          href={LESSON_ROUTE}
          aria-label={strings.home.startCtaLabel}
          className="inline-flex min-h-11 items-center rounded-(--radius-control) bg-primary px-5 py-2.5 text-body font-semibold text-surface hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {strings.actions.startLearning}
        </TrackedLink>
        <TrackedLink
          event="cta_assessment_first_clicked"
          href={`${LESSON_ROUTE}/assessment?route=assessment_first`}
          className="text-body text-primary underline-offset-4 hover:underline"
        >
          {strings.actions.assessmentFirst}
        </TrackedLink>
      </div>

      <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-body text-ink-muted">
        {strings.home.valueStrip.map((value) => (
          <li key={value}>{value}</li>
        ))}
      </ul>

      <Link
        href="/learn"
        className="mt-10 block rounded-(--radius-control) border border-surface-alt bg-surface-alt p-6 hover:border-primary focus-visible:outline-2 focus-visible:outline-primary"
      >
        <p className="text-caption font-semibold uppercase tracking-wide text-ink-muted">
          {strings.pathway.title} pathway
        </p>
        <p className="mt-2 text-subheading font-semibold text-ink">
          {strings.pathway.sectionOneTitle}
        </p>
        <p className="mt-1 text-body text-ink-muted">{strings.pathway.totalTime}</p>
      </Link>
    </main>
  );
}

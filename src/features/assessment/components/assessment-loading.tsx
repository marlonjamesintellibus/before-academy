import { SkeletonLoader } from "@/components/ui";

/**
 * Loading shell for the assessment routes.
 *
 * Scoped to assessments deliberately. A boundary on the whole /learn segment
 * puts every nested page behind Suspense, including the ISR-cached lesson and
 * activity pages that render in well under a second: those gained a skeleton
 * flash and a mid-interaction DOM swap they had no need for. The assessment
 * routes read searchParams, so they render on demand every time and are the
 * ones where a learner actually waits.
 *
 * SkeletonLoader is aria-hidden by contract, so the live region announces once.
 */
export function AssessmentLoading() {
  return (
    <main id="main" className="mx-auto w-full max-w-[680px] flex-1 px-4 py-8">
      <div role="status" aria-live="polite">
        <span className="sr-only">Loading the assessment</span>
      </div>
      <SkeletonLoader lines={1} className="max-w-[12rem]" />
      <div className="mt-6">
        <SkeletonLoader lines={2} />
      </div>
      <div className="mt-8">
        <SkeletonLoader variant="card" />
      </div>
    </main>
  );
}

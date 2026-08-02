import type { Metadata } from "next";
import Link from "next/link";
import { LESSON_ROUTE } from "@/lib/routes";

export const metadata: Metadata = { title: "Sort the System" };

/** S04 placeholder: the interactive activity lands at M3 (docs/roadmap/milestones.md). */
export default function ActivityPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-[680px] flex-1 px-4 py-16">
      <h1 className="text-heading font-bold">Sort the System is almost here</h1>
      <p className="mt-3 text-body text-ink-muted">
        The classification activity is being built right now. The lesson has everything you need in
        the meantime.
      </p>
      <div className="mt-6">
        <Link
          href={LESSON_ROUTE}
          className="inline-flex min-h-11 items-center rounded-(--radius-control) bg-primary px-5 py-2.5 text-body font-semibold text-surface hover:bg-primary-strong"
        >
          Back to the lesson
        </Link>
      </div>
    </main>
  );
}

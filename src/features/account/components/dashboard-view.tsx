"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { SectionUnits, useDeviceStore } from "@/features/progress";
import { track } from "@/lib/analytics";
import { LESSON_ROUTE } from "@/lib/routes";
import { strings } from "@/lib/strings";
import { usePreviewSession } from "../use-preview-session";

/**
 * S11 dashboard (docs/product/screens/auth-and-dashboard.md): continue card on
 * top, section status with per-step state, the graded record, next-step
 * preview, and a friendly empty state.
 *
 * Progress still comes from device storage, because guest migration is an M6
 * server action. That means this renders the same data the pathway does; it is
 * the account-shaped view of it, not a second source of truth.
 */
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function DashboardView() {
  const { hydrated: sessionHydrated, session } = usePreviewSession();
  const { snapshot, resume, status } = useDeviceStore();
  const fired = useRef(false);

  useEffect(() => {
    if (session && !fired.current) {
      fired.current = true;
      track("dashboard_viewed", {});
    }
  }, [session]);

  if (!sessionHydrated) {
    return <p className="text-body text-ink-muted">Loading your dashboard...</p>;
  }

  if (!session) {
    return (
      <div className="panel p-6">
        <p className="eyebrow">Accounts are coming</p>
        <p className="mt-3 text-body">{strings.account.guestOnly}</p>
        <Link
          href={LESSON_ROUTE}
          className="mt-5 inline-flex min-h-11 items-center rounded-(--radius-control) bg-primary px-5 py-2.5 text-body font-semibold text-surface-card hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {strings.actions.startLearning}
        </Link>
      </div>
    );
  }

  const started = status !== "not_started";
  const assessment = snapshot?.assessment ?? null;

  return (
    <div className="flex flex-col gap-6">
      <div className="panel p-6">
        <p className="eyebrow">Signed in as {session.user.email}</p>
        <p className="mt-2 font-display text-heading font-bold">
          Welcome back, {session.user.name}
        </p>
        {started && resume ? (
          <>
            <p className="mt-3 text-body text-ink-muted">
              You left off at {resume.label}. Pick it up where it stopped.
            </p>
            <Link
              href={resume.href}
              onClick={() => track("dashboard_continue_clicked", {})}
              className="mt-5 inline-flex min-h-11 items-center rounded-(--radius-control) bg-primary px-5 py-2.5 text-body font-semibold text-surface-card shadow-(--shadow-card) hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {strings.actions.continue}
            </Link>
          </>
        ) : (
          <>
            <p className="mt-3 text-body text-ink-muted">{strings.account.emptyState}</p>
            <Link
              href={LESSON_ROUTE}
              onClick={() => track("dashboard_continue_clicked", {})}
              className="mt-5 inline-flex min-h-11 items-center rounded-(--radius-control) bg-primary px-5 py-2.5 text-body font-semibold text-surface-card shadow-(--shadow-card) hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {strings.actions.startLearning}
            </Link>
          </>
        )}
      </div>

      <section aria-label="Section progress" className="panel p-6">
        <p className="eyebrow">{strings.pathway.sectionOneTitle}</p>
        <p className="mt-2 text-body text-ink-muted">
          Every step in the section, and where you are in each.
        </p>
        <SectionUnits />
      </section>

      <section aria-label="Graded record" className="panel p-6">
        <p className="eyebrow">Graded record</p>
        {assessment && assessment.attempts > 0 ? (
          <>
            <p className="mt-2 text-body">
              <span className="font-semibold">
                {assessment.passed ? "Passed" : "Not passed yet"}
              </span>
              {assessment.bestScore !== null && assessment.total !== null
                ? ` with a best of ${assessment.bestScore} of ${assessment.total}`
                : ""}
              {` across ${assessment.attempts} ${assessment.attempts === 1 ? "attempt" : "attempts"}.`}
            </p>
            {assessment.lastAttemptAt ? (
              <p className="mt-1 text-caption text-ink-muted">
                Last attempt {formatDate(assessment.lastAttemptAt)}.
              </p>
            ) : null}
            <p className="mt-3 text-caption text-ink-muted">
              Only the most recent attempt is kept on this device. A full attempt history needs an
              account, and arrives with it.
            </p>
          </>
        ) : (
          <p className="mt-2 text-body text-ink-muted">
            No graded attempt yet. The assessment can be retaken any time, and draws different
            questions each time.
          </p>
        )}
      </section>

      <Link
        href="/learn#next"
        className="panel flex flex-wrap items-center gap-6 p-6 transition-all duration-(--duration-state) hover:-translate-y-0.5 hover:shadow-(--shadow-card-hover) focus-visible:outline-2 focus-visible:outline-primary"
      >
        <div className="flex-1">
          <p className="eyebrow">What comes next</p>
          <p className="mt-2 font-display text-subheading font-bold text-ink">
            Applying AI at Work
          </p>
          <p className="mt-1 text-body text-ink-muted">{strings.pathway.previewNote}</p>
        </div>
        <span
          aria-hidden="true"
          className="flex h-11 w-11 items-center justify-center rounded-(--radius-chip) bg-primary-tint text-subheading font-bold text-primary"
        >
          →
        </span>
      </Link>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { readDevice } from "@/lib/device-store";
import { track } from "@/lib/analytics";
import { strings } from "@/lib/strings";
import { SectionMicrostatus, SectionStatusChip } from "./section-status";
import { SectionUnits } from "./section-units";
import { useDeviceStore } from "../use-device-store";

/**
 * S02 section list: the seven sections as equals, in learner order
 * (docs/content/content-map.md decision 7; content-map is the source of the
 * list via strings.pathway.sections). The page previously presented section 3
 * as the product with six teasers below it, which stopped being true the day
 * the other six published.
 *
 * Status per section is honest and device-derived. The first section keeps its
 * richer tracking (snapshot-based chip and microstatus); the others read their
 * own scoped keys.
 */
const CLASSIC_SLUG = "ai-automation-software";

type SectionStatus = "not_started" | "in_progress" | "complete";

const STATUS_LABEL: Record<SectionStatus, string> = {
  not_started: "Not started",
  in_progress: "In progress",
  complete: "Complete",
};

const STATUS_CLASS: Record<SectionStatus, string> = {
  not_started: "bg-surface-alt text-ink-muted",
  in_progress: "bg-primary-tint text-primary",
  complete: "bg-success-tint text-success",
};

function readScopedStatus(slug: string): SectionStatus {
  const outcome = readDevice<{ passed?: boolean } | null>(`ba.v1.assessment.${slug}`, null);
  if (outcome?.passed) return "complete";
  const lesson = readDevice<{ completed?: number[] } | null>(`ba.v1.lesson.${slug}`, null);
  const activity = readDevice<{ answers?: Record<string, unknown> } | null>(
    `ba.v1.activity.${slug}`,
    null,
  );
  const started =
    (lesson?.completed?.length ?? 0) > 0 || Object.keys(activity?.answers ?? {}).length > 0;
  return started ? "in_progress" : "not_started";
}

function ScopedStatusChip({ slug }: { slug: string }) {
  const [status, setStatus] = useState<SectionStatus>("not_started");
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time post-mount device-storage hydration
    setStatus(readScopedStatus(slug));
  }, [slug]);
  return (
    <span
      className={`rounded-(--radius-chip) px-3 py-0.5 text-caption font-semibold ${STATUS_CLASS[status]}`}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}

/** Unit metadata built server-side from the seeds (learn/page.tsx). */
export interface SectionUnitsData {
  stages: { label: string; minutes: number }[];
  activity: string | null;
  check: string | null;
  assessment: boolean;
}

interface UnitRow {
  label: string;
  detail: string;
  href: string;
  done: boolean;
}

function useSectionUnitState(slug: string) {
  const [state, setState] = useState<{
    lesson: number[];
    activity: boolean;
    check: boolean;
    assessment: boolean;
  }>({ lesson: [], activity: false, check: false, assessment: false });

  useEffect(() => {
    const lesson = readDevice<{ completed?: number[] } | null>(`ba.v1.lesson.${slug}`, null);
    const activity = readDevice<{ completed?: boolean } | null>(`ba.v1.activity.${slug}`, null);
    const check = readDevice<{ completed?: boolean } | null>(`ba.v1.knowledge-check.${slug}`, null);
    const outcome = readDevice<{ passed?: boolean } | null>(`ba.v1.assessment.${slug}`, null);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time post-mount device-storage hydration
    setState({
      lesson: lesson?.completed ?? [],
      activity: activity?.completed ?? false,
      check: check?.completed ?? false,
      assessment: outcome?.passed ?? false,
    });
  }, [slug]);

  return state;
}

/**
 * The expandable unit list for a generic section: every stage and step with
 * its own completion state and a direct link, mirroring the first section's
 * unit rows so choosing where to go next works the same everywhere.
 */
function GenericSectionUnits({
  slug,
  route,
  data,
}: {
  slug: string;
  route: string;
  data: SectionUnitsData;
}) {
  const state = useSectionUnitState(slug);

  const rows: UnitRow[] = [
    ...data.stages.map((stage, index) => ({
      label: stage.label,
      detail: `${stage.minutes} min`,
      href: `${route}#stage-${index}`,
      done: state.lesson.includes(index),
    })),
    ...(data.activity
      ? [
          {
            label: data.activity,
            detail: "6-8 min",
            href: `${route}/activity`,
            done: state.activity,
          },
        ]
      : []),
    ...(data.check
      ? [{ label: data.check, detail: "3 min", href: `${route}/check`, done: state.check }]
      : []),
    ...(data.assessment
      ? [
          {
            label: "Graded assessment",
            detail: "5 min",
            href: `${route}/assessment`,
            done: state.assessment,
          },
        ]
      : []),
  ];

  return (
    <ol className="mt-1 divide-y divide-border rounded-(--radius-card) border border-border bg-surface-card">
      {rows.map((row, index) => (
        <li key={row.label}>
          <Link
            href={row.href}
            className={`flex min-h-12 items-center gap-3 px-4 py-2 hover:bg-primary-tint/50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary ${
              row.done ? "bg-success-tint/40" : ""
            }`}
          >
            <span
              aria-hidden="true"
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-caption font-bold ${
                row.done ? "bg-success text-white" : "bg-surface-alt text-ink-muted"
              }`}
            >
              {row.done ? "✓" : index + 1}
            </span>
            <span className="flex-1 text-body">
              {row.label}
              <span className="sr-only">{row.done ? ", completed" : ", not started"}</span>
            </span>
            <span
              className={`shrink-0 text-caption ${row.done ? "font-semibold text-success" : "text-ink-muted"}`}
            >
              {row.done ? "Done" : row.detail}
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}

export function PathwaySections({ units }: { units: Record<string, SectionUnitsData> }) {
  // Subscribed once here so the classic card's chip re-renders with the rest,
  // and to surface the optional capstone once the classic assessment passes.
  const { hydrated, snapshot } = useDeviceStore();
  const classicPassed = hydrated && (snapshot?.assessment?.passed ?? false);

  return (
    <ol className="flex flex-col gap-4">
      {strings.pathway.sections.map((section) => {
        const route = `/learn/ai-awareness/${section.slug}`;
        const classic = section.slug === CLASSIC_SLUG;
        return (
          <li key={section.slug} className="panel p-6">
            <Link
              href={route}
              onClick={() => track("section_card_clicked", { section: section.slug })}
              className="group block focus-visible:outline-2 focus-visible:outline-primary"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 items-center justify-center rounded-(--radius-chip) bg-primary font-display text-subheading font-bold text-surface-card"
                >
                  {section.position}
                </span>
                <span className="font-display text-subheading font-semibold text-ink group-hover:text-primary">
                  {section.title}
                </span>
                {classic ? <SectionStatusChip /> : <ScopedStatusChip slug={section.slug} />}
                <span className="ml-auto text-caption text-ink-muted">{section.minutes}</span>
              </div>
              <p className="mt-3 text-body text-ink-muted">{section.description}</p>
              {classic ? <SectionMicrostatus /> : null}
            </Link>
            <details className="group mt-4">
              <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-(--radius-control) px-2 py-1 text-body font-semibold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-primary [&::-webkit-details-marker]:hidden">
                <span aria-hidden="true" className="transition-transform group-open:rotate-90">
                  ▸
                </span>
                Show the steps
              </summary>
              {classic ? (
                <SectionUnits />
              ) : (
                <GenericSectionUnits
                  slug={section.slug}
                  route={route}
                  data={
                    units[section.slug] ?? {
                      stages: [],
                      activity: null,
                      check: null,
                      assessment: false,
                    }
                  }
                />
              )}
            </details>
            {classic && classicPassed ? (
              <Link
                href={`${route}/capstone`}
                className="mt-3 inline-block text-body font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-primary"
              >
                Capstone: audit an AI claim at work
              </Link>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

/**
 * A pilot pathway's single-section card, below the main pathway list. Same
 * visual language as the section cards (panel, status chip, expandable unit
 * rows) so the pilot reads as a real course, honestly labelled as a pilot
 * rather than dressed up as a finished pathway.
 */
export function PilotSectionCard({
  pathway,
  section,
  units,
}: {
  pathway: { slug: string; title: string; description: string };
  section: { slug: string; title: string; description: string };
  units: SectionUnitsData;
}) {
  const route = `/learn/${pathway.slug}/${section.slug}`;
  return (
    <section aria-label={pathway.title} className="mt-8">
      <p className="eyebrow">Pilot pathway</p>
      <h2 className="mt-2 font-display text-subheading font-bold">{pathway.title}</h2>
      <p className="mt-1 max-w-[62ch] text-body text-ink-muted">{pathway.description}</p>
      <div className="panel mt-4 p-6">
        <Link
          href={route}
          onClick={() => track("section_card_clicked", { section: section.slug })}
          className="group block focus-visible:outline-2 focus-visible:outline-primary"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center rounded-(--radius-chip) bg-primary font-display text-subheading font-bold text-surface-card"
            >
              1
            </span>
            <span className="flex-1 font-display text-subheading font-bold group-hover:text-primary">
              {section.title}
            </span>
            <ScopedStatusChip slug={section.slug} />
          </div>
          <p className="mt-3 text-body text-ink-muted">{section.description}</p>
        </Link>
        <details className="group mt-4">
          <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 text-body font-semibold text-primary [&::-webkit-details-marker]:hidden">
            <span aria-hidden="true" className="transition-transform group-open:rotate-90">
              ▸
            </span>
            Show the steps
          </summary>
          <GenericSectionUnits slug={section.slug} route={route} data={units} />
        </details>
      </div>
    </section>
  );
}

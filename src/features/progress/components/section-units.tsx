"use client";

import Link from "next/link";
import { LESSON_ROUTE } from "@/lib/routes";
import { useDeviceStore } from "../use-device-store";

/**
 * Section units (experience-plan Phase C, ADR-042): the lesson's four stages
 * plus the challenge, practice, and assessment presented as real completion
 * units on the pathway - each 5-7 minutes, each deep-linkable, each with its
 * own visible state. Momentum through structure, not styling.
 */
const LESSON_UNITS = [
  { label: "Rules and deterministic outputs", hash: "#p1-lesson-002", stage: 1 },
  { label: "Triggers and automation", hash: "#p1-lesson-003", stage: 2 },
  { label: "Patterns, confidence, and AI", hash: "#p1-lesson-004", stage: 3 },
  { label: "Combined systems and human review", hash: "#p1-lesson-005", stage: 4 },
];

export function SectionUnits() {
  const { hydrated, snapshot } = useDeviceStore();
  const stagesDone = snapshot?.lesson?.stagesCompleted ?? 0;
  const activityDone = snapshot?.activity?.completed ?? false;
  const checkDone = snapshot?.check?.completed ?? false;
  const passed = snapshot?.assessment?.passed ?? false;

  function state(done: boolean, minutes: string): { text: string; cls: string } {
    if (!hydrated) return { text: minutes, cls: "text-ink-muted" };
    return done
      ? { text: "Done", cls: "font-semibold text-success" }
      : { text: minutes, cls: "text-ink-muted" };
  }

  const rows = [
    ...LESSON_UNITS.map((unit) => ({
      label: unit.label,
      href: `${LESSON_ROUTE}${unit.hash}`,
      // Stage indices are 0-based with Start Here at 0; completion of stage n
      // is tracked by the journey, surfaced through stagesCompleted.
      ...state(stagesDone > unit.stage, "5-7 min"),
    })),
    {
      label: "Section challenge: Sort the System",
      href: `${LESSON_ROUTE}/activity`,
      ...state(activityDone, "6-8 min"),
    },
    {
      label: "Practice check",
      href: `${LESSON_ROUTE}/check`,
      ...state(checkDone, "3 min"),
    },
    {
      label: "Graded assessment",
      href: `${LESSON_ROUTE}/assessment`,
      ...state(passed, "5 min"),
    },
    ...(hydrated && passed
      ? [
          {
            label: "Capstone: audit an AI claim at work",
            href: `${LESSON_ROUTE}/capstone`,
            text: "Optional",
            cls: "text-primary font-semibold",
          },
        ]
      : []),
  ];

  return (
    <ol className="mt-4 divide-y divide-border rounded-(--radius-card) border border-border bg-surface-card">
      {rows.map((row, index) => (
        <li key={row.label}>
          <Link
            href={row.href}
            className="flex min-h-12 items-center gap-3 px-4 py-2 hover:bg-primary-tint/50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
          >
            <span
              aria-hidden="true"
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-caption font-bold ${
                row.text === "Done" ? "bg-success text-white" : "bg-surface-alt text-ink-muted"
              }`}
            >
              {row.text === "Done" ? "✓" : index + 1}
            </span>
            <span className="flex-1 text-body">{row.label}</span>
            <span className={`text-caption ${row.cls}`}>{row.text}</span>
          </Link>
        </li>
      ))}
    </ol>
  );
}

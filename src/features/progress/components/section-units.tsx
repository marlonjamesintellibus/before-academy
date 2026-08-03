"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LESSON_ROUTE } from "@/lib/routes";
import { readDevice } from "@/lib/device-store";
import { useDeviceStore } from "../use-device-store";

/**
 * Section units (experience-plan Phase C, ADR-042): the lesson's five stages
 * plus the challenge, practice, and assessment presented as real completion
 * units on the pathway - each deep-linkable, each with its own visible state.
 *
 * Labels mirror the lesson's own stage names so a learner meets one name per
 * unit, not two, and each carries a plain-language line underneath.
 */
const LESSON_KEY = "ba.v1.lesson.ai-automation-software";

interface StoredLesson {
  active: number;
  completed: number[];
}

function isStoredLesson(value: unknown): value is StoredLesson {
  if (!value || typeof value !== "object") return false;
  return Array.isArray((value as StoredLesson).completed);
}

const LESSON_UNITS = [
  {
    label: "Start here",
    detail: "Look past the label",
    hash: "#p1-lesson-001-hook",
    stage: 0,
    minutes: "3 min",
  },
  {
    label: "Traditional software",
    detail: "Follow the written rules",
    hash: "#p1-lesson-002",
    stage: 1,
    minutes: "4 min",
  },
  {
    label: "Automation",
    detail: "Follow the workflow",
    hash: "#p1-lesson-003",
    stage: 2,
    minutes: "4 min",
  },
  {
    label: "Artificial intelligence",
    detail: "Follow the learned patterns",
    hash: "#p1-lesson-004",
    stage: 3,
    minutes: "5 min",
  },
  {
    label: "Compare and apply",
    detail: "Find each mechanism in a real system",
    hash: "#p1-lesson-005",
    stage: 4,
    minutes: "4 min",
  },
];

export function SectionUnits() {
  const { hydrated, snapshot } = useDeviceStore();
  const [stagesDone, setStagesDone] = useState<number[]>([]);

  useEffect(() => {
    // Stage completion is a set, not a count: nothing is locked (ADR-003), so a
    // learner can finish stage 4 before stage 1 and both must read as done.
    const stored = readDevice<StoredLesson | null>(LESSON_KEY, null, isStoredLesson);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time post-mount device-storage hydration
    setStagesDone(stored?.completed ?? []);
  }, []);

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
      detail: unit.detail,
      href: `${LESSON_ROUTE}${unit.hash}`,
      ...state(stagesDone.includes(unit.stage), unit.minutes),
    })),
    {
      label: "Sort the System",
      detail: "Classify ten everyday systems, with feedback on every one",
      href: `${LESSON_ROUTE}/activity`,
      ...state(activityDone, "6-8 min"),
    },
    {
      label: "Practice check",
      detail: "A few quick questions, not graded",
      href: `${LESSON_ROUTE}/check`,
      ...state(checkDone, "3 min"),
    },
    {
      label: "Graded assessment",
      detail: "Pass at 80 percent, retake any time with new questions",
      href: `${LESSON_ROUTE}/assessment`,
      ...state(passed, "5 min"),
    },
    ...(hydrated && passed
      ? [
          {
            label: "Capstone: audit an AI claim at work",
            detail: "Take the skill to something on your own desk",
            href: `${LESSON_ROUTE}/capstone`,
            text: "Optional",
            cls: "text-primary font-semibold",
          },
        ]
      : []),
  ];

  return (
    <ol className="mt-4 divide-y divide-border rounded-(--radius-card) border border-border bg-surface-card">
      {rows.map((row, index) => {
        const done = row.text === "Done";
        return (
          <li key={row.label}>
            <Link
              href={row.href}
              className={`flex min-h-12 items-center gap-3 px-4 py-3 hover:bg-primary-tint/50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary ${
                done ? "bg-success-tint/40" : ""
              }`}
            >
              <span
                aria-hidden="true"
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-caption font-bold ${
                  done ? "bg-success text-white" : "bg-surface-alt text-ink-muted"
                }`}
              >
                {done ? "✓" : index + 1}
              </span>
              <span className="flex-1">
                <span className="block text-body">{row.label}</span>
                <span className="block text-caption text-ink-muted">{row.detail}</span>
              </span>
              <span className={`shrink-0 text-caption ${row.cls}`}>{row.text}</span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}

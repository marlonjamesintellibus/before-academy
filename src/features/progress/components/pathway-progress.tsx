"use client";

import { useDeviceStore } from "../use-device-store";

/**
 * S02 pathway progress summary (docs/product/screens/marketing-and-pathway.md).
 * The four section steps rolled into one line. Visual bar is decorative; the
 * count carries the meaning in text, per design-system v3.
 */
const TOTAL_STEPS = 4;

export function PathwayProgress() {
  const { hydrated, snapshot } = useDeviceStore();

  const lessonDone = snapshot?.lesson
    ? snapshot.lesson.stagesCompleted >= snapshot.lesson.totalStages
    : false;
  const done = hydrated
    ? [
        lessonDone,
        snapshot?.activity?.completed,
        snapshot?.check?.completed,
        snapshot?.assessment?.passed,
      ].filter(Boolean).length
    : 0;
  const percent = Math.round((done / TOTAL_STEPS) * 100);

  return (
    <div className="panel p-5">
      <p className="eyebrow">Your progress</p>
      <p className="mt-2 text-body font-semibold">
        {done} of {TOTAL_STEPS} steps done
      </p>
      <div className="progress-track mt-3" aria-hidden="true">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
      <p className="mt-3 text-caption text-ink-muted">
        Nothing is locked, so you can jump to any step and come back.
      </p>
    </div>
  );
}

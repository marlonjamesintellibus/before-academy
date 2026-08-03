"use client";

import { useEffect, useState } from "react";
import { readDevice } from "@/lib/device-store";
import { strings } from "@/lib/strings";

/**
 * S02 pathway progress summary. Counts sections whose graded assessment is
 * passed, out of all seven, reading each section's scoped outcome key. This
 * replaced a "n of 4 steps" panel that counted one section's steps while
 * presenting itself as pathway progress.
 */
export function PathwayProgress() {
  const [done, setDone] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const count = strings.pathway.sections.filter((section) => {
      const outcome = readDevice<{ passed?: boolean } | null>(
        `ba.v1.assessment.${section.slug}`,
        null,
      );
      return outcome?.passed === true;
    }).length;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time post-mount device-storage hydration
    setDone(count);
    setHydrated(true);
  }, []);

  const total = strings.pathway.sections.length;
  const percent = Math.round((done / total) * 100);

  return (
    <div className="panel p-5">
      <p className="eyebrow">Your progress</p>
      <p className="mt-2 text-body font-semibold">
        {hydrated ? done : 0} of {total} sections complete
      </p>
      <div className="progress-track mt-3" aria-hidden="true">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
      <p className="mt-3 text-caption text-ink-muted">
        A section is complete when its graded questions are passed. Nothing is locked, so take them
        in any order.
      </p>
    </div>
  );
}

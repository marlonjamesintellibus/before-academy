"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Device-stored activity state (docs/engineering/standards.md: storage access
 * lives only in dedicated hooks; ADR-025 device-only guests). Mid-activity
 * resume survives refresh; storage failure degrades to in-memory (private
 * browsing keeps working, ux-copy promise).
 */
/**
 * The first section keeps the original bare key so nobody's mid-activity
 * progress is lost by this generalization; every other section scopes by slug.
 */
export const CLASSIC_ACTIVITY_KEY = "ba.v1.activity";

export interface ScenarioAnswer {
  chosen: string;
  correct: boolean;
  skipped: boolean;
}

export interface ActivityState {
  answers: Record<string, ScenarioAnswer>;
  index: number;
  completed: boolean;
  /** Retake ordering (scenario ids); absent = canonical 1..10 first run. */
  order?: string[];
}

const EMPTY: ActivityState = { answers: {}, index: 0, completed: false };

function read(storageKey: string): ActivityState {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as ActivityState;
    if (typeof parsed.index !== "number" || typeof parsed.answers !== "object") return EMPTY;
    return parsed;
  } catch {
    return EMPTY;
  }
}

export function useActivityState(storageKey: string = CLASSIC_ACTIVITY_KEY) {
  const [state, setState] = useState<ActivityState>(EMPTY);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Hydrate from device storage after mount: the server render must not read
    // localStorage, so the one-time post-mount setState is intentional.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(read(storageKey));
    setHydrated(true);
  }, [storageKey]);

  const update = useCallback(
    (next: ActivityState) => {
      setState(next);
      try {
        localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {
        // Private browsing: progress can't persist but the activity still works.
      }
    },
    [storageKey],
  );

  /**
   * "Try the set again": shuffled order, except the fixed 6→7 minimal pair
   * stays adjacent and in order (classification-activity.md binding decision).
   */
  const retry = useCallback(
    (scenarioIds: string[], pair: [string, string]) => {
      const shuffled = [...scenarioIds].sort(() => Math.random() - 0.5);
      const withoutSecond = shuffled.filter((id) => id !== pair[1]);
      const firstIndex = withoutSecond.indexOf(pair[0]);
      withoutSecond.splice(firstIndex + 1, 0, pair[1]);
      update({ answers: {}, index: 0, completed: false, order: withoutSecond });
    },
    [update],
  );

  return { state, hydrated, update, retry };
}

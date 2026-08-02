"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Device-stored activity state (docs/engineering/standards.md: storage access
 * lives only in dedicated hooks; ADR-025 device-only guests). Mid-activity
 * resume survives refresh; storage failure degrades to in-memory (private
 * browsing keeps working, ux-copy promise).
 */
const STORAGE_KEY = "ba.v1.activity";

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

function read(): ActivityState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as ActivityState;
    if (typeof parsed.index !== "number" || typeof parsed.answers !== "object") return EMPTY;
    return parsed;
  } catch {
    return EMPTY;
  }
}

export function useActivityState() {
  const [state, setState] = useState<ActivityState>(EMPTY);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Hydrate from device storage after mount: the server render must not read
    // localStorage, so the one-time post-mount setState is intentional.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(read());
    setHydrated(true);
  }, []);

  const update = useCallback((next: ActivityState) => {
    setState(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Private browsing: progress can't persist but the activity still works.
    }
  }, []);

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

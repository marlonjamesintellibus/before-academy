"use client";

import { useCallback, useEffect, useState } from "react";

/** The first section keeps its original key; other sections scope by slug. */
export const CLASSIC_CHECK_KEY = "ba.v1.knowledge-check.ai-automation-software";

export interface SavedCheckAnswer {
  selectedId: string;
  correct: boolean;
  submitted: boolean;
}

export interface CheckState {
  version: 1;
  started: boolean;
  index: number;
  answers: Record<string, SavedCheckAnswer>;
  completed: boolean;
  attempt: number;
}

const EMPTY: CheckState = {
  version: 1,
  started: false,
  index: 0,
  answers: {},
  completed: false,
  attempt: 1,
};

function read(storageKey: string): CheckState {
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<CheckState>;
    if (
      parsed.version !== 1 ||
      typeof parsed.index !== "number" ||
      typeof parsed.answers !== "object" ||
      parsed.answers === null
    ) {
      return EMPTY;
    }
    return {
      ...EMPTY,
      ...parsed,
      answers: parsed.answers as Record<string, SavedCheckAnswer>,
    };
  } catch {
    return EMPTY;
  }
}

export function useCheckState(storageKey: string = CLASSIC_CHECK_KEY) {
  const [state, setState] = useState<CheckState>(EMPTY);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Browser-only device progress; server rendering must not touch localStorage.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(read(storageKey));
    setHydrated(true);
  }, [storageKey]);

  const update = useCallback(
    (next: CheckState) => {
      setState(next);
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {
        // Storage can be blocked; in-memory progress remains fully usable.
      }
    },
    [storageKey],
  );

  const retry = useCallback(() => {
    setState((current) => {
      const next = { ...EMPTY, started: true, attempt: current.attempt + 1 };
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {
        // Keep the new attempt in memory when device storage is unavailable.
      }
      return next;
    });
  }, [storageKey]);

  return { state, hydrated, update, retry };
}

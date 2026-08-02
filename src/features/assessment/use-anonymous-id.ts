"use client";

import { useEffect, useState } from "react";

/**
 * Guest identity (ADR-025): client-generated uuid at ba.v1.anonymous_id.
 * Doubles as the PostHog distinct_id, aliased to userId at conversion (M6).
 */
const KEY = "ba.v1.anonymous_id";

export function useAnonymousId(): string | null {
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    try {
      let value = localStorage.getItem(KEY);
      if (!value) {
        value = crypto.randomUUID();
        localStorage.setItem(KEY, value);
      }
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time device-storage hydration
      setId(value);
    } catch {
      setId(crypto.randomUUID());
    }
  }, []);

  return id;
}

"use client";

import { useEffect, useState } from "react";
import {
  PREVIEW_SESSION_EVENT,
  readPreviewSession,
  type PreviewSession,
} from "@/lib/preview-session";

/**
 * Reads the simulated session after mount, the same way every other device
 * surface hydrates (the server renders nothing session-dependent).
 *
 * M6 swaps the body of this hook for BetterAuth's session hook and the screens
 * that consume it do not change.
 */
export interface PreviewSessionState {
  hydrated: boolean;
  session: PreviewSession | null;
}

export function usePreviewSession(): PreviewSessionState {
  const [state, setState] = useState<PreviewSessionState>({ hydrated: false, session: null });

  useEffect(() => {
    const sync = () => setState({ hydrated: true, session: readPreviewSession() });
    sync();
    // Resync on sign-in/sign-out so the header updates without a full reload.
    window.addEventListener(PREVIEW_SESSION_EVENT, sync);
    return () => window.removeEventListener(PREVIEW_SESSION_EVENT, sync);
  }, []);

  return state;
}

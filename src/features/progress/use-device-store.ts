"use client";

import { useEffect, useState } from "react";
import { deviceStorageAvailable } from "@/lib/device-store";
import { readSnapshot, resumeTarget, sectionStatus } from "./snapshot";
import type { ProgressSnapshot, ResumeTarget, SectionStatus } from "./types";

/**
 * useDeviceStore (docs/engineering/standards.md): the sanctioned hook for
 * reading aggregated guest progress in shell surfaces. Hydrates after mount
 * (server renders nothing progress-dependent), degrades to empty in private
 * browsing.
 */
export interface DeviceProgress {
  hydrated: boolean;
  storageAvailable: boolean;
  snapshot: ProgressSnapshot | null;
  status: SectionStatus;
  resume: ResumeTarget | null;
}

export function useDeviceStore(): DeviceProgress {
  const [state, setState] = useState<DeviceProgress>({
    hydrated: false,
    storageAvailable: true,
    snapshot: null,
    status: "not_started",
    resume: null,
  });

  useEffect(() => {
    const available = deviceStorageAvailable();
    const snapshot = readSnapshot();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time post-mount device-storage hydration
    setState({
      hydrated: true,
      storageAvailable: available,
      snapshot,
      status: sectionStatus(snapshot),
      resume: resumeTarget(snapshot),
    });
  }, []);

  return state;
}

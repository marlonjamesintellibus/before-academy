"use client";

import { useEffect, useState } from "react";
import { deviceStorageAvailable, readDevice, writeDevice } from "@/lib/device-store";

/**
 * S13d guest storage notice (docs/product/screens/modals.md, ux-copy.md):
 * first-visit non-modal banner; dismissal persists per type. When storage is
 * unavailable (private browsing), the copy switches to the ux-copy private
 * mode string and dismissal lasts for the session only.
 */
const NOTICE_KEY = "ba.v1.notice.guest-storage";

export function StorageNotice() {
  const [visible, setVisible] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const ok = deviceStorageAvailable();
    const dismissed = ok
      ? readDevice<{ dismissed: boolean }>(NOTICE_KEY, { dismissed: false }).dismissed
      : false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time post-mount device-storage hydration
    setAvailable(ok);
    setVisible(!dismissed);
  }, []);

  if (!visible) return null;

  return (
    <div role="status" className="border-b border-border bg-surface-alt">
      <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center gap-x-4 gap-y-1 px-4 py-2.5 md:px-6">
        <p className="flex-1 text-caption text-ink-muted">
          {available
            ? "Your progress saves to this device. Clearing browser data will remove it. Create a free account any time to keep it everywhere."
            : "Progress can't be saved in this browsing mode, but you can still complete everything."}
        </p>
        <button
          type="button"
          aria-label="Dismiss"
          onClick={() => {
            setVisible(false);
            if (available) writeDevice(NOTICE_KEY, { dismissed: true });
          }}
          className="min-h-11 min-w-11 text-ink-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-primary"
        >
          ×
        </button>
      </div>
    </div>
  );
}

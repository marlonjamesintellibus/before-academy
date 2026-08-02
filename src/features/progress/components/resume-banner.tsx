"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";
import { useDeviceStore } from "../use-device-store";

/**
 * Resume banner (S01/S02, docs/product/screens/marketing-and-pathway.md):
 * "Continue where you left off: {step}". Renders nothing for fresh visitors.
 */
export function ResumeBanner() {
  const { hydrated, resume, status } = useDeviceStore();
  const shown = useRef(false);

  useEffect(() => {
    if (hydrated && resume && !shown.current) {
      shown.current = true;
      track("resume_banner_shown", { step: resume.label });
    }
  }, [hydrated, resume]);

  if (!hydrated || !resume) return null;

  return (
    <div role="status" className="border-b border-border bg-primary-tint">
      <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center gap-x-4 gap-y-1 px-4 py-2.5 md:px-6">
        <p className="flex-1 text-body text-ink">
          {status === "complete"
            ? "Section complete - your result is saved on this device."
            : `Continue where you left off: ${resume.label}`}
        </p>
        <Link
          href={resume.href}
          onClick={() => track("resume_banner_clicked", { step: resume.label })}
          className="min-h-11 content-center text-body font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-primary"
        >
          Continue
        </Link>
      </div>
    </div>
  );
}

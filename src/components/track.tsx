"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { useEffect, useRef } from "react";
import type { EventName, EventProperties } from "@/lib/events";
import { track } from "@/lib/analytics";

/** Fires a taxonomy event once on mount (e.g. home_viewed, pathway_viewed). */
export function TrackOnMount({
  event,
  properties,
}: {
  event: EventName;
  properties?: EventProperties;
}) {
  const fired = useRef(false);
  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    track(event, properties);
  }, [event, properties]);
  return null;
}

/** Fires once when the element scrolls into view (e.g. next_preview_viewed). */
export function TrackOnVisible({
  event,
  children,
  className,
}: {
  event: EventName;
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const fired = useRef(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting) && !fired.current) {
        fired.current = true;
        track(event);
        observer.disconnect();
      }
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [event]);
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** Link that fires a taxonomy event on click. */
export function TrackedLink({
  event,
  properties,
  ...rest
}: ComponentProps<typeof Link> & { event: EventName; properties?: EventProperties }) {
  return <Link {...rest} onClick={() => track(event, properties)} />;
}

/** Button that fires a taxonomy event on click (e.g. notify_me_clicked). */
export function TrackedButton({
  event,
  properties,
  children,
  className,
}: {
  event: EventName;
  properties?: EventProperties;
  children: ReactNode;
  className?: string;
}) {
  return (
    <button type="button" onClick={() => track(event, properties)} className={className}>
      {children}
    </button>
  );
}

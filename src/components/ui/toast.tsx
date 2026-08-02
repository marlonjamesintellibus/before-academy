"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";

/**
 * Toast (docs/product/components.md): success/info auto-dismiss 5s, error persists;
 * role=status (polite) for success/info, role=alert for errors; pauses on hover/focus.
 */
export interface ToastProps {
  variant: "success" | "error" | "info";
  onDismiss?: () => void;
  children: ReactNode;
}

const AUTO_DISMISS_MS = 5_000;

const VARIANT_CLASSES: Record<ToastProps["variant"], string> = {
  success: "border-success",
  error: "border-danger",
  info: "border-primary",
};

export function Toast({ variant, onDismiss, children }: ToastProps) {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (variant === "error" || paused || !onDismiss) return;
    const timer = setTimeout(onDismiss, AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, [variant, paused, onDismiss]);

  return (
    <div
      role={variant === "error" ? "alert" : "status"}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className={`flex items-center gap-3 rounded-(--radius-control) border-l-4 bg-surface-alt px-4 py-3 text-body shadow-sm ${VARIANT_CLASSES[variant]}`}
    >
      <div className="flex-1">{children}</div>
      {onDismiss ? (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss"
          className="min-h-11 min-w-11 rounded-(--radius-control) text-ink-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-primary"
        >
          ×
        </button>
      ) : null}
    </div>
  );
}

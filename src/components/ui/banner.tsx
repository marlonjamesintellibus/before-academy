"use client";

import type { ReactNode } from "react";

/**
 * Banner (docs/product/components.md): Resume / Guest storage / Content updated;
 * role=status; dismissal persists per type (persistence key handled by the caller's
 * device store — this component stays storage-agnostic).
 */
export interface BannerProps {
  onDismiss?: () => void;
  actionLabel?: string;
  onAction?: () => void;
  children: ReactNode;
}

export function Banner({ onDismiss, actionLabel, onAction, children }: BannerProps) {
  return (
    <div
      role="status"
      className="flex flex-wrap items-center gap-3 bg-highlight px-4 py-3 text-body text-ink"
    >
      <div className="flex-1">{children}</div>
      {actionLabel && onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="min-h-11 rounded-(--radius-control) px-3 font-semibold text-primary hover:text-primary-strong focus-visible:outline-2 focus-visible:outline-primary"
        >
          {actionLabel}
        </button>
      ) : null}
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

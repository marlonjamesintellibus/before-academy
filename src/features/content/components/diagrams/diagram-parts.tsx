import type { ReactNode } from "react";

export function DiagramObservation({ children }: { children: ReactNode }) {
  return (
    <p className="mt-4 border-l-4 border-primary pl-4 text-body text-ink">
      <strong>Pause and notice:</strong> {children}
    </p>
  );
}

export function DiagramTextAlternative({ children }: { children: ReactNode }) {
  return (
    <details className="mt-3 text-body text-ink-muted">
      <summary className="cursor-pointer font-semibold text-primary">
        Read the diagram as text
      </summary>
      <div className="mt-2">{children}</div>
    </details>
  );
}

/** Signals that a figure is manipulable, not an illustration (product feedback). */
export function InteractiveBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-(--radius-chip) bg-primary px-3 py-1 text-caption font-bold uppercase tracking-wide text-white">
      <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
        <path d="M3.5 1.5 v5.2 l1.4 -1.2 1 2.8 1.2 -0.5 -1 -2.7 1.9 -0.2 Z" fill="currentColor" />
      </svg>
      Interactive - try it
    </span>
  );
}

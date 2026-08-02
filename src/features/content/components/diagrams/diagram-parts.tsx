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

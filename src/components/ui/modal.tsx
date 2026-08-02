"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

/**
 * Modal (docs/product/interaction-patterns.md): focus trap, Esc closes, focus
 * returns to trigger, destructive action never default. Built on native <dialog>,
 * which provides the trap, Esc, and focus-return semantics.
 */
export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      aria-labelledby="modal-title"
      className="m-auto w-full max-w-md rounded-(--radius-modal) bg-surface p-6 text-ink backdrop:bg-ink/40"
    >
      <div className="flex items-start justify-between gap-4">
        <h2 id="modal-title" className="text-heading font-bold">
          {title}
        </h2>
        <button
          type="button"
          aria-label="Close"
          onClick={() => ref.current?.close()}
          className="min-h-11 min-w-11 shrink-0 rounded-(--radius-control) text-ink-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-primary"
        >
          ×
        </button>
      </div>
      <div className="mt-4">{children}</div>
    </dialog>
  );
}

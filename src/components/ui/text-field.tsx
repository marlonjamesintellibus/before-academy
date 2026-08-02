"use client";

import type { InputHTMLAttributes } from "react";
import { useId } from "react";

/**
 * TextField (docs/product/components.md): persistent label (never placeholder-as-label),
 * errors via aria-describedby, states default/focus/error/disabled.
 */
export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export function TextField({ label, error, hint, id, className = "", ...rest }: TextFieldProps) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const hintId = hint ? `${fieldId}-hint` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={fieldId} className="text-body font-semibold">
        {label}
      </label>
      {hint ? (
        <p id={hintId} className="text-caption text-ink-muted">
          {hint}
        </p>
      ) : null}
      <input
        id={fieldId}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={`min-h-11 rounded-(--radius-control) border px-3 py-2 text-body focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-primary disabled:bg-surface-alt disabled:opacity-60 ${error ? "border-danger" : "border-ink-muted"}`}
        {...rest}
      />
      {error ? (
        <p id={errorId} className="text-caption text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

import type { ButtonHTMLAttributes } from "react";

/**
 * Button (docs/product/components.md): Primary/Secondary/Tertiary/Destructive;
 * aria-busy while loading; disabled ONLY in-flight; 44×44 minimum target.
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "destructive";
  loading?: boolean;
}

const VARIANT_CLASSES: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "border-2 border-ink bg-primary text-surface shadow-[3px_3px_0_rgba(22,22,31,0.9)] hover:-translate-y-0.5 hover:bg-primary-strong",
  secondary:
    "border-2 border-ink text-ink shadow-[2px_2px_0_rgba(22,22,31,0.9)] hover:-translate-y-0.5 hover:bg-highlight",
  tertiary: "text-primary underline-offset-4 hover:underline",
  destructive: "bg-danger text-surface hover:opacity-90",
};

export function Button({
  variant = "primary",
  loading = false,
  className = "",
  children,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      className={`inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-(--radius-control) px-4 py-2 text-body font-semibold transition-all duration-(--duration-state) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-60 ${VARIANT_CLASSES[variant]} ${className}`}
      {...rest}
    >
      {loading ? (
        <span aria-hidden="true" className="animate-pulse">
          …
        </span>
      ) : null}
      {children}
    </button>
  );
}

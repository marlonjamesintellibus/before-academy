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
  primary: "bg-primary text-surface hover:bg-primary-strong",
  secondary: "border border-primary text-primary hover:bg-highlight",
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
      className={`inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-(--radius-control) px-4 py-2 text-body font-semibold transition-colors duration-(--duration-state) focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-60 ${VARIANT_CLASSES[variant]} ${className}`}
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

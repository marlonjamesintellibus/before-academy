import type { JSX, ReactNode } from "react";

/**
 * Callout (docs/product/components.md, design-system v3): tinted rounded card
 * with an SVG icon and colored heading - never a left-border stripe. The icon
 * is decorative (aria-hidden); meaning is always carried by the heading text.
 */
export interface CalloutProps {
  variant: "warning" | "info" | "success";
  title: string;
  /** Heading element for the title; results screens use h2 (outcome-first rule). */
  as?: "p" | "h2" | "h3";
  children: ReactNode;
}

const STYLES: Record<CalloutProps["variant"], { card: string; title: string }> = {
  warning: { card: "border-warning/30 bg-warning-tint", title: "text-warning" },
  info: { card: "border-primary/25 bg-primary-tint", title: "text-primary-strong" },
  success: { card: "border-success/30 bg-success-tint", title: "text-success" },
};

function WarningIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
      <path
        d="M14 4.5 L25 23 A1.8 1.8 0 0 1 23.4 25.5 H4.6 A1.8 1.8 0 0 1 3 23 Z"
        fill="var(--color-warning)"
        stroke="var(--color-warning)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <rect x="12.8" y="11" width="2.4" height="7" rx="1.2" fill="#ffffff" />
      <circle cx="14" cy="21.4" r="1.5" fill="#ffffff" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
      <circle cx="14" cy="14" r="11.5" fill="var(--color-primary)" />
      <circle cx="14" cy="8.6" r="1.6" fill="#ffffff" />
      <rect x="12.7" y="12" width="2.6" height="9" rx="1.3" fill="#ffffff" />
    </svg>
  );
}

function SuccessIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
      <circle cx="14" cy="14" r="11.5" fill="var(--color-success)" />
      <path
        d="M8.5 14.5 L12.4 18.4 L19.6 10.4"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ICONS: Record<CalloutProps["variant"], () => JSX.Element> = {
  warning: WarningIcon,
  info: InfoIcon,
  success: SuccessIcon,
};

export function Callout({ variant, title, as: Heading = "p", children }: CalloutProps) {
  const style = STYLES[variant];
  const Icon = ICONS[variant];
  return (
    <aside role="note" className={`rounded-(--radius-hero) border p-6 ${style.card}`}>
      <Icon />
      <Heading className={`mt-3 font-display text-subheading font-bold ${style.title}`}>
        {title}
      </Heading>
      <div className="mt-2 flex flex-col gap-2 text-body text-ink">{children}</div>
    </aside>
  );
}

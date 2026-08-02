/**
 * SkeletonLoader (docs/product/components.md): text/card variants; aria-hidden —
 * the surrounding container announces loading once (caller supplies the live region).
 */
export interface SkeletonLoaderProps {
  variant?: "text" | "card";
  lines?: number;
  className?: string;
}

export function SkeletonLoader({
  variant = "text",
  lines = 3,
  className = "",
}: SkeletonLoaderProps) {
  if (variant === "card") {
    return (
      <div
        aria-hidden="true"
        className={`h-32 animate-pulse rounded-(--radius-control) bg-surface-alt ${className}`}
      />
    );
  }
  return (
    <div aria-hidden="true" className={`flex flex-col gap-2 ${className}`}>
      {Array.from({ length: lines }, (_, index) => (
        <div
          key={index}
          className="h-4 animate-pulse rounded-(--radius-control) bg-surface-alt"
          style={{ width: index === lines - 1 ? "60%" : "100%" }}
        />
      ))}
    </div>
  );
}

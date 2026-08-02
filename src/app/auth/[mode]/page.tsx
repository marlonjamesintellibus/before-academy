import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

export const metadata: Metadata = { title: "Accounts" };

interface AuthPageProps {
  params: Promise<{ mode: string }>;
}

/**
 * S10 placeholder — BetterAuth UI lands at M6 (docs/roadmap/milestones.md).
 * Everything works without an account (ADR-004), so the placeholder routes
 * learners back into the product instead of dead-ending.
 */
export default async function AuthPage({ params }: AuthPageProps) {
  const { mode } = await params;
  if (mode !== "sign-in" && mode !== "sign-up") notFound();

  return (
    <main id="main" className="mx-auto w-full max-w-[680px] flex-1 px-4 py-16">
      <h1 className="text-heading font-bold">Accounts are coming soon</h1>
      <p className="mt-3 text-body text-ink-muted">
        Everything here works without an account — your progress saves to this device. Accounts add
        the option to keep it everywhere, and they&rsquo;re on the way.
      </p>
      <div className="mt-6">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center rounded-(--radius-control) bg-primary px-5 py-2.5 text-body font-semibold text-surface hover:bg-primary-strong"
        >
          Continue as guest
        </Link>
      </div>
    </main>
  );
}

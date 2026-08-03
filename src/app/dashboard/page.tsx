import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DashboardView } from "@/features/account";
import { previewAuthEnabled } from "@/lib/preview-session";
import { strings } from "@/lib/strings";

export const metadata: Metadata = { title: "Dashboard" };

/**
 * S11 dashboard (docs/product/screens/auth-and-dashboard.md).
 *
 * Runs on the simulated session until M6. `previewAuthEnabled()` returns false
 * whenever APP_ENV is production, so this route 404s there rather than showing
 * an account surface no real account can reach. M6 replaces this guard with the
 * middleware session redirect the spec calls for.
 */
export default function DashboardPage() {
  if (!previewAuthEnabled()) notFound();

  return (
    <main id="main" className="mx-auto w-full max-w-[880px] flex-1 px-4 py-12 md:px-6">
      <p className="eyebrow">Account</p>
      <h1 className="mt-3 text-display font-bold">{strings.account.dashboardTitle}</h1>
      <div className="mt-8">
        <DashboardView />
      </div>
    </main>
  );
}

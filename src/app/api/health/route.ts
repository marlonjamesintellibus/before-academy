import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

import { sql } from "drizzle-orm";
import { getDb } from "@/lib/db";

/**
 * Railway health check (docs/engineering/deployment.md): db round-trip + version.
 * Deploys gate on this returning ok before traffic shifts.
 */
export async function GET() {
  const version =
    process.env.APP_VERSION ?? process.env.RAILWAY_GIT_COMMIT_SHA?.slice(0, 7) ?? "dev";
  try {
    const start = Date.now();
    await getDb().execute(sql`select 1`);
    return NextResponse.json({ status: "ok", db_ms: Date.now() - start, version });
  } catch {
    return NextResponse.json({ status: "error", version }, { status: 503 });
  }
}

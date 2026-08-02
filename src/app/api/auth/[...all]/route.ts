import { getAuth } from "@/lib/auth-server";

/**
 * BetterAuth in-app route (ADR-016). Lazy so the auth instance (and its db
 * connection) is created per-request environment, not at build time.
 */
export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  return getAuth().handler(request);
}

export async function POST(request: Request): Promise<Response> {
  return getAuth().handler(request);
}

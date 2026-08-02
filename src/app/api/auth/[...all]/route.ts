import { getAuth } from "@/lib/auth-server";

/**
 * BetterAuth in-app route (ADR-016). Gated behind AUTH_ENABLED until the M6
 * auth milestone ships its UI - a live signup surface with no product around
 * it is pure attack surface. Lazy so the auth instance is created per-request
 * environment, not at build time.
 */
export const dynamic = "force-dynamic";

function enabled(): boolean {
  return process.env.AUTH_ENABLED === "true";
}

export async function GET(request: Request): Promise<Response> {
  if (!enabled()) return new Response(null, { status: 404 });
  return getAuth().handler(request);
}

export async function POST(request: Request): Promise<Response> {
  if (!enabled()) return new Response(null, { status: 404 });
  return getAuth().handler(request);
}

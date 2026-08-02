import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { getDb } from "@/lib/db";
import * as schema from "@/db/schema";

/**
 * BetterAuth in-app at /api/auth/[...all] (ADR-016; docs/engineering/auth.md).
 * Drizzle adapter → auth tables live in the application database (single
 * transactional boundary for guest migration). Email+password and Google only.
 * Sessions: httpOnly cookie, 30-day sliding. Google OAuth activates at M6 when
 * GOOGLE_CLIENT_ID/SECRET are provisioned.
 */
function createAuth() {
  return betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    secret: process.env.BETTER_AUTH_SECRET,
    database: drizzleAdapter(getDb(), {
      provider: "pg",
      schema: {
        user: schema.user,
        session: schema.session,
        account: schema.account,
        verification: schema.verification,
      },
    }),
    emailAndPassword: { enabled: true },
    session: {
      expiresIn: 60 * 60 * 24 * 30, // 30 days
      updateAge: 60 * 60 * 24, // sliding refresh
    },
  });
}

type Auth = ReturnType<typeof createAuth>;

let cached: Auth | undefined;

export function getAuth(): Auth {
  cached ??= createAuth();
  return cached;
}

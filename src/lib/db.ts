import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@/db/schema";

/**
 * Drizzle client over the pooled connection (ADR-019; docs/engineering/database.md).
 * Migrations run separately via drizzle-kit against DIRECT_DATABASE_URL.
 */
function createClient() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not set - see .env.example");
  }
  return drizzle(postgres(url, { prepare: false }), { schema });
}

type Database = ReturnType<typeof createClient>;

let cached: Database | undefined;

export function getDb(): Database {
  cached ??= createClient();
  return cached;
}

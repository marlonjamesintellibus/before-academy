import { defineConfig } from "drizzle-kit";

/**
 * Migrations are forward-only (ADR-023): expand → migrate → contract; no down
 * migrations. Generated SQL is reviewed in the PR and applied with
 * DIRECT_DATABASE_URL (unpooled) during release (docs/engineering/deployment.md).
 */
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema/index.ts",
  out: "./src/db/migrations",
  dbCredentials: {
    url: process.env.DIRECT_DATABASE_URL ?? "postgres://localhost:5432/before_academy",
  },
  strict: true,
  verbose: true,
});

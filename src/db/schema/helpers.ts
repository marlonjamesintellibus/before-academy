import { timestamp, uuid, text } from "drizzle-orm/pg-core";
import { uuidv7 } from "uuidv7";

/** uuid v7 primary key, generated app-side (docs/engineering/database.md conventions). */
export function id() {
  return uuid("id")
    .primaryKey()
    .$defaultFn(() => uuidv7());
}

/** created_at / updated_at everywhere (docs/engineering/database.md conventions). */
export const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
};

/** Learner-facing content tables carry locale, default 'en' — reserved shape, no runtime i18n in Phase 1. */
export const locale = {
  locale: text("locale").notNull().default("en"),
};

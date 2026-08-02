import { index, integer, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { id, timestamps } from "./helpers";
import { feedbackType } from "./enums";

/**
 * Ops tables (docs/engineering/database.md).
 * feedback_reports keep no learner FK - authorship is anonymized, not deleted,
 * on account deletion (docs/engineering/auth.md).
 */

export const feedbackReports = pgTable(
  "feedback_reports",
  {
    id: id(),
    type: feedbackType("type").notNull(),
    message: text("message").notNull(),
    route: text("route").notNull(),
    contentVersion: integer("content_version"),
    /** Optional, provided by the reporter; cleared on account deletion. */
    email: text("email"),
    /** Anonymized actor kind for triage - never a raw id. */
    actorKind: text("actor_kind").notNull(),
    ...timestamps,
  },
  (table) => [index("feedback_reports_route_idx").on(table.route)],
);

export const notifyRequests = pgTable(
  "notify_requests",
  {
    id: id(),
    /** What the requester wants to hear about (e.g. an upcoming section slug). */
    target: text("target").notNull(),
    email: text("email").notNull(),
    userId: uuid("user_id"),
    ...timestamps,
  },
  (table) => [index("notify_requests_target_idx").on(table.target)],
);

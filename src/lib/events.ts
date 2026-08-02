/**
 * Analytics events stub (ADR-031, ADR-032; docs/product/analytics-events.md).
 * Every event name must exist in the taxonomy - extending analytics means adding
 * the taxonomy row in the same PR (docs/implementation/extend-analytics.md).
 * PostHog wiring lands in a later milestone; this stub keeps call sites typed
 * and logs events in development so funnels can be traced before wiring.
 */
import { logger } from "@/lib/logger";

/** Event names from the taxonomy. Extend ONLY together with docs/product/analytics-events.md. */
export type EventName =
  | "home_viewed"
  | "cta_start_clicked"
  | "cta_assessment_first_clicked"
  | "pathway_viewed"
  | "section_card_clicked"
  | "preview_card_clicked"
  | "notify_me_clicked"
  | "lesson_viewed"
  | "lesson_completed_scroll"
  | "lesson_stage_started"
  | "lesson_stage_completed"
  | "lesson_resumed"
  | "glossary_term_opened"
  | "interaction_started"
  | "interaction_completed"
  | "interaction_retry_selected"
  | "layer_expanded"
  | "diagram_component_opened"
  | "diagram_text_alt_opened"
  | "hook_answered"
  | "confidence_submitted"
  | "continue_to_activity_clicked"
  | "activity_started"
  | "scenario_answered"
  | "feedback_review_link_clicked"
  | "activity_completed"
  | "check_started"
  | "check_question_answered"
  | "check_completed"
  | "remediation_chip_clicked"
  | "assessment_intro_viewed"
  | "assessment_selected"
  | "assessment_started"
  | "assessment_question_answered"
  | "assessment_submitted"
  | "assessment_result_viewed"
  | "assessment_abandoned"
  | "retake_clicked"
  | "review_category_clicked"
  | "remediation_viewed"
  | "remediation_block_completed"
  | "remediation_retake_clicked"
  | "next_preview_viewed"
  | "resume_banner_shown"
  | "resume_banner_clicked"
  | "conversion_prompt_shown"
  | "conversion_prompt_dismissed"
  | "conversion_prompt_accepted"
  | "auth_viewed"
  | "auth_completed"
  | "auth_abandoned"
  | "progress_migrated"
  | "dashboard_viewed"
  | "dashboard_continue_clicked"
  | "history_item_expanded"
  | "account_deletion_started"
  | "account_deleted"
  | "feedback_submitted"
  | "error_event"
  | "web_vital"
  | "diagnostic_item_answered"
  | "diagnostic_completed"
  | "prediction_committed"
  | "evidence_selected";

export interface EventProperties {
  [key: string]: string | number | boolean | undefined;
}

export function captureEvent(name: EventName, properties: EventProperties = {}): void {
  // PostHog server/client capture is wired at the analytics milestone.
  if (process.env.APP_ENV !== "production") {
    logger.debug({ event: name, ...properties }, "analytics.event");
  }
}

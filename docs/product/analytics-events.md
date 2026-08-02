---
title: UX Analytics Events
category: product
owner: product-owner
status: approved
used_by: [../engineering/analytics.md]
last_updated: 2026-07-31
---

# UX Analytics Events

Every event answers a documented Phase 1 question (ADR-032); nothing is collected "just in case". Common properties on all events: `anonymous_or_user_id, session_id, route, device_class, guest_or_registered, content_version, timestamp`. No PII pre-account.

| Event (properties) | Decision supported |
|---|---|
| lesson_viewed / lesson_completed_scroll | completion & pacing |
| layer_expanded (layer, concept) | do Explore Further / Go Deeper earn their place |
| diagram_component_opened / diagram_text_alt_opened | diagram comprehension value |
| hook_answered (chosen) | hook engagement |
| activity_started / scenario_answered (scenario_id, chosen, correct, attempt) / activity_completed | which distinctions are misunderstood; scenario quality |
| check_question_answered / check_completed / remediation_chip_clicked | immediate comprehension; chip usefulness |
| assessment_intro_viewed / assessment_started (route, attempt_number) | assessment-first adoption |
| assessment_question_answered (question_id, category, difficulty, chosen, time_to_answer) | question performance; threshold validation |
| assessment_submitted / assessment_result_viewed (passed, score, categories_failed) | first-attempt pass rate |
| assessment_abandoned (question_index) | attempt friction/length |
| remediation_viewed / remediation_block_completed / remediation_retake_clicked (+next result) | does targeted remediation work |
| confidence_submitted (value, stage) | confidence change pre→post |
| resume_banner_shown / clicked | does progress-saving matter |
| conversion_prompt_shown / dismissed / accepted (trigger) | best conversion moment; intrusiveness |
| auth_viewed / auth_completed (method) / auth_abandoned / progress_migrated | conversion funnel; migration reliability |
| feedback_submitted (type) · error_event (code, route) | content reliability; technical friction |
| home_viewed / cta_start_clicked / cta_assessment_first_clicked | F1 entry; landing effectiveness; assessment-first adoption |
| pathway_viewed / section_card_clicked / preview_card_clicked / notify_me_clicked | pathway navigation value; demand signal for upcoming sections |
| next_preview_viewed | post-completion interest in what's next |
| continue_to_activity_clicked | lesson→activity handoff friction |
| check_started | check adoption vs skip |
| feedback_review_link_clicked (scenario_id) | do wrong-answer review links get used |
| retake_clicked / review_category_clicked (category) | remediation-loop engagement from results |
| dashboard_viewed / dashboard_continue_clicked / history_item_expanded | dashboard resume value; history usefulness |
| account_deletion_started / account_deleted | deletion friction; churn signal (fires before data removal; carries no learner data) |

**Funnels:** F1 home→lesson→activity→check→assessment→pass · F2 assessment-first→result · F3 prompt→account→migration.

## Related Documents
- [../engineering/analytics.md](../engineering/analytics.md) - implementation, aliasing, server capture

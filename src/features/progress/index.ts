/**
 * progress feature public API. Cross-feature imports go through this index only
 * (lint-enforced, docs/engineering/repository.md).
 */
export { ResumeBanner } from "./components/resume-banner";
export { StorageNotice } from "./components/storage-notice";
export { SectionStatusChip, SectionMicrostatus } from "./components/section-status";
export { SectionUnits } from "./components/section-units";
export { SkillMap } from "./components/skill-map";
export { ReviewSession } from "./components/review-session";
export { Capstone } from "./components/capstone";
export { ResetProgress } from "./components/reset-progress";
export { useDeviceStore } from "./use-device-store";
export { buildSnapshot, readSnapshot, resumeTarget, sectionStatus } from "./snapshot";
export type {
  ProgressSnapshot,
  ResumeTarget,
  SectionStatus as SectionStatusValue,
  StoredAssessmentOutcome,
} from "./types";

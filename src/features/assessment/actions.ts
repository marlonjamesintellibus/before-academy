"use server";

import { randomUUID } from "node:crypto";
import { headers } from "next/headers";
import { z } from "zod";
import type { Actor } from "@/lib/actor";
import { captureServer } from "@/lib/analytics-server";
import { getAssessmentConfig } from "@/lib/config";
import { issueGuestToken, verifyGuestToken } from "@/lib/guest-token";
import type { Result } from "@/lib/result";
import { err, ok } from "@/lib/result";
import { withAction } from "@/lib/with-action";
import { SECTION_SLUG } from "@/lib/routes";
import { getAssessmentBank, getPathwayAssessmentBank, PATHWAY_SCOPE_PREFIX } from "./queries";
import { score } from "./scoring";
import { drawPathwayQuestions, drawQuestions, shuffle } from "./selection";
import type { AttemptPayload, AttemptResult } from "./types";

/**
 * createAttempt / submitAttempt (docs/engineering/api-contracts.md,
 * assessment-engine.md). Guest path (Phase 1 until M6 auth): server stays
 * stateless via the signed HMAC token; scoring is always server-side and the
 * client payload never contains is_correct or rationale. Registered attempts
 * persist rows from M6 using the same engine.
 */

function guestActor(anonymousId: string): Actor {
  return { kind: "guest", anonymousId };
}

const createAttemptHandler = withAction(
  {
    name: "createAttempt",
    schema: z.object({
      anonymousId: z.string().min(8).max(64),
      sectionSlug: z.string().min(1).max(64).default(SECTION_SLUG),
      attemptNumber: z.number().int().min(1).max(1000),
      previousQuestionIds: z.array(z.string().max(64)).max(20).default([]),
    }),
    rateLimit: "attempt",
  },
  async (input): Promise<Result<AttemptPayload>> => {
    // A scope of `pathway:<slug>` draws the Level 1 competency check across
    // every section instead of one bank (docs/content/content-map.md).
    const isPathway = input.sectionSlug.startsWith(PATHWAY_SCOPE_PREFIX);
    const bank = isPathway
      ? await getPathwayAssessmentBank(input.sectionSlug.slice(PATHWAY_SCOPE_PREFIX.length))
      : await getAssessmentBank(input.sectionSlug);
    if (bank.length === 0) {
      return err("NOT_FOUND", "The assessment is not available right now.");
    }

    const config = getAssessmentConfig();
    const drawn = isPathway
      ? drawPathwayQuestions(bank, config.pathwayDrawSize, input.previousQuestionIds)
      : drawQuestions(bank, input.previousQuestionIds);
    const token = issueGuestToken({
      sectionSlug: input.sectionSlug,
      questionIds: drawn.map((question) => question.id),
      issuedAt: Date.now(),
      attemptNumber: input.attemptNumber,
      anonymousId: input.anonymousId,
    });

    return ok({
      token,
      attemptNumber: input.attemptNumber,
      questions: drawn.map((question) => ({
        id: question.id,
        format: question.format,
        category: question.category,
        stem: question.stem,
        options: (question.rotateOptions ? shuffle(question.options) : question.options).map(
          (option) => ({ id: option.id, text: option.text }),
        ),
      })),
    });
  },
);

const submitAttemptHandler = withAction(
  {
    name: "submitAttempt",
    schema: z.object({
      anonymousId: z.string().min(8).max(64),
      token: z.string().min(16).max(4096),
      answers: z
        .array(
          z.object({
            questionId: z.string().max(64),
            optionIds: z.array(z.string().max(64)).min(1).max(8),
          }),
        )
        .min(1)
        .max(10),
      sectionSlug: z.string().min(1).max(64).default(SECTION_SLUG),
      idempotencyKey: z.string().min(8).max(64),
    }),
    rateLimit: "attempt",
  },
  async (input): Promise<Result<AttemptResult>> => {
    const config = getAssessmentConfig();
    const claims = verifyGuestToken(input.token, config.tokenTtlMs);
    // The section must match the signed claim as well as the guest: a token is
    // authorization for one bank, not for whichever bank the caller names.
    if (
      !claims ||
      claims.anonymousId !== input.anonymousId ||
      claims.sectionSlug !== input.sectionSlug
    ) {
      return err("VALIDATION", "This attempt has expired. Start a fresh one - no penalty.", {
        fields: { token: "expired" },
      });
    }

    const bank = claims.sectionSlug.startsWith(PATHWAY_SCOPE_PREFIX)
      ? await getPathwayAssessmentBank(claims.sectionSlug.slice(PATHWAY_SCOPE_PREFIX.length))
      : await getAssessmentBank(claims.sectionSlug);
    const drawn = claims.questionIds.flatMap((id) => bank.filter((question) => question.id === id));
    if (drawn.length !== claims.questionIds.length) {
      return err(
        "CONFLICT",
        "The questions changed since this attempt started. Start a fresh one.",
      );
    }

    const outcome = score(
      drawn.map((question) => ({
        id: question.id,
        category: question.category,
        format: question.format,
        correctOptionIds: question.options
          .filter((option) => option.correct)
          .map((option) => option.id),
        explanationCorrect: question.correctExplanation,
        explanationIncorrect: question.incorrectExplanation,
        misconceptions: question.misconceptionTags,
      })),
      input.answers,
    );

    const passed = outcome.score / outcome.total >= config.passThreshold;
    captureServer(guestActor(input.anonymousId), "assessment_submitted", {
      score: outcome.score,
      total: outcome.total,
      passed,
      attempt_number: claims.attemptNumber,
    });
    return ok({
      score: outcome.score,
      total: outcome.total,
      passed,
      passingScore: Math.ceil(outcome.total * config.passThreshold),
      categoriesFailed: outcome.categoriesFailed,
      review: outcome.review,
      attemptNumber: claims.attemptNumber,
    });
  },
);

async function callerIp(): Promise<string> {
  const headerList = await headers();
  return (headerList.get("x-forwarded-for") ?? "unknown").split(",")[0]?.trim() ?? "unknown";
}

export async function createAttempt(input: {
  anonymousId: string;
  sectionSlug: string;
  attemptNumber: number;
  previousQuestionIds: string[];
}): Promise<Result<AttemptPayload>> {
  return createAttemptHandler(input, {
    actor: guestActor(input.anonymousId),
    requestId: randomUUID(),
    ip: await callerIp(),
  });
}

export async function submitAttempt(input: {
  anonymousId: string;
  sectionSlug: string;
  token: string;
  answers: { questionId: string; optionIds: string[] }[];
  idempotencyKey: string;
}): Promise<Result<AttemptResult>> {
  return submitAttemptHandler(input, {
    actor: guestActor(input.anonymousId),
    requestId: randomUUID(),
    ip: await callerIp(),
  });
}

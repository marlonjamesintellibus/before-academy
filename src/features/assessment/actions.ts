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
import { getAssessmentBank } from "./queries";
import { score } from "./scoring";
import { drawQuestions, shuffle } from "./selection";
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
      attemptNumber: z.number().int().min(1).max(1000),
      previousQuestionIds: z.array(z.string().max(64)).max(20).default([]),
    }),
    rateLimit: "attempt",
  },
  async (input): Promise<Result<AttemptPayload>> => {
    const bank = await getAssessmentBank(SECTION_SLUG);
    if (bank.length === 0) {
      return err("NOT_FOUND", "The assessment is not available right now.");
    }

    const drawn = drawQuestions(bank, input.previousQuestionIds);
    const token = issueGuestToken({
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
      idempotencyKey: z.string().min(8).max(64),
    }),
    rateLimit: "attempt",
  },
  async (input): Promise<Result<AttemptResult>> => {
    const config = getAssessmentConfig();
    const claims = verifyGuestToken(input.token, config.tokenTtlMs);
    if (!claims || claims.anonymousId !== input.anonymousId) {
      return err("VALIDATION", "This attempt has expired. Start a fresh one - no penalty.", {
        fields: { token: "expired" },
      });
    }

    const bank = await getAssessmentBank(SECTION_SLUG);
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

import { expect, test } from "@playwright/test";

const LESSON = "/learn/ai-awareness/ai-automation-software";

/**
 * M5 exit criteria (docs/roadmap/milestones.md): close/reopen resumes at
 * every step; the storage notice behaves per S13d; completion states render.
 * Private-browsing degradation is covered by device-store unit tests.
 */

test("storage notice shows once and its dismissal survives reload", async ({ page }) => {
  await page.goto("/");
  const notice = page.getByText(/Your progress saves to this device/);
  await expect(notice).toBeVisible();
  await page
    .locator("div", { has: notice })
    .getByRole("button", { name: "Dismiss" })
    .first()
    .click();
  await expect(notice).not.toBeVisible();
  await page.reload();
  await expect(page.getByText(/Your progress saves to this device/)).not.toBeVisible();
});

test("mid-activity progress surfaces a resume banner on home and pathway", async ({ page }) => {
  // Make some activity progress
  await page.goto(`${LESSON}/activity`);
  await page.getByRole("button", { name: "Start sorting" }).click();
  await page.getByRole("radio").first().check();
  await page.getByRole("button", { name: "Check", exact: true }).click();
  await page.getByRole("button", { name: "Continue" }).click();

  // Home shows the resume banner deep-linking back into the journey
  await page.goto("/");
  await expect(page.getByText(/Continue where you left off/)).toBeVisible();
  await page.getByRole("link", { name: "Continue", exact: true }).click();
  await expect(page).toHaveURL(new RegExp(LESSON));

  // Pathway shows status + microstatus
  await page.goto("/learn");
  await expect(page.getByText("In progress")).toBeVisible();
  await expect(page.getByText(/Activity 1\/10/)).toBeVisible();
});

test("a passed assessment renders the complete state on the pathway", async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem(
      "ba.v1.assessment.ai-automation-software",
      JSON.stringify({
        version: 1,
        attempts: 1,
        bestScore: 6,
        total: 6,
        passed: true,
        lastAttemptAt: "2026-08-02T12:00:00.000Z",
      }),
    );
  });
  await page.goto("/learn");
  await expect(page.getByText("Complete", { exact: true })).toBeVisible();
  await expect(page.getByText(/Assessment passed \(6 of 6\)/)).toBeVisible();
  // Resume banner points at what's next once the section is complete
  await expect(page.getByText(/Section complete - your result is saved/)).toBeVisible();
});

test("a stage completed out of order still reads as done on the pathway", async ({ page }) => {
  // Nothing is locked (ADR-003), so a learner can finish stage 3 first. The
  // pathway once counted completed stages instead of testing membership, which
  // left the finished unit showing its time estimate.
  await page.addInitScript(() => {
    window.localStorage.setItem(
      "ba.v1.lesson.ai-automation-software",
      JSON.stringify({ active: 3, completed: [3], updatedAt: 1 }),
    );
  });
  await page.goto("/learn");
  await expect(page.getByRole("link", { name: /Artificial intelligence.*Done/ })).toBeVisible();
  // Units the learner has not reached keep their estimate.
  await expect(page.getByRole("link", { name: /Traditional software.*4 min/ })).toBeVisible();
});

test("remediation deep link never wipes lesson progress", async ({ page }) => {
  // Seed completed lesson stages on the device
  await page.addInitScript(() => {
    window.localStorage.setItem(
      "ba.v1.lesson.ai-automation-software",
      JSON.stringify({ active: 3, completed: [0, 1, 2], updatedAt: 1 }),
    );
  });
  // Arrive via a remediation hash (the misconception anchor, previously broken)
  await page.goto(`${LESSON}#p1-lesson-005-misconception`);
  await page.waitForTimeout(300);
  const saved = await page.evaluate(() =>
    JSON.parse(window.localStorage.getItem("ba.v1.lesson.ai-automation-software") ?? "{}"),
  );
  expect(saved.completed).toEqual([0, 1, 2]);
});

test("mid-assessment refresh restores the attempt", async ({ page }) => {
  await page.goto(`${LESSON}/assessment`);
  await page.getByRole("button", { name: "Start assessment" }).click();
  await expect(page.getByText("Question 1 of 6")).toBeVisible();
  await page.getByRole("radio").first().check();
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await expect(page.getByText("Question 2 of 6")).toBeVisible();
  await page.reload();
  // The attempt (not the intro) is restored, with the answered state intact
  await expect(page.getByText(/Question \d of 6/)).toBeVisible();
  await expect(page.getByRole("button", { name: "Start assessment" })).not.toBeVisible();
});

test("day-2 return offers the two-minute review and captures completion", async ({ page }) => {
  const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString();
  await page.addInitScript((stamp) => {
    window.localStorage.setItem(
      "ba.v1.assessment.ai-automation-software",
      JSON.stringify({
        version: 1,
        attempts: 1,
        bestScore: 5,
        total: 6,
        passed: true,
        lastAttemptAt: stamp,
      }),
    );
  }, twoDaysAgo);
  await page.goto("/learn");
  await expect(page.getByText("Two-minute review")).toBeVisible();
  await page.getByRole("button", { name: "Start the review" }).click();
  for (let i = 1; i <= 4; i += 1) {
    await expect(page.getByText(`Review ${i} of 4`)).toBeVisible();
    await page.getByRole("radio").first().check();
    await page.getByRole("button", { name: "Check", exact: true }).click();
    await page.getByRole("button", { name: i === 4 ? "Finish" : "Next", exact: true }).click();
  }
  await expect(page.getByText(/of 4 from memory/)).toBeVisible();
  // Completing the session reschedules it: reload shows no immediate offer
  await page.reload();
  await expect(page.getByRole("button", { name: "Start the review" })).not.toBeVisible();
});

test("capstone appears after passing and saves device-only answers", async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem(
      "ba.v1.assessment.ai-automation-software",
      JSON.stringify({
        version: 1,
        attempts: 1,
        bestScore: 6,
        total: 6,
        passed: true,
        lastAttemptAt: new Date().toISOString(),
      }),
    );
  });
  await page.goto("/learn");
  await page.getByRole("link", { name: /Capstone: audit an AI claim/ }).click();
  await expect(page.getByRole("heading", { name: "Audit an AI claim" })).toBeVisible();
  await expect(page.getByText(/saved? to this device only/i)).toBeVisible();
  await page.locator("#capstone-feature").fill("Helpdesk reply suggestions");
  await page.getByRole("button", { name: "Compare with a model audit" }).click();
  await expect(page.getByText(/Model answers are shown under each prompt/)).toBeVisible();
  // Answer persisted on device
  await page.reload();
  await expect(page.locator("#capstone-feature")).toHaveValue("Helpdesk reply suggestions");
});

test("reset progress clears the section after an explicit confirm", async ({ page }) => {
  await page.goto("/learn");
  // Seed after load (initScript would re-seed on the post-reset reload)
  await page.evaluate(() => {
    window.localStorage.setItem(
      "ba.v1.lesson.ai-automation-software",
      JSON.stringify({ active: 2, completed: [0, 1], updatedAt: Date.now() }),
    );
  });
  await page.reload();
  await expect(page.getByText("In progress")).toBeVisible();
  await page.getByRole("button", { name: "Reset my progress for this section" }).click();
  // Keep is the default focus; destructive requires an explicit choice
  await expect(page.getByRole("button", { name: "Keep my progress" })).toBeFocused();
  await page.getByRole("button", { name: "Reset everything" }).click();
  await expect(page.getByText("Not started")).toBeVisible();
  const cleared = await page.evaluate(
    () => window.localStorage.getItem("ba.v1.lesson.ai-automation-software") === null,
  );
  expect(cleared).toBe(true);
});

test("another section's assessment result never marks section 3 complete", async ({ page }) => {
  // The regression this guards: all assessments once shared one outcome key,
  // so passing any section marked the first one complete.
  await page.addInitScript(() => {
    window.localStorage.setItem(
      "ba.v1.assessment.what-is-artificial-intelligence",
      JSON.stringify({
        version: 1,
        attempts: 1,
        bestScore: 6,
        total: 6,
        passed: true,
        lastAttemptAt: "2026-08-03T12:00:00.000Z",
      }),
    );
  });
  await page.goto("/learn");
  await expect(page.getByText("Not started").first()).toBeVisible();
  await expect(page.getByText(/Section complete - your result is saved/)).not.toBeVisible();
  await expect(page.getByText(/Assessment passed/)).not.toBeVisible();
});

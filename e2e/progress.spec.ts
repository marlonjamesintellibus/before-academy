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

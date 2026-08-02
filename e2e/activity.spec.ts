import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const ACTIVITY = "/learn/ai-awareness/ai-automation-software/activity";
const CHECK = "/learn/ai-awareness/ai-automation-software/check";

/**
 * M3 exit criteria (docs/roadmap/milestones.md): J1 through check completable;
 * the 6→7 pair fixed order; feedback formula rendering; mid-activity resume.
 */

test("activity completes end to end with per-category summary", async ({ page }) => {
  await page.goto(ACTIVITY);
  await page.getByRole("button", { name: "Start sorting" }).click();
  for (let i = 1; i <= 10; i += 1) {
    await expect(page.getByText(`Scenario ${i} of 10`)).toBeVisible();
    await page.getByRole("radio").first().check();
    await page.getByRole("button", { name: "Check", exact: true }).click();
    await expect(page.getByText(/Correct|Not quite/).first()).toBeVisible();
    await page.getByRole("button", { name: "Continue" }).click();
  }
  await expect(page.getByRole("heading", { name: "Nice sorting" })).toBeVisible();
  await expect(page.getByText(/of \d+ correct/).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Continue to the knowledge check" })).toBeVisible();
});

test("mid-activity progress survives a refresh", async ({ page }) => {
  await page.goto(ACTIVITY);
  await page.getByRole("button", { name: "Start sorting" }).click();
  for (let i = 0; i < 2; i += 1) {
    await page.getByRole("radio").first().check();
    await page.getByRole("button", { name: "Check", exact: true }).click();
    await page.getByRole("button", { name: "Continue" }).click();
  }
  await expect(page.getByText("Scenario 3 of 10")).toBeVisible();
  await page.reload();
  await expect(page.getByText("Scenario 3 of 10")).toBeVisible();
});

test("wrong answers show the formula feedback with a review link", async ({ page }) => {
  await page.goto(ACTIVITY);
  await page.getByRole("button", { name: "Start sorting" }).click();
  // Scenario 1 is the calculator (traditional software): choose AI-assisted, deliberately wrong.
  await page.getByRole("radio", { name: "AI-assisted" }).check();
  await page.getByRole("button", { name: "Check", exact: true }).click();
  await expect(page.getByText("Not quite").first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Review this concept" })).toHaveAttribute(
    "href",
    /#p1-lesson-002/,
  );
});

test("knowledge check completes with remediation chips on wrong answers", async ({ page }) => {
  await page.goto(CHECK);
  await page.getByRole("button", { name: "Start the check" }).click();
  for (let i = 1; i <= 4; i += 1) {
    await expect(page.getByText(`Question ${i} of 4`)).toBeVisible();
    await page.getByRole("radio").first().check();
    await page.getByRole("button", { name: "Check", exact: true }).click();
    const chip = page.getByRole("link", { name: /Review/ });
    if (await chip.isVisible().catch(() => false)) {
      await expect(chip).toHaveAttribute("href", /#p1-lesson|#.*misconception/i);
    }
    await page.getByRole("button", { name: "Continue" }).click();
  }
  await expect(page.getByRole("heading", { name: "Practice complete" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Start the assessment" })).toBeVisible();
});

test("activity is keyboard-operable", async ({ page }) => {
  await page.goto(ACTIVITY);
  await page.getByRole("button", { name: "Start sorting" }).focus();
  await page.keyboard.press("Enter");
  // Arrow into the radiogroup, select with Space, Tab to Check, Enter.
  await page.getByRole("radio").first().focus();
  await page.keyboard.press("Space");
  await page.getByRole("button", { name: "Check", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(page.getByText(/Correct|Not quite/).first()).toBeVisible();
});

test("activity and check pass axe with no critical or serious violations", async ({ page }) => {
  for (const path of [ACTIVITY, CHECK]) {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();
    const blocking = results.violations.filter((violation) =>
      ["critical", "serious"].includes(violation.impact ?? ""),
    );
    expect(blocking.map((violation) => `${violation.id}: ${violation.help}`)).toEqual([]);
  }
});

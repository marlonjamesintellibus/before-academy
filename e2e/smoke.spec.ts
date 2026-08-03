import { expect, test } from "@playwright/test";

test("home page serves with the skip link and heading", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { level: 1, name: "Know what AI actually is. And what it isn't." }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Skip to main content" })).toBeAttached();
});

test("hero demo runs two scenarios before handing over to the CTA", async ({ page }) => {
  await page.goto("/");
  const demo = page.getByRole("region", { name: "Try a real scenario" });
  await expect(demo.getByText("Scenario 1 of 2")).toBeVisible();

  // First turn: feedback arrives without a duplicated verdict prefix.
  await demo.getByRole("button", { name: "Traditional software" }).click();
  await expect(demo.getByText(/^Correct\./)).toBeVisible();
  await expect(demo.getByText(/Correct - Correct/)).toHaveCount(0);

  // Second turn replaces the scenario rather than ending the demo.
  await demo.getByRole("button", { name: "Try a harder one" }).click();
  await expect(demo.getByText("Scenario 2 of 2")).toBeVisible();
  await demo.getByRole("button", { name: "Automation", exact: true }).click();
  await expect(demo.getByRole("link", { name: "Learn to read them all" })).toBeVisible();
});

test("pathway summarises progress across the seven sections", async ({ page }) => {
  await page.goto("/learn");
  await expect(page.getByText("0 of 7 sections complete")).toBeVisible();
  await page.evaluate(() => {
    window.localStorage.setItem(
      "ba.v1.assessment.ai-automation-software",
      JSON.stringify({
        version: 1,
        attempts: 1,
        bestScore: 6,
        total: 6,
        passed: true,
        lastAttemptAt: "2026-08-03T12:00:00.000Z",
      }),
    );
    window.localStorage.setItem(
      "ba.v1.assessment.what-is-artificial-intelligence",
      JSON.stringify({
        version: 1,
        attempts: 1,
        bestScore: 8,
        total: 8,
        passed: true,
        lastAttemptAt: "2026-08-03T12:00:00.000Z",
      }),
    );
  });
  await page.reload();
  await expect(page.getByText("2 of 7 sections complete")).toBeVisible();
});

test("section cards expand into unit rows with completion and deep links", async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem(
      "ba.v1.lesson.what-is-artificial-intelligence",
      JSON.stringify({ active: 2, completed: [0, 1], updatedAt: 1 }),
    );
  });
  await page.goto("/learn");

  // Expand section 1: stages appear with honest Done / estimate states.
  const card = page.locator("li", { hasText: "What Is Artificial Intelligence?" }).first();
  await card.getByText("Show the steps").click();
  await expect(card.getByRole("link", { name: /Start here.*completed/ })).toBeVisible();
  await expect(
    card.getByRole("link", { name: /Where the behaviour came from.*completed/ }),
  ).toBeVisible();
  await expect(card.getByRole("link", { name: /AI or Not AI\?/ })).toBeVisible();
  await expect(card.getByRole("link", { name: /Graded assessment/ })).toBeVisible();

  // A stage row deep-links into that exact stage of the lesson.
  await card.getByRole("link", { name: /A field, not a single thing.*not started/ }).click();
  await expect(page).toHaveURL(/what-is-artificial-intelligence#stage-2$/);
  await expect(
    page.getByRole("heading", { level: 2, name: "A field, not a single thing" }),
  ).toBeVisible();
});

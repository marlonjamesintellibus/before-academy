import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const LESSON = "/learn/ai-awareness/ai-automation-software";

/**
 * M2 exit criterion: full lesson readable from versioned seeds
 * (docs/roadmap/milestones.md). Requires the database to be seeded
 * (npm run db:seed) before the app starts.
 */

test("lesson renders all template blocks from published content", async ({ page }) => {
  await page.goto(LESSON);
  await expect(
    page.getByRole("heading", { level: 1, name: "AI, Automation and Traditional Software" }),
  ).toBeVisible();
  // Concept headings (h2) from seeded records
  await expect(page.getByRole("heading", { level: 2 }).first()).toBeVisible();
  // Objectives accordion, misconception callout, diagram figure
  await expect(page.getByText(/What you.ll learn/)).toBeVisible();
  await expect(page.getByText("Common misconception")).toBeVisible();
  await expect(page.getByRole("group", { name: "Diagram layers" })).toBeVisible();
  // Activity and check CTAs
  await expect(page.getByRole("link", { name: "Try it: Sort the System" })).toBeVisible();
});

test("hook answers reveal the tease response", async ({ page }) => {
  await page.goto(LESSON);
  const hookButtons = page.getByRole("group").first().getByRole("button");
  await hookButtons.first().click();
  await expect(page.locator("[aria-live=polite]").first()).toBeVisible();
});

test("depth panel expands and collapses with aria-expanded", async ({ page }) => {
  await page.goto(LESSON);
  const panel = page.getByRole("button", { name: /min read/ }).first();
  await expect(panel).toHaveAttribute("aria-expanded", "false");
  await panel.click();
  await expect(panel).toHaveAttribute("aria-expanded", "true");
});

test("diagram layer opens its description and the text alternative toggles", async ({ page }) => {
  await page.goto(LESSON);
  const diagram = page
    .getByRole("figure")
    .filter({ has: page.getByRole("group", { name: "Diagram layers" }) });
  const layers = diagram.getByRole("group", { name: "Diagram layers" }).getByRole("button");
  await layers.first().click();
  await expect(layers.first()).toHaveAttribute("aria-pressed", "true");
  await expect(diagram.locator("[aria-live=polite]")).toContainText(":");
  await page.getByRole("button", { name: "Read the full text version" }).click();
  await expect(page.getByRole("button", { name: "Hide the text version" })).toBeVisible();
});

test("concept diagrams run their interactions", async ({ page }) => {
  await page.goto(LESSON);
  // Traditional software: deterministic run counter
  await page.getByRole("button", { name: "Run the rules" }).click();
  await expect(page.getByText(/output was \$138\.00 every time/)).toBeVisible();
  // Automation: trigger the chain to completion
  await page.getByRole("button", { name: "Trigger it now" }).click();
  await expect(page.getByText(/no decisions were made anywhere/)).toBeVisible({ timeout: 5000 });
  // AI: classification with confidence
  await page.getByRole("button", { name: "Classify a message" }).click();
  await expect(page.getByText(/% confident/).first()).toBeVisible();
  // Canonical diagram: trace a request selects the final layer
  await page.getByRole("button", { name: "Trace a request through the layers" }).click();
  const diagram = page
    .getByRole("figure")
    .filter({ has: page.getByRole("group", { name: "Diagram layers" }) });
  await expect(diagram.locator("[aria-live=polite]")).toContainText(":", { timeout: 8000 });
});

test("glossary chip opens a definition panel on tap", async ({ page }) => {
  await page.goto(LESSON);
  const chip = page.locator("article p button[aria-controls]").first();
  await chip.scrollIntoViewIfNeeded();
  const term = (await chip.textContent())?.trim() ?? "";
  await chip.click();
  await expect(chip).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByText(new RegExp(`${term}:`, "i")).first()).toBeVisible();
});

test("seeded lesson passes axe with no critical or serious violations", async ({ page }) => {
  await page.goto(LESSON);
  const results = await new AxeBuilder({ page }).analyze();
  const blocking = results.violations.filter((violation) =>
    ["critical", "serious"].includes(violation.impact ?? ""),
  );
  expect(blocking.map((violation) => `${violation.id}: ${violation.help}`)).toEqual([]);
});

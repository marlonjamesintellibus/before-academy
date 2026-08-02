import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

const LESSON = "/learn/ai-awareness/ai-automation-software";

async function goToStage(page: Page, name: string) {
  const outline = page.getByRole("button", { name: "Outline", exact: true });
  if (await outline.isVisible()) {
    await outline.click();
  }
  await page.getByRole("button", { name, exact: true }).click();
}

/**
 * M2 exit criterion: full lesson readable from versioned seeds
 * (docs/roadmap/milestones.md). Requires the database to be seeded
 * (npm run db:seed) before the app starts.
 */

test("lesson presents published content as five focused stages", async ({ page }) => {
  await page.goto(LESSON);
  await expect(
    page.getByRole("heading", { level: 1, name: "AI, Automation and Traditional Software" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Look past the label" })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Lesson progress" })).toBeVisible();
  await expect(page.getByText("Stage 1 of 5 · Start Here")).toBeVisible();

  await goToStage(page, "Compare and Apply");
  await expect(
    page.getByRole("heading", { level: 3, name: "Three mechanisms at a glance" }),
  ).toBeVisible();
  await expect(
    page.getByText("Good AI judgment includes knowing when there is not enough evidence."),
  ).toBeVisible();
  await expect(page.getByRole("group", { name: "Diagram layers" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Start Sort the System" })).toBeVisible();
});

test("hook answers reveal the tease response", async ({ page }) => {
  await page.goto(LESSON);
  const hookButtons = page.getByRole("group").first().getByRole("button");
  await hookButtons.first().click();
  await expect(page.locator("[aria-live=polite]").first()).toBeVisible();
});

test("depth panel expands and collapses with aria-expanded", async ({ page }) => {
  await page.goto(LESSON);
  await goToStage(page, "Traditional Software");
  const panel = page.getByRole("button", { name: /min read/ }).first();
  await expect(panel).toHaveAttribute("aria-expanded", "false");
  await panel.click();
  await expect(panel).toHaveAttribute("aria-expanded", "true");
});

test("diagram layer opens its description and the text alternative toggles", async ({ page }) => {
  await page.goto(LESSON);
  await goToStage(page, "Compare and Apply");
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
  // Traditional software: run twice, history proves determinism
  await goToStage(page, "Traditional Software");
  await page.getByRole("button", { name: "Run the rules" }).click();
  await expect(page.getByText(/Identical input gives identical output/)).toBeVisible({
    timeout: 5000,
  });
  await page.getByRole("button", { name: "Run it again" }).click();
  await expect(page.getByText("same input, same answer - guaranteed")).toBeVisible({
    timeout: 5000,
  });
  // Automation: trigger the chain to completion
  await goToStage(page, "Automation");
  await page.getByRole("button", { name: "Trigger it now" }).click();
  await expect(page.getByText(/no decisions were made anywhere/)).toBeVisible({ timeout: 5000 });
  // AI: pick a message card, verdict lands with confidence (allow thinking delay)
  await goToStage(page, "Artificial Intelligence");
  await page.getByRole("button", { name: /^Classify: You won a FREE prize/ }).click();
  await expect(page.getByText(/96% confident/).first()).toBeVisible({ timeout: 5000 });
  // Canonical diagram: trace a request selects the final layer
  await goToStage(page, "Compare and Apply");
  await page.getByRole("button", { name: "Trace a request through the layers" }).click();
  const diagram = page
    .getByRole("figure")
    .filter({ has: page.getByRole("group", { name: "Diagram layers" }) });
  await expect(diagram.locator("[aria-live=polite]")).toContainText(":", { timeout: 8000 });
});

test("glossary chip opens a definition panel on tap", async ({ page }) => {
  await page.goto(LESSON);
  await goToStage(page, "Traditional Software");
  const chip = page.locator("article p button[aria-controls]").first();
  await chip.scrollIntoViewIfNeeded();
  const term = (await chip.textContent())?.trim() ?? "";
  await chip.click();
  await expect(chip).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByText(new RegExp(`${term}:`, "i")).first()).toBeVisible();
});

test("seeded lesson passes axe with no critical or serious violations", async ({ page }) => {
  await page.goto(LESSON);
  const startResults = await new AxeBuilder({ page }).analyze();
  await goToStage(page, "Compare and Apply");
  const compareResults = await new AxeBuilder({ page }).analyze();
  const blocking = [...startResults.violations, ...compareResults.violations].filter((violation) =>
    ["critical", "serious"].includes(violation.impact ?? ""),
  );
  expect(blocking.map((violation) => `${violation.id}: ${violation.help}`)).toEqual([]);
});

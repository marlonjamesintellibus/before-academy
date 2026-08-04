import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

const LESSON = "/learn/ai-awareness/ai-automation-software";

async function goToStage(page: Page, name: string) {
  const outline = page.getByRole("button", { name: "Outline", exact: true });
  if (await outline.isVisible()) {
    await outline.click();
  }
  await page.getByRole("button", { name: new RegExp(`^${name}`) }).click();
}

/**
 * M2 exit criterion: full lesson readable from versioned seeds
 * (docs/roadmap/milestones.md). Requires the database to be seeded
 * (npm run db:seed) before the app starts.
 */

/** Predict-first gates (Phase B): commit a prediction to reveal the interactive. */
async function commitPrediction(page: import("@playwright/test").Page) {
  const gate = page.getByText("Predict first").first();
  if (await gate.isVisible().catch(() => false)) {
    await page.locator("div", { has: gate }).last().getByRole("button").first().click();
  }
}

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
  await commitPrediction(page);
  await expect(page.getByRole("list", { name: "System layers" })).toBeVisible();
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
  await commitPrediction(page);
  const diagram = page
    .getByRole("figure")
    .filter({ has: page.getByRole("list", { name: "System layers" }) });
  const layers = diagram.getByRole("list", { name: "System layers" }).getByRole("button");
  await layers.first().click();
  await expect(layers.first()).toHaveAttribute("aria-pressed", "true");
  await expect(diagram.locator("[aria-live=polite]")).toContainText(":");
  await page.getByRole("button", { name: "Read the full text version" }).click();
  await expect(page.getByRole("button", { name: "Hide the text version" })).toBeVisible();
});

test("concept diagrams expose learner-controlled mechanisms", async ({ page }) => {
  await page.goto(LESSON);
  await goToStage(page, "Traditional Software");
  await commitPrediction(page);
  await expect(page.getByText("Do not release")).toBeVisible();
  await page.getByRole("checkbox", { name: "Payment approved" }).check();
  await expect(page.getByText("Release item", { exact: true })).toBeVisible();
  await goToStage(page, "Automation");
  await commitPrediction(page);
  await page.getByRole("button", { name: "Run next step" }).click();
  await expect(page.getByText(/Assign team is next|Confirm is next/)).toBeVisible();
  await page.getByRole("button", { name: "Play workflow" }).click();
  await page.getByRole("button", { name: "Pause" }).click();
  await goToStage(page, "Artificial Intelligence");
  await commitPrediction(page);
  const initialConfidence = await page
    .getByText(/% confidence/)
    .first()
    .textContent();
  await page.getByRole("checkbox", { name: "Contains a suspicious link" }).check();
  await expect(page.getByText(/% confidence/).first()).not.toHaveText(initialConfidence ?? "");
  await goToStage(page, "Compare and Apply");
  await commitPrediction(page);
  await page.getByRole("button", { name: "Next layer" }).click();
  const diagram = page
    .getByRole("figure")
    .filter({ has: page.getByRole("list", { name: "System layers" }) });
  await expect(diagram.locator("[aria-live=polite]")).toContainText(":", { timeout: 8000 });
});

test("inline micro-check gives immediate feedback and supports retry", async ({ page }) => {
  await page.goto(LESSON);
  await goToStage(page, "Traditional Software");
  const check = page.getByRole("heading", { name: /password-strength checker/ }).locator("..");
  await check.getByRole("radio", { name: "Patterns learned from examples" }).check();
  await check.getByRole("button", { name: "Check answer" }).click();
  await expect(check.getByText("✗ Not quite", { exact: true })).toBeVisible();
  await check.getByRole("button", { name: "Try a different answer" }).click();
  await expect(check.getByRole("radio", { name: "Written rules" })).not.toBeChecked();
});

test("tablet layout and reduced motion preserve all diagram controls", async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(LESSON);
  await goToStage(page, "Automation");
  await commitPrediction(page);
  await page.getByRole("button", { name: "Run next step" }).click();
  await expect(page.getByText(/Confirm is next/)).toBeVisible();
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(overflow).toBe(false);
  await goToStage(page, "Compare and Apply");
  await commitPrediction(page);
  await page.getByRole("checkbox", { name: "Include AI prediction" }).uncheck();
  await expect(page.getByRole("list", { name: "System layers" })).not.toContainText(
    /artificial intelligence|AI prediction/i,
  );
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

test("generic lessons carry the enriched journey: stages, inline checks, predict gate", async ({
  page,
}) => {
  await page.goto("/learn/ai-awareness/what-is-artificial-intelligence");

  // The rail IS the original journey's: same component, same wording. Both
  // variants render; pick the one this viewport shows (mobile first, desktop
  // second). The desktop panel carries minutes remaining.
  const isMobile = test.info().project.name === "mobile";
  // Only the viewport's variant is exposed to the accessibility tree.
  const rail = page.getByRole("navigation", { name: "Lesson progress" });
  await expect(rail.getByText(/% complete/)).toBeVisible();
  if (!isMobile) {
    await expect(rail.getByText(/About \d+ min remaining/)).toBeVisible();
  }

  // Transitions are labelled with the destination stage.
  await page.getByRole("button", { name: "Continue to Where the behaviour came from" }).click();

  // The stage carries its objective and, once present, its completion line.
  await expect(
    page.getByText("Spot where a system's behaviour came from", { exact: false }),
  ).toBeVisible();
  await expect(
    page.getByText("You can name the property that separates the categories."),
  ).toBeVisible();

  // The inline check lives inside this stage and teaches on answer.
  await expect(page.getByText(/rounds every purchase up to the next dollar/)).toBeVisible();
  await page.getByRole("radio", { name: "Written rules" }).check();
  await page.getByRole("button", { name: "Check answer" }).click();
  await expect(page.getByText(/rule someone stated/)).toBeVisible();

  // The final stage's diagram sits behind a committed prediction.
  await page.getByRole("button", { name: /Keep doing a task well|Continue to/ }).first();
  if (isMobile) await rail.getByRole("button", { name: "Outline" }).click();
  await rail.getByRole("button", { name: /Doing a task is not working like a person/ }).click();
  await expect(
    page.getByText("Two systems produce identical outputs for the same input", { exact: false }),
  ).toBeVisible();
  await page.getByRole("button", { name: "No: the outputs can be indistinguishable" }).click();
  await expect(page.getByText("Two ways a system gets its behaviour")).toBeVisible();

  // The diagram draws THIS section's layers, not another section's flow. Its
  // predecessor hardcoded section 3's support-ticket story for every section.
  await expect(page.getByRole("button", { name: "A person writes rules" })).toBeVisible();
  await expect(page.getByRole("button", { name: "A pattern is derived" })).toBeVisible();
  await expect(page.getByText(/routes it to the shipping queue/)).toHaveCount(0);
  await expect(page.getByText(/84% confident/)).toHaveCount(0);

  // Selecting a step reveals its own description.
  await page.getByRole("button", { name: "A pattern is derived" }).click();
  await expect(page.getByText(/works out what the examples have in common/)).toBeVisible();

  // The trace is playable, and there is exactly one prediction gate, already used.
  await expect(page.getByRole("button", { name: "Play the trace" })).toBeVisible();
});

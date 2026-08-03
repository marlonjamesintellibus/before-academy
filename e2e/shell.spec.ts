import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/**
 * M1 exit criteria (docs/roadmap/milestones.md): shell navigable keyboard-only;
 * zero critical/serious axe violations per screen (docs/engineering/testing.md).
 */

const SCREENS = [
  { name: "S01 home", path: "/" },
  { name: "S02 pathway", path: "/learn" },
  { name: "S03 lesson shell", path: "/learn/ai-awareness/ai-automation-software" },
  { name: "404", path: "/definitely-not-a-page" },
];

for (const screen of SCREENS) {
  test(`${screen.name}: no critical or serious axe violations`, async ({ page }) => {
    await page.goto(screen.path);
    const results = await new AxeBuilder({ page }).analyze();
    const blocking = results.violations.filter((v) =>
      ["critical", "serious"].includes(v.impact ?? ""),
    );
    expect(blocking.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
  });
}

test("keyboard-only: skip link, then CTA into the lesson", async ({ page }) => {
  await page.goto("/");
  // First Tab lands on the skip link; Enter jumps to main.
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to main content" })).toBeFocused();
  await page.keyboard.press("Enter");
  // Tab until the primary CTA has focus, then activate it.
  const cta = page.getByRole("link", { name: "Start the AI Awareness lesson" });
  for (let i = 0; i < 15; i += 1) {
    if (await cta.evaluate((el) => el === document.activeElement)) break;
    await page.keyboard.press("Tab");
  }
  await expect(cta).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/learn\/ai-awareness\/ai-automation-software$/);
  await expect(
    page.getByRole("heading", { level: 1, name: "AI, Automation and Traditional Software" }),
  ).toBeVisible();
});

test("header navigation reaches the pathway and back home", async ({ page }) => {
  await page.goto("/");
  // Chrome stays singular while one pathway ships: a plural label promises an
  // index /learn cannot show (information-architecture.md).
  const nav = page.getByRole("navigation", { name: "Main" });
  await expect(nav.getByRole("link", { name: "Pathways" })).toHaveCount(0);
  await nav.getByRole("link", { name: "Learn" }).click();
  await expect(page).toHaveURL(/\/learn$/);
  await expect(page.getByRole("heading", { level: 1, name: "AI Awareness" })).toBeVisible();
  await page.getByRole("link", { name: "Before Academy" }).click();
  await expect(page).toHaveURL(/\/$/);
});

test("unknown route serves the 404 with recovery links", async ({ page }) => {
  await page.goto("/nope/nothing-here");
  await expect(page.getByRole("link", { name: "Go home" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Jump into the lesson" })).toBeVisible();
});

test("360px floor: no horizontal overflow on any core route", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 740 });
  for (const path of [
    "/",
    "/learn",
    "/learn/ai-awareness/ai-automation-software",
    "/learn/ai-awareness/ai-automation-software/activity",
    "/learn/ai-awareness/ai-automation-software/assessment",
    "/learn/ai-awareness/ai-automation-software/review?categories=automation",
    "/learn/ai-awareness/ai-automation-software/capstone",
  ]) {
    await page.goto(path);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth + 1,
    );
    expect(overflow, `horizontal overflow on ${path}`).toBe(false);
  }
});

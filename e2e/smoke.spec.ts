import { expect, test } from "@playwright/test";

test("home page serves with the skip link and heading", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { level: 1, name: "Know what AI actually is — and what it isn't" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Skip to main content" })).toBeAttached();
});

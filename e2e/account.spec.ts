import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/**
 * S10/S11 running on the simulated session (lib/preview-session.ts) until
 * BetterAuth lands at M6. The suite runs with NEXT_PUBLIC_PREVIEW_AUTH=1 (see
 * the e2e job in ci.yml); production can never enable it.
 */
const LESSON = "/learn/ai-awareness/ai-automation-software";
const SESSION_KEY = "ba.v1.preview_session";

const SESSION = {
  version: 1,
  user: { id: "preview-test", email: "ada@example.com", name: "Ada" },
  signedInAt: "2026-08-03T10:00:00.000Z",
};

async function signedIn(page: import("@playwright/test").Page) {
  await page.addInitScript(
    ([key, value]) => {
      window.localStorage.setItem(key as string, value as string);
    },
    [SESSION_KEY, JSON.stringify(SESSION)] as const,
  );
}

test("simulated sign-in reaches the dashboard and says it is not real", async ({ page }) => {
  await page.goto("/auth/sign-in");
  await expect(page.getByText(/Simulated sign-in for development/)).toBeVisible();
  await page.getByLabel("Email address").fill("ada.lovelace@example.com");
  await page.getByRole("button", { name: "Start a simulated session" }).click();

  await expect(page).toHaveURL(/\/dashboard$/);
  await expect(page.getByRole("heading", { level: 1, name: "Your dashboard" })).toBeVisible();
  // The header echo is hidden on narrow viewports by design; the dashboard is not.
  await expect(page.getByText("Signed in as ada.lovelace@example.com")).toBeVisible();
  // No progress yet, so the empty state invites the lesson.
  await expect(page.getByText(/You have not started yet/)).toBeVisible();
});

test("dashboard surfaces the resume point and the graded record", async ({ page }) => {
  await signedIn(page);
  await page.addInitScript(() => {
    window.localStorage.setItem(
      "ba.v1.lesson.ai-automation-software",
      JSON.stringify({ active: 2, completed: [0, 1], updatedAt: 1 }),
    );
    window.localStorage.setItem(
      "ba.v1.assessment.ai-automation-software",
      JSON.stringify({
        version: 1,
        attempts: 2,
        bestScore: 5,
        total: 6,
        passed: true,
        lastAttemptAt: "2026-08-01T12:00:00.000Z",
      }),
    );
  });
  await page.goto("/dashboard");

  await expect(page.getByText("Welcome back, Ada")).toBeVisible();
  await expect(page.getByRole("link", { name: "Continue", exact: true })).toBeVisible();
  await expect(page.getByText(/Passed.*best of 5 of 6.*2 attempts/)).toBeVisible();
  // The section steps render inside the dashboard the same way as on the pathway.
  await expect(page.getByRole("link", { name: /Traditional software.*Done/ })).toBeVisible();
});

test("signing out returns the guest header and closes the dashboard", async ({ page }) => {
  // Seeded after load, not via initScript: an init script would re-create the
  // session on the post-sign-out navigation and mask the bug this guards.
  await page.goto("/dashboard");
  await page.evaluate(
    ([key, value]) => window.localStorage.setItem(key as string, value as string),
    [SESSION_KEY, JSON.stringify(SESSION)] as const,
  );
  await page.reload();
  const nav = page.getByRole("navigation", { name: "Main" });
  await expect(nav.getByRole("link", { name: "Dashboard" })).toBeVisible();

  await nav.getByRole("button", { name: "Sign out" }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(nav.getByRole("link", { name: "Create free account" })).toBeVisible();

  // The dashboard now explains itself rather than showing someone else's data.
  await page.goto("/dashboard");
  await expect(page.getByText(/The dashboard needs an account/)).toBeVisible();
  await expect(page.getByText("Welcome back")).toHaveCount(0);
});

test("account screens pass axe and hold up at 360px", async ({ page }) => {
  await signedIn(page);
  for (const path of ["/auth/sign-in", "/dashboard"]) {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();
    const blocking = results.violations.filter((v) =>
      ["critical", "serious"].includes(v.impact ?? ""),
    );
    expect(blocking.map((v) => `${path} ${v.id}: ${v.help}`)).toEqual([]);
  }

  await page.setViewportSize({ width: 360, height: 740 });
  for (const path of ["/auth/sign-in", "/dashboard"]) {
    await page.goto(path);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(overflow, `${path} overflows at 360px`).toBe(false);
  }
});

test("guest flow is untouched by the account screens", async ({ page }) => {
  // The pilot runs guest-only: no session, no dashboard link, lesson unaffected.
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Main" });
  await expect(nav.getByRole("link", { name: "Dashboard" })).toHaveCount(0);
  await page.goto(LESSON);
  await expect(
    page.getByRole("heading", { level: 1, name: "AI, Automation and Traditional Software" }),
  ).toBeVisible();
});

import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const ASSESSMENT = "/learn/ai-awareness/ai-automation-software/assessment";
const REVIEW = "/learn/ai-awareness/ai-automation-software/review";

/**
 * M4 exit criteria (docs/roadmap/milestones.md): J2 demonstrable - complete
 * attempt, results with breakdown, different-combination retake. Scoring
 * correctness itself is proven by unit parity tests against the seed.
 */

async function answerAllQuestions(page: import("@playwright/test").Page) {
  const stems: string[] = [];
  for (let i = 1; i <= 6; i += 1) {
    await expect(page.getByText(`Question ${i} of 6`)).toBeVisible();
    const stem = await page.locator("main p.font-semibold").first().textContent();
    stems.push(stem ?? "");
    const first = page.locator("input[type=radio], input[type=checkbox]").first();
    await first.check();
    await page
      .getByRole("button", { name: i === 6 ? "Review answers" : "Next", exact: true })
      .click();
  }
  return stems;
}

test("full attempt: intro, six questions, review, submit, results", async ({ page }) => {
  await page.goto(ASSESSMENT);
  await expect(page.getByText(/6-7 questions · Pass at 80%/)).toBeVisible();
  await page.getByRole("button", { name: "Start assessment" }).click();
  await answerAllQuestions(page);
  await expect(page.getByRole("heading", { name: "Review before you submit" })).toBeVisible();
  await page.getByRole("button", { name: "Submit assessment" }).click();
  await expect(page.getByText(/of 6 correct; passing is/)).toBeVisible();
  await expect(page.getByRole("heading", { name: /Question by question/ })).toBeVisible();
  await expect(page.getByRole("button", { name: "Retake with new questions" })).toBeVisible();
  // Judgment-change panel + post confidence radiogroup
  await expect(page.getByRole("heading", { name: "How your judgment changed" })).toBeVisible();
  await page.getByRole("radio", { name: "4 of 5" }).click();
  await expect(page.getByText(/Noted - you can change it any time/)).toBeVisible();
});

test("retake draws a different combination", async ({ page }) => {
  await page.goto(ASSESSMENT);
  await page.getByRole("button", { name: "Start assessment" }).click();
  const firstStems = await answerAllQuestions(page);
  await page.getByRole("button", { name: "Submit assessment" }).click();
  await page.getByRole("button", { name: "Retake with new questions" }).click();
  const secondStems = await answerAllQuestions(page);
  expect([...secondStems].sort().join("|")).not.toBe([...firstStems].sort().join("|"));
});

test("exit confirm keeps the learner by default and discards on request", async ({ page }) => {
  await page.goto(ASSESSMENT);
  await page.getByRole("button", { name: "Start assessment" }).click();
  await page.getByRole("button", { name: "Exit assessment" }).click();
  await expect(page.getByText("Leave the assessment?")).toBeVisible();
  await page.getByRole("button", { name: "Keep going" }).click();
  await expect(page.getByText("Question 1 of 6")).toBeVisible();
  await page.getByRole("button", { name: "Exit assessment" }).click();
  await page.getByRole("button", { name: "Exit - discard this attempt" }).click();
  await expect(page).toHaveURL(/ai-automation-software$/);
});

test("assessment-first entry shows the standalone reassurance", async ({ page }) => {
  await page.goto(`${ASSESSMENT}?route=assessment_first`);
  await expect(page.getByText("You can take this without reading the lesson.")).toBeVisible();
});

test("S09 review routes misconception modules by category and offers retake", async ({ page }) => {
  await page.goto(`${REVIEW}?categories=automation,ambiguity`);
  await expect(page.getByText("Reviewing: Automation, Ambiguity")).toBeVisible();
  // Automation routes M2; ambiguity routes M5/M8/M9 - modules render with confirms
  await expect(page.getByText("M2 · worth untangling")).toBeVisible();
  await expect(page.getByText("M9 · worth untangling")).toBeVisible();
  await expect(page.getByText("M11 · worth untangling")).not.toBeVisible();
  await expect(page.getByRole("link", { name: "Retake assessment" })).toBeVisible();
  // Mini-confirm loop
  const firstModule = page.locator("section").filter({ hasText: "worth untangling" }).first();
  await firstModule.getByRole("radio").first().check();
  await firstModule.getByRole("button", { name: "Check", exact: true }).click();
  await expect(firstModule.getByText(/Correct\.|Not quite\./)).toBeVisible();
});

test("assessment screens pass axe", async ({ page }) => {
  await page.goto(ASSESSMENT);
  const intro = await new AxeBuilder({ page }).analyze();
  expect(intro.violations.filter((v) => ["critical", "serious"].includes(v.impact ?? ""))).toEqual(
    [],
  );
  await page.getByRole("button", { name: "Start assessment" }).click();
  await expect(page.getByText("Question 1 of 6")).toBeVisible();
  const attempt = await new AxeBuilder({ page }).analyze();
  expect(
    attempt.violations.filter((v) => ["critical", "serious"].includes(v.impact ?? "")),
  ).toEqual([]);
});

test("a new section's assessment starts and reaches question one", async ({ page }) => {
  // Regression guard: the draw once hardcoded section 3's category slots, so
  // pressing Start anywhere else threw "empty question pool".
  await page.goto("/learn/ai-awareness/what-is-artificial-intelligence/assessment");
  await page.getByRole("button", { name: "Start assessment" }).click();
  await expect(page.getByText("Question 1 of 6")).toBeVisible();
  await expect(page.getByRole("radio").first()).toBeVisible();
});

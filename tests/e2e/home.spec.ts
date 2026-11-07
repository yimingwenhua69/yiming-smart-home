import { expect, test } from "@playwright/test";

for (const width of [390, 1440]) {
  test(`中文首页与导航适配 ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/");
    await expect(page).toHaveTitle(/奕明智能家居/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("更懂生活");
    await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
    await page.getByRole("link", { name: "探索智能生活" }).click();
    await expect(page).toHaveURL(/#solutions$/);
    await expect(page.getByRole("heading", { name: "全屋灯光", exact: true })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(errors).toEqual([]);
    await page.screenshot({ path: `test-results/home-${width}.png`, fullPage: true });
  });
}

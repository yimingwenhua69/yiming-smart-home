import { expect, test } from "@playwright/test";

for (const width of [390, 1440]) {
  test("Yiming 首页与导航适配 " + width + "px", async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/");
    await expect(page).toHaveTitle(/YIMING STUDIO/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("让空间与科技");
    await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
    await page.getByRole("link", { name: "探索产品知识" }).click();
    await expect(page).toHaveURL(/\/products\/$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("智能家居产品全景矩阵");
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(errors).toEqual([]);
    await page.screenshot({ path: "test-results/home-" + width + ".png", fullPage: true });
  });
}

test("六大知识领域、产品详情与搜索页面可访问", async ({ page }) => {
  const routes = [
    "/products/",
    "/products/aqara-hub-m3/",
    "/manufacturers/",
    "/protocols/",
    "/platforms/",
    "/lighting/",
    "/scenes/",
    "/engineering/",
    "/search/"
  ];
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", "zh-CN");
    await expect(page.locator("h1").first()).toBeVisible();
  }
});

test("产品分类筛选和对比交互可用", async ({ page }) => {
  await page.goto("/products/");
  await page.getByRole("button", { name: /传感器/ }).click();
  await expect(page.getByText("AI 智能存在传感器 FP1E")).toBeVisible();
  await page.getByRole("button", { name: "加入对比 +" }).first().click();
  await expect(page.getByText("产品参数对比")).toBeVisible();
});

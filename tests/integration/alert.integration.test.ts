import { expect, test } from "@playwright/test";

test("Alert component visuals", async ({ page }) => {
	await page.goto("/tests/alert");
	await page.waitForSelector('div[role="alert"]');
	await page.screenshot({ path: "verification/alert_final.png", fullPage: true });
});

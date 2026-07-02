import { test, expect } from "@playwright/test";

test.describe("Textarea Integration Tests", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/test-textarea");
        await page.waitForTimeout(1000); // Wait for hydration
	});

	test("should allow typing in interactive textarea", async ({ page }) => {
		const textarea = page.locator("#interactive-textarea");
		await textarea.type("Hello World");
		await expect(textarea).toHaveValue("Hello World");
	});

	test("should handle controlled state", async ({ page }) => {
		const textarea = page.locator("#controlled-textarea");
		await expect(textarea).toHaveValue("Initial value");

		await textarea.fill("");
		await textarea.type("New value");
		await expect(textarea).toHaveValue("New value");
	});
});

import { expect, test } from "@playwright/test";

test.describe("Tabs", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/tests/tabs");
	});

	test("should switch tabs on click", async ({ page }) => {
		const root = page.locator("#tabs-test");
		const trigger1 = root.locator('[data-part="trigger"][data-value="tab-1"]');
		const trigger2 = root.locator('[data-part="trigger"][data-value="tab-2"]');
		const content1 = root.locator('[data-part="content"][data-value="tab-1"]');
		const content2 = root.locator('[data-part="content"][data-value="tab-2"]');

		// Initial state
		await expect(trigger1).toHaveAttribute("data-state", "open");
		await expect(content1).toBeVisible();
		await expect(content2).toBeHidden();

		// Click Tab 2
		await trigger2.click();
		await expect(trigger1).toHaveAttribute("data-state", "closed");
		await expect(trigger2).toHaveAttribute("data-state", "open");
		await expect(content1).toBeHidden();
		await expect(content2).toBeVisible();
	});

	test("should handle keyboard navigation (horizontal)", async ({ page }) => {
		const root = page.locator("#tabs-test");
		const trigger1 = root.locator('[data-part="trigger"][data-value="tab-1"]');
		const trigger2 = root.locator('[data-part="trigger"][data-value="tab-2"]');

		await trigger1.focus();
		await page.keyboard.press("ArrowRight");

		await expect(trigger2).toBeFocused();
		await expect(trigger2).toHaveAttribute("data-state", "open");
	});

	test("should handle keyboard navigation (vertical)", async ({ page }) => {
		const root = page.locator("#tabs-vertical-test");
		const trigger1 = root.locator('[data-part="trigger"][data-value="tab-1"]');
		const trigger2 = root.locator('[data-part="trigger"][data-value="tab-2"]');

		await trigger1.focus();
		await page.keyboard.press("ArrowDown");

		await expect(trigger2).toBeFocused();
		await expect(trigger2).toHaveAttribute("data-state", "open");
	});

	test("should not switch to disabled tab", async ({ page }) => {
		const root = page.locator("#tabs-test");
		const trigger3 = root.locator('[data-part="trigger"][data-value="tab-3"]');
		const content1 = root.locator('[data-part="content"][data-value="tab-1"]');

		await trigger3.click();
		await expect(content1).toBeVisible();
		await expect(trigger3).toHaveAttribute("data-state", "closed");
	});
});

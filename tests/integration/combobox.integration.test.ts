import { test, expect } from '@playwright/test';

test.describe('Combobox Integration Tests (Draft)', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the combobox test page
    await page.goto('/test-combobox');

    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle');

    // Wait for hydration - wait for the client script to load and hydrate islands
    await page.waitForTimeout(3000);

    // Capture ALL console messages
    page.on('console', (msg) => {
      console.log(`Browser [${msg.type()}]:`, msg.text());
    });
  });

  test('should show options when clicking the trigger', async ({ page }) => {
    // We target the combobox on the home page
    const combobox = page.locator('[data-scope="combobox"]').first();
    const trigger = combobox.locator('[data-part="trigger"]');
    const content = combobox.locator('[data-part="positioner"]');

    // Click the trigger
    await trigger.click();

    // Content should be visible
    await expect(content).toBeVisible();

    // Check if some items are present
    const items = combobox.locator('[data-part="item"]');
    await expect(items.count()).toBeGreaterThan(0);
  });

  test('should filter options when typing in the input', async ({ page }) => {
    const combobox = page.locator('[data-scope="combobox"]').first();
    const input = combobox.locator('[data-part="input"]');

    // Type "React"
    await input.fill('React');

    // Content should be visible when typing
    const content = combobox.locator('[data-part="positioner"]');
    await expect(content).toBeVisible();

    // Should only show one item (React)
    const items = combobox.locator('[data-part="item"]');
    await expect(items).toHaveCount(1);
    await expect(items).toContainText('React');
  });

  test('should select an item when clicked', async ({ page }) => {
    const combobox = page.locator('[data-scope="combobox"]').first();
    const trigger = combobox.locator('[data-part="trigger"]');
    const input = combobox.locator('[data-part="input"]');

    // Open the list
    await trigger.click();

    // In ComboboxStructure, Item value is set to item.label: value={item.label}
    const svelteItem = combobox.locator('[data-part="item"][data-value="Svelte"]');
    await svelteItem.click();

    // Input should have "Svelte"
    await expect(input).toHaveValue('Svelte');

    // Content should be hidden after selection
    const content = combobox.locator('[data-part="positioner"]');
    await expect(content).not.toBeVisible();
  });

  test('should show "No results found" for mismatched input', async ({ page }) => {
    const combobox = page.locator('[data-scope="combobox"]').first();
    const input = combobox.locator('[data-part="input"]');

    // Type something that doesn't exist
    await input.fill('XYZ123');

    const empty = combobox.locator('[data-part="empty"]');
    await expect(empty).toBeVisible();
    await expect(empty).toHaveText('No results found');
  });
});

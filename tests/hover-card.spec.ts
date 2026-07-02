import { test, expect } from '@playwright/test';

test('HoverCard should show content on hover after delay', async ({ page }) => {
  await page.goto('/test-hover-card');

  const trigger = page.locator('#trigger');
  const content = page.locator('#content');

  // Initially content should be hidden
  await expect(content).not.toBeVisible();

  // Hover over trigger
  await trigger.hover();

  // Should be visible after delay (we set 100ms in the route)
  await expect(content).toBeVisible({ timeout: 1000 });

  // Move mouse away
  await page.mouse.move(0, 0);

  // Should be hidden after delay (100ms)
  await expect(content).not.toBeVisible({ timeout: 1000 });
});

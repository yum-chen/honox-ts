import { test, expect } from '@playwright/test';

test('Badge visual verification', async ({ page }) => {
  await page.goto('/tests/badge');
  await page.waitForLoadState('networkidle');

  // Check Outline Badge
  const outlineBadge = page.locator('div:has-text("Outline")').first();
  const outlineStyles = await outlineBadge.evaluate((el) => {
    const style = window.getComputedStyle(el);
    return {
      borderWidth: style.borderWidth,
      borderStyle: style.borderStyle,
      borderColor: style.borderColor,
    };
  });
  console.log('Outline Badge Styles:', outlineStyles);

  // Check Surface Badge
  const surfaceBadge = page.locator('div:has-text("Surface")').first();
  const surfaceStyles = await surfaceBadge.evaluate((el) => {
    const style = window.getComputedStyle(el);
    return {
      borderWidth: style.borderWidth,
      borderStyle: style.borderStyle,
      borderColor: style.borderColor,
    };
  });
  console.log('Surface Badge Styles:', surfaceStyles);

  // Check Success Badge (Semantic)
  const successBadge = page.locator('div:has-text("Success")').first();
  const successStyles = await successBadge.evaluate((el) => {
    const style = window.getComputedStyle(el);
    return {
      backgroundColor: style.backgroundColor,
      color: style.color,
    };
  });
  console.log('Success Badge Styles:', successStyles);

  await page.screenshot({ path: 'verification/badge_tests_v2.png', fullPage: true });
});

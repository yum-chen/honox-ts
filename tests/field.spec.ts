import { test, expect } from '@playwright/test';

test('Field interactivity and validation', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  const emailField = page.locator('input[type="email"]');
  await expect(emailField).toBeVisible();

  await emailField.fill('invalid-email');
  await emailField.dispatchEvent('input');
  // Check for the error message from the validator
  const errorText = page.locator('text=Please enter a valid email address containing @');
  await expect(errorText).toBeVisible();

  await emailField.fill('test@example.com');
  await emailField.dispatchEvent('input');
  await expect(errorText).not.toBeVisible();

  const usernameField = page.locator('input[placeholder="Enter username"]');
  await expect(usernameField).toHaveValue('usr');
  // Check for the error message from minLength
  const minLengthError = page.locator('text=Must be at least 5 characters');
  await expect(minLengthError).toBeVisible();

  await usernameField.fill('jules');
  await usernameField.dispatchEvent('input');
  await expect(minLengthError).not.toBeVisible();
});

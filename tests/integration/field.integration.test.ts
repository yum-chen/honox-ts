import { test, expect } from "@playwright/test";

// Draft integration tests for the Field component.
// Note: Some interactive features like custom validators may not work as expected
// during hydration because HonoX does not serialize functions passed as props.

test.describe("Field Component", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/test-field");
  });

  test("should render basic field with label and helper text", async ({ page }) => {
    const root = page.locator("section:has-text('Basic Field')");
    await expect(root.locator("label")).toHaveText("Basic Label");
    await expect(root.locator("div[id*='helper-text']")).toHaveText("Basic Helper");
    await expect(root.locator("input")).toHaveAttribute("placeholder", "Basic Placeholder");
  });

  test("should respect disabled state", async ({ page }) => {
    const root = page.locator("section:has-text('Disabled Field')");
    const input = root.locator("input");
    await expect(input).toBeDisabled();
    await expect(root.locator("[data-disabled]").first()).toBeVisible();
  });

  test("should respect readOnly state", async ({ page }) => {
    const root = page.locator("section:has-text('ReadOnly Field')");
    const input = root.locator("input");
    await expect(input).toHaveAttribute("readonly");
    await expect(root.locator("[data-readonly]").first()).toBeVisible();
  });

  test("should show initial validation errors from SSR", async ({ page }) => {
    const minLengthRoot = page.locator("section:has-text('MinLength Validation')");
    await expect(minLengthRoot.locator("div[id*='error-text']")).toHaveText("Must be at least 5 characters");

    const validatorRoot = page.locator("section:has-text('Custom Validator')");
    await expect(validatorRoot.locator("div[id*='error-text']")).toHaveText("Invalid email");
  });
});

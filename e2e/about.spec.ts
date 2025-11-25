import { test, expect } from '@playwright/test';

test.describe('About Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about');
  });

  test('should load and display about page', async ({ page }) => {
    // Wait for content to load
    await page.waitForLoadState('networkidle');

    // Should have some heading
    const heading = page.locator('h1, h2').first();
    await expect(heading).toBeVisible();

    // Should have some content
    const mainContent = page.locator('main, [role="main"]');
    await expect(mainContent).toBeVisible();
  });

  test('should display information about the app', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    // Should have some descriptive text
    const content = page.locator('main, [role="main"]');
    const text = await content.textContent();

    expect(text).toBeTruthy();
    expect(text!.length).toBeGreaterThan(50);
  });

  test('should have proper page metadata', async ({ page }) => {
    await expect(page).toHaveTitle(/About/i);
  });
});

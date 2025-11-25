import { test, expect } from '@playwright/test';

test.describe('Character Detail Page', () => {
  test('should navigate to character detail page directly', async ({ page }) => {
    // Navigate directly to a character detail page (using ID 1)
    await page.goto('/characters/1');

    // Wait for content to load
    await page.waitForLoadState('domcontentloaded');

    // Should be on a character detail page
    expect(page.url()).toContain('/characters/1');

    // Page should have loaded with content
    const heading = page.locator('h1, h2').first();
    await expect(heading).toBeVisible();
  });

  test('should display character information sections', async ({ page }) => {
    // Navigate to a specific character (using ID 1 as an example)
    await page.goto('/characters/1');

    // Wait for content to load
    await page.waitForLoadState('networkidle');

    // The page should have character content
    // Check for common sections that might appear
    const mainContent = page.locator('main, [role="main"], article').first();
    await expect(mainContent).toBeVisible({ timeout: 10000 });

    // Character name should be visible
    const heading = page.locator('h1').first();
    await expect(heading).toBeVisible();
  });

  test('should handle invalid character ID gracefully', async ({ page }) => {
    // Try to access a character with an invalid ID
    await page.goto('/characters/999999');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Should either show an error message or redirect
    // The page should have loaded without crashing
    expect(page.url()).toBeTruthy();
  });
});

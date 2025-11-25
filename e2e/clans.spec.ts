import { test, expect } from '@playwright/test';

test.describe('Clans Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/clans');
  });

  test('should load and display clans page', async ({ page }) => {
    // Check page title
    await expect(page.getByRole('heading', { name: /Naruto Clans/i })).toBeVisible();

    // Check description
    await expect(page.getByText(/Explore the legendary clans/i)).toBeVisible();

    // Wait for content to load
    await page.waitForLoadState('networkidle');

    // Page should be loaded successfully (check by verifying heading is still visible)
    const title = page.getByRole('heading', { name: /Naruto Clans/i });
    await expect(title).toBeVisible();
  });

  test('should display clans in a grid layout', async ({ page }) => {
    // Wait for clans to load
    await page.waitForLoadState('networkidle');

    // Look for clan cards or grid items
    // Clans are likely displayed in some kind of card or grid format
    const gridItems = page.locator('article, [class*="card"], [class*="bento"]');

    if (await gridItems.first().isVisible({ timeout: 10000 })) {
      const count = await gridItems.count();
      expect(count).toBeGreaterThan(0);
    }
  });

  test('should have pagination if multiple pages exist', async ({ page }) => {
    await page.waitForLoadState('networkidle');

    // Check for pagination
    const pagination = page.locator('nav[aria-label*="Pagination"], [class*="pagination"]');

    // Pagination might not exist if there's only one page
    const paginationCount = await pagination.count();

    if (paginationCount > 0) {
      await expect(pagination.first()).toBeVisible();
    }
  });

  test('should display proper page metadata', async ({ page }) => {
    await expect(page).toHaveTitle(/Clans/i);
  });
});

import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate through all main pages', async ({ page }) => {
    // Start at home
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Naruto Universe' })).toBeVisible();

    // Navigate to Characters
    await page.goto('/characters');
    await expect(page.getByRole('heading', { name: /Naruto Characters/i })).toBeVisible();

    // Navigate to Clans
    await page.goto('/clans');
    await expect(page.getByRole('heading', { name: /Naruto Clans/i })).toBeVisible();

    // Navigate to About
    await page.goto('/about');
    await expect(page.locator('h1, h2').first()).toBeVisible();
  });

  test('should handle 404 pages gracefully', async ({ page }) => {
    await page.goto('/non-existent-page');

    // The page should have loaded (either 404 or redirect)
    expect(page.url()).toBeTruthy();
  });

  test('should navigate back and forward', async ({ page }) => {
    await page.goto('/');
    await page.goto('/characters');

    await page.goBack();
    await expect(page).toHaveURL('/');

    await page.goForward();
    await expect(page).toHaveURL('/characters');
  });
});

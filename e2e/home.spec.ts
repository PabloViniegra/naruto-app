import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load successfully and display hero section', async ({ page }) => {
    // Wait for main content to be visible
    await expect(page.locator('#main-content')).toBeVisible();

    // Check hero title
    await expect(page.getByRole('heading', { name: 'Naruto Universe' })).toBeVisible();

    // Check hero description - more specific selector to avoid title element
    await expect(page.locator('p').filter({ hasText: /Explore the ninja world/ })).toBeVisible();
  });

  test('should display statistics', async ({ page }) => {
    // Check that statistics are visible
    await expect(page.getByText('1400+')).toBeVisible();
    await expect(page.locator('span').filter({ hasText: 'Characters', exact: true })).toBeVisible();

    await expect(page.getByText('500+')).toBeVisible();
    await expect(page.locator('span').filter({ hasText: 'Jutsu', exact: true })).toBeVisible();

    await expect(page.getByText('50+')).toBeVisible();
    await expect(page.locator('span').filter({ hasText: 'Clans', exact: true })).toBeVisible();
  });

  test('should have working "Explore Universe" button', async ({ page }) => {
    const exploreButton = page.getByRole('link', { name: /Explore Universe/i });

    await expect(exploreButton).toBeVisible();
    await expect(exploreButton).toHaveAttribute('href', '/characters');
  });

  test('should navigate to characters page when clicking explore button', async ({ page }) => {
    const exploreButton = page.getByRole('link', { name: /Explore Universe/i });

    // Click the button
    await exploreButton.click();

    // Wait for navigation with longer timeout
    await page.waitForURL(/\/characters/, { timeout: 10000 });

    // Verify we're on characters page
    await expect(page).toHaveURL(/\/characters/);
  });

  test('should have proper page metadata', async ({ page }) => {
    await expect(page).toHaveTitle(/Naruto Universe/i);
  });
});

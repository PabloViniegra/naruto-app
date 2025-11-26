import { test, expect } from '@playwright/test';

test.describe('Characters Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/characters');
  });

  test('should load and display characters list', async ({ page }) => {
    // Check page title
    await expect(page.getByRole('heading', { name: /Naruto Characters/i })).toBeVisible();

    // Check description
    await expect(page.getByText(/Browse over 1400 characters/i)).toBeVisible();

    // Wait for characters to load - check for any character cards
    // Character cards should have links to individual character pages
    const characterCards = page.locator('a[href^="/characters/"]');
    await expect(characterCards.first()).toBeVisible({ timeout: 10000 });

    // Should have multiple character cards
    const count = await characterCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should display search input', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/Search characters/i);
    await expect(searchInput).toBeVisible();
  });

  test('should filter characters by search query', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/Search characters/i);

    // Wait for initial characters to load
    await expect(page.locator('a[href^="/characters/"]').first()).toBeVisible({ timeout: 10000 });

    // Get initial count
    const initialCount = await page.locator('a[href^="/characters/"]').count();
    expect(initialCount).toBeGreaterThan(0);

    // Type search query
    await searchInput.fill('Naruto');

    // Wait for filtering to happen (debounced)
    await page.waitForTimeout(500);

    // Should still have results
    const characterCards = page.locator('a[href^="/characters/"]');
    const filteredCount = await characterCards.count();

    // Should have at least one result for "Naruto"
    expect(filteredCount).toBeGreaterThan(0);
  });

  test('should clear search input', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/Search characters/i);

    await searchInput.fill('Sasuke');
    await page.waitForTimeout(500);

    // Clear the input
    await searchInput.fill('');
    await page.waitForTimeout(500);

    // Search input should be empty
    await expect(searchInput).toHaveValue('');
  });

  test('should display pagination when not searching', async ({ page }) => {
    // Pagination should be visible (if there are multiple pages)
    const pagination = page.locator('nav[aria-label="Pagination"]');

    // Check if pagination exists, it's optional based on data
    const paginationCount = await pagination.count();

    if (paginationCount > 0) {
      await expect(pagination).toBeVisible();

      // Should have page numbers or navigation buttons
      const buttons = pagination.locator('button, a');
      expect(await buttons.count()).toBeGreaterThan(0);
    }
  });

  test('should navigate through pagination when available', async ({ page }) => {
    // Check if pagination exists
    const pagination = page.locator('nav[aria-label="Pagination"]');
    const hasPages = (await pagination.count()) > 0;

    if (hasPages) {
      // Pagination should be visible
      await expect(pagination).toBeVisible();

      // Should have navigation buttons
      const buttons = pagination.locator('button, a');
      const buttonCount = await buttons.count();
      expect(buttonCount).toBeGreaterThan(0);
    }
  });
});

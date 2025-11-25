import { Page, expect } from '@playwright/test';

/**
 * Wait for the page to be fully loaded with content
 */
export async function waitForPageLoad(page: Page) {
  await page.waitForLoadState('networkidle');
}

/**
 * Wait for character cards to be visible on the page
 */
export async function waitForCharacterCards(page: Page, timeout = 10000) {
  const characterCards = page.locator('a[href^="/characters/"]');
  await expect(characterCards.first()).toBeVisible({ timeout });
  return characterCards;
}

/**
 * Navigate to a specific page and wait for it to load
 */
export async function navigateAndWait(page: Page, url: string) {
  await page.goto(url);
  await waitForPageLoad(page);
}

/**
 * Check if an element exists without throwing an error
 */
export async function elementExists(page: Page, selector: string): Promise<boolean> {
  const count = await page.locator(selector).count();
  return count > 0;
}

/**
 * Get the count of visible elements matching a selector
 */
export async function getVisibleCount(page: Page, selector: string): Promise<number> {
  const elements = page.locator(selector);
  return await elements.count();
}

/**
 * Wait for debounced input (like search)
 */
export async function waitForDebounce(delayMs = 500) {
  return new Promise(resolve => setTimeout(resolve, delayMs));
}

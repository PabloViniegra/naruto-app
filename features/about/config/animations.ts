/**
 * Animation configuration for the About page
 */
export const ANIMATION_CONFIG = {
    duration: {
        fast: 300,
        normal: 700,
    },
    stagger: {
        base: 150,
        increment: 50,
    },
} as const;

/**
 * Calculates the animation delay for a feature card based on its index
 * @param index - The index of the feature card (0-based)
 * @returns The animation delay in milliseconds
 */
export function getFeatureDelay(index: number): number {
    return ANIMATION_CONFIG.stagger.base + index * ANIMATION_CONFIG.stagger.increment;
}

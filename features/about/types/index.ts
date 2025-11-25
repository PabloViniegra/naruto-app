import type { LucideIcon } from "lucide-react";

/**
 * Represents a feature card in the "What You Can Explore" section
 */
export type ExploreFeature = {
    readonly title: string;
    readonly description: string;
    readonly href: string;
};

/**
 * Represents a mission card in the "Our Mission" section
 */
export type MissionCard = {
    readonly icon: LucideIcon;
    readonly title: string;
    readonly description: string;
    readonly iconClassName?: string;
};

/**
 * Represents an external link configuration
 */
export type ExternalLink = {
    readonly href: string;
    readonly label: string;
    readonly variant?: "default" | "outline";
};

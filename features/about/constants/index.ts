import { Code2, Zap } from "lucide-react";
import type { ExploreFeature, MissionCard, ExternalLink } from "../types";

/**
 * Features available for exploration on the platform
 */
export const EXPLORE_FEATURES = [
    {
        title: "Characters",
        description:
            "Discover detailed profiles of all ninja warriors and their unique abilities",
        href: "/characters",
    },
    {
        title: "Clans",
        description:
            "Learn about powerful ninja families and their incredible legacies",
        href: "/clans",
    },
    {
        title: "Villages",
        description: "Explore the hidden villages and the stories that shape them",
        href: "/villages",
    },
] as const satisfies readonly ExploreFeature[];

/**
 * Mission cards highlighting platform capabilities
 */
export const MISSION_CARDS = [
    {
        icon: Code2,
        title: "Comprehensive Database",
        description:
            "Access detailed information about over 1400 characters, their abilities, affiliations, and relationships within the Naruto universe.",
    },
    {
        icon: Zap,
        title: "Always Updated",
        description:
            "Our database is continuously updated with the latest information from the Naruto and Boruto series to keep you informed about all ninja world developments.",
    },
] as const satisfies readonly MissionCard[];

/**
 * External API links and documentation
 */
export const EXTERNAL_LINKS = {
    DATTEBAYO_API: "https://api-dattebayo.vercel.app/",
    DATTEBAYO_DOCS: "https://api-dattebayo.vercel.app/docs",
} as const;

/**
 * External link configurations for buttons
 */
export const API_LINKS = [
    {
        href: EXTERNAL_LINKS.DATTEBAYO_API,
        label: "Dattebayo API",
        variant: "default" as const,
    },
    {
        href: EXTERNAL_LINKS.DATTEBAYO_DOCS,
        label: "API Documentation",
        variant: "outline" as const,
    },
] as const satisfies readonly ExternalLink[];

/**
 * Animation delay values in milliseconds for staggered animations
 */
export const ANIMATION_DELAYS = {
    HERO: 0,
    MISSION: 100,
    FEATURES: 150,
    API_CREDIT: 200,
    CTA: 300,
    FOOTER: 300,
} as const;

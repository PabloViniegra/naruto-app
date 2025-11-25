// Main component
export { AboutContent } from "./components/about-content";

// Section components
export { HeroSection } from "./components/hero-section";
export { MissionSection } from "./components/mission-section";
export { FeaturesSection } from "./components/features-section";
export { ApiCreditSection } from "./components/api-credit-section";
export { CtaSection } from "./components/cta-section";
export { FooterInfo } from "./components/footer-info";

// Reusable components
export { MissionCard } from "./components/mission-card";

// Types
export type { ExploreFeature, MissionCard as MissionCardType, ExternalLink } from "./types";

// Constants
export {
    EXPLORE_FEATURES,
    MISSION_CARDS,
    EXTERNAL_LINKS,
    API_LINKS,
    ANIMATION_DELAYS,
} from "./constants";

// Configuration
export { ANIMATION_CONFIG, getFeatureDelay } from "./config/animations";

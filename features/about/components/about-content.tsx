"use client";

import { HeroSection } from "./hero-section";
import { MissionSection } from "./mission-section";
import { FeaturesSection } from "./features-section";
import { ApiCreditSection } from "./api-credit-section";
import { CtaSection } from "./cta-section";
import { FooterInfo } from "./footer-info";

/**
 * Main content component for the About page.
 * Composes all section components into a unified layout.
 */
export function AboutContent() {
    return (
        <div className="space-y-12 sm:space-y-16">
            <HeroSection />
            <MissionSection />
            <FeaturesSection />
            <ApiCreditSection />
            <CtaSection />
            <FooterInfo />
        </div>
    );
}

import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AboutContent } from "../about-content";

describe("AboutContent", () => {
    describe("Hero Section", () => {
        it("should render the hero section with main heading", () => {
            render(<AboutContent />);

            const heading = screen.getByRole("heading", {
                level: 1,
                name: /about naruto universe/i,
            });
            expect(heading).toBeInTheDocument();
        });

        it("should render the hero section description text", () => {
            render(<AboutContent />);

            expect(
                screen.getByText(
                    /dive into the vast and intricate world of naruto/i
                )
            ).toBeInTheDocument();
            expect(
                screen.getByText(
                    /our platform provides comprehensive information about characters, clans, villages, and the incredible jutsu/i
                )
            ).toBeInTheDocument();
        });

        it("should apply animation classes to hero section", () => {
            const { container } = render(<AboutContent />);

            const heroSection = container.querySelector(
                ".animate-in.fade-in.slide-in-from-bottom-4"
            );
            expect(heroSection).toBeInTheDocument();
        });
    });

    describe("Mission Section", () => {
        it("should render the mission section heading", () => {
            render(<AboutContent />);

            const heading = screen.getByRole("heading", {
                level: 2,
                name: /our mission/i,
            });
            expect(heading).toBeInTheDocument();
        });

        it("should render Comprehensive Database card with correct content", () => {
            render(<AboutContent />);

            expect(
                screen.getByRole("heading", {
                    level: 3,
                    name: /comprehensive database/i,
                })
            ).toBeInTheDocument();
            expect(
                screen.getByText(/access detailed information about over 1400 characters/i)
            ).toBeInTheDocument();
        });

        it("should render Always Updated card with correct content", () => {
            render(<AboutContent />);

            expect(
                screen.getByRole("heading", {
                    level: 3,
                    name: /always updated/i,
                })
            ).toBeInTheDocument();
            expect(
                screen.getByText(
                    /our database is continuously updated with the latest information/i
                )
            ).toBeInTheDocument();
        });

        it("should render Code2 icon in Comprehensive Database card", () => {
            const { container } = render(<AboutContent />);

            // lucide-react icons are rendered as SVGs
            const svgs = container.querySelectorAll("svg");
            expect(svgs.length).toBeGreaterThan(0);
        });

        it("should render Zap icon in Always Updated card", () => {
            const { container } = render(<AboutContent />);

            const svgs = container.querySelectorAll("svg");
            expect(svgs.length).toBeGreaterThan(0);
        });

        it("should render mission cards in a grid layout", () => {
            const { container } = render(<AboutContent />);

            const grid = container.querySelector(".grid.grid-cols-1.md\\:grid-cols-2");
            expect(grid).toBeInTheDocument();
        });
    });

    describe("Features Section", () => {
        it("should render the features section heading", () => {
            render(<AboutContent />);

            const heading = screen.getByRole("heading", {
                level: 2,
                name: /what you can explore/i,
            });
            expect(heading).toBeInTheDocument();
        });

        it("should render Characters link with correct href", () => {
            render(<AboutContent />);

            const link = screen.getByRole("link", { name: /characters/i });
            expect(link).toHaveAttribute("href", "/characters");
            expect(
                screen.getByText(
                    /discover detailed profiles of all ninja warriors/i
                )
            ).toBeInTheDocument();
        });

        it("should render Clans link with correct href", () => {
            render(<AboutContent />);

            const link = screen.getByRole("link", { name: /clans/i });
            expect(link).toHaveAttribute("href", "/clans");
            expect(
                screen.getByText(
                    /learn about powerful ninja families and their incredible legacies/i
                )
            ).toBeInTheDocument();
        });

        it("should render Villages link with correct href", () => {
            render(<AboutContent />);

            const link = screen.getByRole("link", { name: /villages/i });
            expect(link).toHaveAttribute("href", "/villages");
            expect(
                screen.getByText(
                    /explore the hidden villages and the stories that shape them/i
                )
            ).toBeInTheDocument();
        });

        it("should render all three feature links", () => {
            render(<AboutContent />);

            // Check for specific text in feature links
            expect(
                screen.getByRole("link", { name: /^characters/i })
            ).toBeInTheDocument();
            expect(screen.getByRole("link", { name: /^clans/i })).toBeInTheDocument();
            expect(
                screen.getByRole("link", { name: /^villages/i })
            ).toBeInTheDocument();
        });

        it("should render features in a grid layout", () => {
            const { container } = render(<AboutContent />);

            const grid = container.querySelector(".grid.grid-cols-1.md\\:grid-cols-3");
            expect(grid).toBeInTheDocument();
        });
    });

    describe("API Credit Section", () => {
        it("should render the Powered By heading", () => {
            render(<AboutContent />);

            const heading = screen.getByRole("heading", {
                level: 2,
                name: /powered by/i,
            });
            expect(heading).toBeInTheDocument();
        });

        it("should render Dattebayo API description text", () => {
            render(<AboutContent />);

            expect(
                screen.getByText(
                    /this application is built on top of the incredible/i,
                    { exact: false }
                )
            ).toBeInTheDocument();
            // Check for the link specifically
            expect(
                screen.getByRole("link", { name: /dattebayo api/i })
            ).toBeInTheDocument();
        });

        it("should render Dattebayo API button with correct href", () => {
            render(<AboutContent />);

            const link = screen.getByRole("link", { name: /dattebayo api/i });
            expect(link).toHaveAttribute("href", "https://api-dattebayo.vercel.app/");
        });

        it("should render Dattebayo API link to open in new tab", () => {
            render(<AboutContent />);

            const link = screen.getByRole("link", { name: /dattebayo api/i });
            expect(link).toHaveAttribute("target", "_blank");
            expect(link).toHaveAttribute("rel", "noopener noreferrer");
        });

        it("should render API Documentation button with correct href", () => {
            render(<AboutContent />);

            const link = screen.getByRole("link", { name: /api documentation/i });
            expect(link).toHaveAttribute(
                "href",
                "https://api-dattebayo.vercel.app/docs"
            );
        });

        it("should render API Documentation link to open in new tab", () => {
            render(<AboutContent />);

            const link = screen.getByRole("link", { name: /api documentation/i });
            expect(link).toHaveAttribute("target", "_blank");
            expect(link).toHaveAttribute("rel", "noopener noreferrer");
        });

        it("should render ExternalLink icons on buttons", () => {
            const { container } = render(<AboutContent />);

            const svgs = container.querySelectorAll("svg");
            // Should have multiple SVG icons (including ExternalLink icons)
            expect(svgs.length).toBeGreaterThan(2);
        });

        it("should render API description box", () => {
            render(<AboutContent />);

            expect(
                screen.getByText(/is a RESTful API that provides comprehensive information/i)
            ).toBeInTheDocument();
            expect(
                screen.getByText(
                    /maintained by a passionate community of naruto fans and developers/i
                )
            ).toBeInTheDocument();
        });

        it("should render Dattebayo API in monospace font in description", () => {
            render(<AboutContent />);

            const monoText = screen.getAllByText(/dattebayo api/i);
            // Find the one in the description box with font-mono class
            const descriptionText = monoText.find(
                (el) =>
                    el.classList.contains("font-mono") &&
                    el.classList.contains("font-bold")
            );
            expect(descriptionText).toBeInTheDocument();
        });
    });

    describe("CTA Section", () => {
        it("should render the CTA heading", () => {
            render(<AboutContent />);

            const heading = screen.getByRole("heading", {
                level: 2,
                name: /ready to explore the ninja world/i,
            });
            expect(heading).toBeInTheDocument();
        });

        it("should render the CTA description text", () => {
            render(<AboutContent />);

            expect(
                screen.getByText(/start your journey through the naruto universe/i)
            ).toBeInTheDocument();
            expect(
                screen.getByText(
                    /discover characters, uncover their abilities, and explore the intricate relationships/i
                )
            ).toBeInTheDocument();
        });

        it("should render Start Exploring button with correct link", () => {
            render(<AboutContent />);

            const link = screen.getByRole("link", { name: /start exploring/i });
            expect(link).toHaveAttribute("href", "/characters");
        });

        it("should apply gradient background to CTA section", () => {
            const { container } = render(<AboutContent />);

            const ctaSection = container.querySelector(
                ".bg-gradient-to-r.from-primary\\/10.to-primary\\/5"
            );
            expect(ctaSection).toBeInTheDocument();
        });
    });

    describe("Footer Info Section", () => {
        it("should render footer disclaimer about fan-made application", () => {
            render(<AboutContent />);

            expect(
                screen.getByText(
                    /naruto universe is a fan-made application created for educational purposes/i
                )
            ).toBeInTheDocument();
        });

        it("should render footer credit to Masashi Kishimoto", () => {
            render(<AboutContent />);

            expect(
                screen.getByText(
                    /all content is based on the naruto and boruto series created by masashi kishimoto/i
                )
            ).toBeInTheDocument();
        });

        it("should have border-top on footer section", () => {
            const { container } = render(<AboutContent />);

            const footer = container.querySelector(".border-t.border-border");
            expect(footer).toBeInTheDocument();
        });
    });

    describe("Responsive Design", () => {
        it("should have responsive grid classes for mission cards", () => {
            const { container } = render(<AboutContent />);

            const missionGrid = container.querySelector(
                ".grid-cols-1.md\\:grid-cols-2"
            );
            expect(missionGrid).toBeInTheDocument();
        });

        it("should have responsive grid classes for feature cards", () => {
            const { container } = render(<AboutContent />);

            const featuresGrid = container.querySelector(
                ".grid-cols-1.md\\:grid-cols-3"
            );
            expect(featuresGrid).toBeInTheDocument();
        });

        it("should have responsive text sizes for main heading", () => {
            const { container } = render(<AboutContent />);

            const heading = container.querySelector(
                ".text-3xl.sm\\:text-4xl.md\\:text-5xl"
            );
            expect(heading).toBeInTheDocument();
        });

        it("should have responsive flex direction for API buttons", () => {
            const { container } = render(<AboutContent />);

            const buttonContainer = container.querySelector(
                ".flex-col.sm\\:flex-row"
            );
            expect(buttonContainer).toBeInTheDocument();
        });
    });

    describe("Animations", () => {
        it("should apply animation classes to all main sections", () => {
            const { container } = render(<AboutContent />);

            const animatedSections = container.querySelectorAll(
                ".animate-in.fade-in.slide-in-from-bottom-4"
            );
            // Should have multiple animated sections (hero, mission, features, API, CTA, footer)
            expect(animatedSections.length).toBeGreaterThanOrEqual(5);
        });

        it("should apply staggered animation delays", () => {
            const { container } = render(<AboutContent />);

            const delayedSections = container.querySelectorAll("[class*='delay-']");
            expect(delayedSections.length).toBeGreaterThan(0);
        });
    });

    describe("Accessibility", () => {
        it("should have all sections with proper heading hierarchy", () => {
            render(<AboutContent />);

            // One h1
            const h1 = screen.getByRole("heading", { level: 1 });
            expect(h1).toBeInTheDocument();

            // Multiple h2s
            const h2s = screen.getAllByRole("heading", { level: 2 });
            expect(h2s.length).toBeGreaterThanOrEqual(4);

            // Multiple h3s
            const h3s = screen.getAllByRole("heading", { level: 3 });
            expect(h3s.length).toBeGreaterThanOrEqual(2);
        });

        it("should have all links with meaningful text", () => {
            render(<AboutContent />);

            const links = screen.getAllByRole("link");
            links.forEach((link) => {
                expect(link.textContent).toBeTruthy();
                expect(link.textContent?.trim().length).toBeGreaterThan(0);
            });
        });

        it("should have external links with proper security attributes", () => {
            render(<AboutContent />);

            const externalLinks = screen.getAllByRole("link").filter((link) => {
                const href = link.getAttribute("href");
                return href?.startsWith("http");
            });

            externalLinks.forEach((link) => {
                expect(link).toHaveAttribute("target", "_blank");
                expect(link).toHaveAttribute("rel", "noopener noreferrer");
            });
        });
    });

    describe("Component Structure", () => {
        it("should render without errors", () => {
            const { container } = render(<AboutContent />);
            expect(container).toBeInTheDocument();
        });

        it("should wrap all content in a space-y container", () => {
            const { container } = render(<AboutContent />);

            const mainContainer = container.querySelector(".space-y-12.sm\\:space-y-16");
            expect(mainContainer).toBeInTheDocument();
        });

        it("should render all six main sections", () => {
            const { container } = render(<AboutContent />);

            const sections = container.querySelectorAll("section");
            // Hero, Mission, Features, API Credit, CTA, Footer Info
            expect(sections.length).toBe(6);
        });

        it("should use Card component for mission cards", () => {
            const { container } = render(<AboutContent />);

            // Card components have data-slot="card" attribute
            const cards = container.querySelectorAll("[data-slot='card']");
            expect(cards.length).toBeGreaterThanOrEqual(2);
        });

        it("should use Button component for CTA and API links", () => {
            render(<AboutContent />);

            // Buttons should be rendered as links with specific text
            const buttons = [
                screen.getByRole("link", { name: /dattebayo api/i }),
                screen.getByRole("link", { name: /api documentation/i }),
                screen.getByRole("link", { name: /start exploring/i }),
            ];

            buttons.forEach((button) => {
                expect(button).toBeInTheDocument();
            });
        });
    });

    describe("Hover Effects", () => {
        it("should have hover transition classes on cards", () => {
            const { container } = render(<AboutContent />);

            const cardsWithHover = container.querySelectorAll(
                "[class*='hover:border-primary']"
            );
            expect(cardsWithHover.length).toBeGreaterThan(0);
        });

        it("should have group hover effects on mission cards", () => {
            const { container } = render(<AboutContent />);

            const groupElements = container.querySelectorAll(".group");
            expect(groupElements.length).toBeGreaterThan(0);
        });

        it("should have transition classes for smooth animations", () => {
            const { container } = render(<AboutContent />);

            const transitionElements = container.querySelectorAll(
                "[class*='transition']"
            );
            expect(transitionElements.length).toBeGreaterThan(0);
        });
    });
});

import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { CharacterCard } from "../character-card";
import type { Character } from "@/types";

// Mock the CharacterImage component since it uses client-side state
vi.mock("../character-image", () => ({
    CharacterImage: function MockCharacterImage({
        src,
        alt,
        className,
    }: {
        src: string;
        alt: string;
        className?: string;
    }) {
        return React.createElement("div", {
            "data-testid": "character-image",
            "data-src": src,
            "data-alt": alt,
            className,
        });
    },
}));

// Helper to create a mock character
function createMockCharacter(overrides: Partial<Character> = {}): Character {
    return {
        id: 1,
        name: "Naruto Uzumaki",
        images: ["https://example.com/naruto.jpg"],
        jutsu: ["Rasengan", "Shadow Clone Jutsu", "Sage Mode"],
        natureType: ["Wind", "Fire", "Earth", "Water"],
        personal: {
            clan: "Uzumaki",
            affiliation: ["Konohagakure"],
            sex: "Male",
            birthdate: "October 10",
            bloodType: "B",
            status: "Alive",
            species: "Human",
            kekkeiGenkai: [],
            classification: "Jinchuriki",
            occupation: "Hokage",
            team: ["Team 7"],
            titles: ["Seventh Hokage"],
        },
        ...overrides,
    };
}

describe("CharacterCard", () => {
    describe("rendering", () => {
        it("should render the character name", () => {
            const character = createMockCharacter();
            render(<CharacterCard character={character} />);

            expect(screen.getByText("Naruto Uzumaki")).toBeInTheDocument();
        });

        it("should render the character clan", () => {
            const character = createMockCharacter();
            render(<CharacterCard character={character} />);

            expect(screen.getByText("Uzumaki")).toBeInTheDocument();
        });

        it("should render the village affiliation", () => {
            const character = createMockCharacter();
            render(<CharacterCard character={character} />);

            expect(screen.getByText("Village")).toBeInTheDocument();
            expect(screen.getByText("Konohagakure")).toBeInTheDocument();
        });

        it("should render jutsu count when character has jutsu", () => {
            const character = createMockCharacter({
                jutsu: ["Rasengan", "Shadow Clone Jutsu", "Sage Mode"],
            });
            render(<CharacterCard character={character} />);

            expect(screen.getByText("Jutsu")).toBeInTheDocument();
            expect(screen.getByText("3 techniques")).toBeInTheDocument();
        });

        it("should render sex when available", () => {
            const character = createMockCharacter();
            render(<CharacterCard character={character} />);

            expect(screen.getByText("Sex")).toBeInTheDocument();
            expect(screen.getByText("Male")).toBeInTheDocument();
        });

        it("should render nature types as badges", () => {
            const character = createMockCharacter({
                natureType: ["Wind", "Fire"],
            });
            render(<CharacterCard character={character} />);

            expect(screen.getByText("Wind")).toBeInTheDocument();
            expect(screen.getByText("Fire")).toBeInTheDocument();
        });
    });

    describe("link behavior", () => {
        it("should link to the character detail page", () => {
            const character = createMockCharacter({ id: 123 });
            render(<CharacterCard character={character} />);

            const link = screen.getByRole("link");
            expect(link).toHaveAttribute("href", "/characters/123");
        });
    });

    describe("missing data handling", () => {
        it("should display 'Unknown Clan' when clan is not provided", () => {
            const character = createMockCharacter({
                personal: undefined,
            });
            render(<CharacterCard character={character} />);

            expect(screen.getByText("Unknown Clan")).toBeInTheDocument();
        });

        it("should display 'Unknown Village' when affiliation is not provided", () => {
            const character = createMockCharacter({
                personal: {
                    clan: "Test Clan",
                    affiliation: undefined,
                    sex: undefined,
                    birthdate: undefined,
                    bloodType: undefined,
                    status: undefined,
                    species: undefined,
                    kekkeiGenkai: undefined,
                    classification: undefined,
                    occupation: undefined,
                    team: undefined,
                    titles: undefined,
                },
            });
            render(<CharacterCard character={character} />);

            expect(screen.getByText("Unknown Village")).toBeInTheDocument();
        });

        it("should not render jutsu section when jutsu array is empty", () => {
            const character = createMockCharacter({
                jutsu: [],
            });
            render(<CharacterCard character={character} />);

            expect(screen.queryByText("Jutsu")).not.toBeInTheDocument();
        });

        it("should not render jutsu section when jutsu is undefined", () => {
            const character = createMockCharacter({
                jutsu: undefined,
            });
            render(<CharacterCard character={character} />);

            expect(screen.queryByText("Jutsu")).not.toBeInTheDocument();
        });

        it("should not render sex when not provided", () => {
            const character = createMockCharacter({
                personal: {
                    clan: "Test",
                    affiliation: ["Test Village"],
                    sex: undefined,
                    birthdate: undefined,
                    bloodType: undefined,
                    status: undefined,
                    species: undefined,
                    kekkeiGenkai: undefined,
                    classification: undefined,
                    occupation: undefined,
                    team: undefined,
                    titles: undefined,
                },
            });
            render(<CharacterCard character={character} />);

            expect(screen.queryByText("Sex")).not.toBeInTheDocument();
        });

        it("should not render nature types when not provided", () => {
            const character = createMockCharacter({
                natureType: undefined,
            });
            render(<CharacterCard character={character} />);

            expect(screen.queryByText("Wind")).not.toBeInTheDocument();
        });

        it("should not render nature types when array is empty", () => {
            const character = createMockCharacter({
                natureType: [],
            });
            render(<CharacterCard character={character} />);

            // Should not have any nature type badges
            const badges = screen.queryAllByText(/Fire|Wind|Earth|Water/);
            expect(badges).toHaveLength(0);
        });
    });

    describe("nature type display", () => {
        it("should display up to 3 nature types", () => {
            const character = createMockCharacter({
                natureType: ["Wind", "Fire", "Earth"],
            });
            render(<CharacterCard character={character} />);

            expect(screen.getByText("Wind")).toBeInTheDocument();
            expect(screen.getByText("Fire")).toBeInTheDocument();
            expect(screen.getByText("Earth")).toBeInTheDocument();
        });

        it("should show count of additional nature types when more than 3", () => {
            const character = createMockCharacter({
                natureType: ["Wind", "Fire", "Earth", "Water", "Lightning"],
            });
            render(<CharacterCard character={character} />);

            expect(screen.getByText("Wind")).toBeInTheDocument();
            expect(screen.getByText("Fire")).toBeInTheDocument();
            expect(screen.getByText("Earth")).toBeInTheDocument();
            expect(screen.queryByText("Water")).not.toBeInTheDocument();
            expect(screen.queryByText("Lightning")).not.toBeInTheDocument();
            expect(screen.getByText("+2")).toBeInTheDocument();
        });

        it("should show +1 when there are exactly 4 nature types", () => {
            const character = createMockCharacter({
                natureType: ["Wind", "Fire", "Earth", "Water"],
            });
            render(<CharacterCard character={character} />);

            expect(screen.getByText("+1")).toBeInTheDocument();
        });
    });

    describe("image handling", () => {
        it("should pass the first image to CharacterImage", () => {
            const character = createMockCharacter({
                images: [
                    "https://example.com/image1.jpg",
                    "https://example.com/image2.jpg",
                ],
            });
            render(<CharacterCard character={character} />);

            const image = screen.getByTestId("character-image");
            expect(image).toHaveAttribute(
                "data-src",
                "https://example.com/image1.jpg"
            );
        });

        it("should pass empty string when images array is empty", () => {
            const character = createMockCharacter({
                images: [],
            });
            render(<CharacterCard character={character} />);

            const image = screen.getByTestId("character-image");
            expect(image).toHaveAttribute("data-src", "");
        });

        it("should pass empty string when images is undefined", () => {
            const character = createMockCharacter({
                images: undefined,
            });
            render(<CharacterCard character={character} />);

            const image = screen.getByTestId("character-image");
            expect(image).toHaveAttribute("data-src", "");
        });

        it("should pass character name as alt text", () => {
            const character = createMockCharacter({ name: "Test Character" });
            render(<CharacterCard character={character} />);

            const image = screen.getByTestId("character-image");
            expect(image).toHaveAttribute("data-alt", "Test Character");
        });
    });

    describe("styling", () => {
        it("should apply custom className when provided", () => {
            const character = createMockCharacter();
            const { container } = render(
                <CharacterCard character={character} className="custom-class" />
            );

            // The Card component should have the custom class
            const card = container.querySelector("[data-slot='card']");
            expect(card).toHaveClass("custom-class");
        });

        it("should apply custom style when provided", () => {
            const character = createMockCharacter();
            const { container } = render(
                <CharacterCard
                    character={character}
                    style={{ backgroundColor: "red" }}
                />
            );

            const card = container.querySelector("[data-slot='card']");
            expect(card).toHaveAttribute("style", expect.stringContaining("background-color"));
        });
    });

    describe("accessibility", () => {
        it("should have proper link text for screen readers", () => {
            const character = createMockCharacter({ name: "Naruto Uzumaki" });
            render(<CharacterCard character={character} />);

            const link = screen.getByRole("link");
            // The link should contain the character name for context
            expect(link).toHaveTextContent("Naruto Uzumaki");
        });
    });
});

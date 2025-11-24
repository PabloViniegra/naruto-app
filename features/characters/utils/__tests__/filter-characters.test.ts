import { describe, it, expect } from "vitest";
import { filterCharacters } from "../filter-characters";
import type { Characters, Character } from "@/types";

// Helper to create a mock character
function createMockCharacter(overrides: Partial<Character> = {}): Character {
    return {
        id: 1,
        name: "Naruto Uzumaki",
        images: ["https://example.com/naruto.jpg"],
        jutsu: ["Rasengan", "Shadow Clone Jutsu"],
        natureType: ["Wind"],
        personal: {
            clan: "Uzumaki",
            affiliation: ["Konohagakure"],
            team: ["Team 7"],
            occupation: "Hokage",
            classification: "Jinchuriki",
            titles: ["Seventh Hokage"],
            kekkeiGenkai: [],
            sex: "Male",
            birthdate: "October 10",
            bloodType: "B",
            status: "Alive",
            species: "Human",
        },
        tools: ["Kunai", "Shuriken"],
        ...overrides,
    };
}

describe("filterCharacters", () => {
    const mockCharacters: Characters = [
        createMockCharacter({
            id: 1,
            name: "Naruto Uzumaki",
            personal: {
                clan: "Uzumaki",
                affiliation: ["Konohagakure"],
                team: ["Team 7"],
                occupation: "Hokage",
                classification: "Jinchuriki",
                titles: ["Seventh Hokage"],
                kekkeiGenkai: [],
                sex: "Male",
                birthdate: "October 10",
                bloodType: "B",
                status: "Alive",
                species: "Human",
            },
            jutsu: ["Rasengan", "Shadow Clone Jutsu"],
            natureType: ["Wind"],
            tools: ["Kunai"],
        }),
        createMockCharacter({
            id: 2,
            name: "Sasuke Uchiha",
            personal: {
                clan: "Uchiha",
                affiliation: ["Konohagakure", "Akatsuki"],
                team: ["Team 7", "Taka"],
                occupation: "Missing-nin",
                classification: "Missing-nin",
                titles: ["Shadow Hokage"],
                kekkeiGenkai: ["Sharingan", "Rinnegan"],
                sex: "Male",
                birthdate: "July 23",
                bloodType: "AB",
                status: "Alive",
                species: "Human",
            },
            jutsu: ["Chidori", "Amaterasu"],
            natureType: ["Lightning", "Fire"],
            tools: ["Kusanagi"],
        }),
        createMockCharacter({
            id: 3,
            name: "Sakura Haruno",
            personal: {
                clan: "Haruno",
                affiliation: ["Konohagakure"],
                team: ["Team 7"],
                occupation: "Medical-nin",
                classification: "Medical-nin",
                titles: [],
                kekkeiGenkai: [],
                sex: "Female",
                birthdate: "March 28",
                bloodType: "O",
                status: "Alive",
                species: "Human",
            },
            jutsu: ["Cherry Blossom Impact", "Healing Jutsu"],
            natureType: ["Earth"],
            tools: ["Medical Kit"],
        }),
        createMockCharacter({
            id: 4,
            name: "Itachi Uchiha",
            personal: {
                clan: "Uchiha",
                affiliation: ["Konohagakure", "Akatsuki"],
                team: [],
                occupation: "Anbu",
                classification: "Missing-nin",
                titles: ["Clan Killer"],
                kekkeiGenkai: ["Sharingan", "Mangekyo Sharingan"],
                sex: "Male",
                birthdate: "June 9",
                bloodType: "AB",
                status: "Deceased",
                species: "Human",
            },
            jutsu: ["Tsukuyomi", "Amaterasu", "Susanoo"],
            natureType: ["Fire", "Water"],
            tools: [],
        }),
    ];

    describe("search by name", () => {
        it("should filter by exact name match", () => {
            const result = filterCharacters(mockCharacters, "Naruto Uzumaki");
            expect(result).toHaveLength(1);
            expect(result[0]?.name).toBe("Naruto Uzumaki");
        });

        it("should filter by partial name match", () => {
            const result = filterCharacters(mockCharacters, "naruto");
            expect(result).toHaveLength(1);
            expect(result[0]?.name).toBe("Naruto Uzumaki");
        });

        it("should filter by last name", () => {
            const result = filterCharacters(mockCharacters, "uchiha");
            expect(result).toHaveLength(2);
            expect(result.map((c) => c.name)).toContain("Sasuke Uchiha");
            expect(result.map((c) => c.name)).toContain("Itachi Uchiha");
        });

        it("should be case insensitive", () => {
            const result = filterCharacters(mockCharacters, "SAKURA");
            expect(result).toHaveLength(1);
            expect(result[0]?.name).toBe("Sakura Haruno");
        });
    });

    describe("search by clan", () => {
        it("should filter by clan name", () => {
            const result = filterCharacters(mockCharacters, "uzumaki");
            expect(result).toHaveLength(1);
            expect(result[0]?.name).toBe("Naruto Uzumaki");
        });

        it("should find multiple characters from same clan", () => {
            const result = filterCharacters(mockCharacters, "uchiha");
            expect(result).toHaveLength(2);
        });
    });

    describe("search by affiliation", () => {
        it("should filter by village affiliation", () => {
            const result = filterCharacters(mockCharacters, "konohagakure");
            expect(result).toHaveLength(4);
        });

        it("should filter by organization affiliation", () => {
            const result = filterCharacters(mockCharacters, "akatsuki");
            expect(result).toHaveLength(2);
            expect(result.map((c) => c.name)).toContain("Sasuke Uchiha");
            expect(result.map((c) => c.name)).toContain("Itachi Uchiha");
        });
    });

    describe("search by jutsu", () => {
        it("should filter by jutsu name", () => {
            const result = filterCharacters(mockCharacters, "rasengan");
            expect(result).toHaveLength(1);
            expect(result[0]?.name).toBe("Naruto Uzumaki");
        });

        it("should filter by partial jutsu name", () => {
            const result = filterCharacters(mockCharacters, "amaterasu");
            expect(result).toHaveLength(2);
            expect(result.map((c) => c.name)).toContain("Sasuke Uchiha");
            expect(result.map((c) => c.name)).toContain("Itachi Uchiha");
        });

        it("should filter by jutsu containing spaces", () => {
            const result = filterCharacters(mockCharacters, "shadow clone");
            expect(result).toHaveLength(1);
            expect(result[0]?.name).toBe("Naruto Uzumaki");
        });
    });

    describe("search by nature type", () => {
        it("should filter by nature type", () => {
            const result = filterCharacters(mockCharacters, "wind");
            expect(result).toHaveLength(1);
            expect(result[0]?.name).toBe("Naruto Uzumaki");
        });

        it("should filter by fire nature type", () => {
            const result = filterCharacters(mockCharacters, "fire");
            expect(result).toHaveLength(2);
            expect(result.map((c) => c.name)).toContain("Sasuke Uchiha");
            expect(result.map((c) => c.name)).toContain("Itachi Uchiha");
        });
    });

    describe("search by classification", () => {
        it("should filter by classification", () => {
            const result = filterCharacters(mockCharacters, "jinchuriki");
            expect(result).toHaveLength(1);
            expect(result[0]?.name).toBe("Naruto Uzumaki");
        });

        it("should filter by classification array or string", () => {
            const result = filterCharacters(mockCharacters, "missing-nin");
            expect(result).toHaveLength(2);
        });
    });

    describe("search by occupation", () => {
        it("should filter by occupation", () => {
            const result = filterCharacters(mockCharacters, "hokage");
            expect(result).toHaveLength(2); // Naruto (Hokage), Sasuke (Shadow Hokage in titles)
        });

        it("should filter by medical-nin occupation", () => {
            const result = filterCharacters(mockCharacters, "medical");
            expect(result).toHaveLength(1);
            expect(result[0]?.name).toBe("Sakura Haruno");
        });
    });

    describe("search by team", () => {
        it("should filter by team name", () => {
            const result = filterCharacters(mockCharacters, "team 7");
            expect(result).toHaveLength(3);
            expect(result.map((c) => c.name)).toContain("Naruto Uzumaki");
            expect(result.map((c) => c.name)).toContain("Sasuke Uchiha");
            expect(result.map((c) => c.name)).toContain("Sakura Haruno");
        });

        it("should filter by specific team", () => {
            const result = filterCharacters(mockCharacters, "taka");
            expect(result).toHaveLength(1);
            expect(result[0]?.name).toBe("Sasuke Uchiha");
        });
    });

    describe("search by titles", () => {
        it("should filter by title", () => {
            const result = filterCharacters(mockCharacters, "seventh");
            expect(result).toHaveLength(1);
            expect(result[0]?.name).toBe("Naruto Uzumaki");
        });

        it("should filter by clan killer title", () => {
            const result = filterCharacters(mockCharacters, "clan killer");
            expect(result).toHaveLength(1);
            expect(result[0]?.name).toBe("Itachi Uchiha");
        });
    });

    describe("search by tools", () => {
        it("should filter by tool name", () => {
            const result = filterCharacters(mockCharacters, "kunai");
            expect(result).toHaveLength(1);
            expect(result[0]?.name).toBe("Naruto Uzumaki");
        });

        it("should filter by sword name", () => {
            const result = filterCharacters(mockCharacters, "kusanagi");
            expect(result).toHaveLength(1);
            expect(result[0]?.name).toBe("Sasuke Uchiha");
        });
    });

    describe("search by kekkei genkai", () => {
        it("should filter by kekkei genkai", () => {
            const result = filterCharacters(mockCharacters, "sharingan");
            expect(result).toHaveLength(2);
            expect(result.map((c) => c.name)).toContain("Sasuke Uchiha");
            expect(result.map((c) => c.name)).toContain("Itachi Uchiha");
        });

        it("should filter by rinnegan", () => {
            const result = filterCharacters(mockCharacters, "rinnegan");
            expect(result).toHaveLength(1);
            expect(result[0]?.name).toBe("Sasuke Uchiha");
        });
    });

    describe("edge cases", () => {
        it("should return all characters for empty query", () => {
            const result = filterCharacters(mockCharacters, "");
            expect(result).toHaveLength(4);
        });

        it("should return all characters for whitespace query", () => {
            const result = filterCharacters(mockCharacters, "   ");
            expect(result).toHaveLength(4);
        });

        it("should return empty array for non-matching query", () => {
            const result = filterCharacters(mockCharacters, "xyz123");
            expect(result).toHaveLength(0);
        });

        it("should handle empty characters array", () => {
            const result = filterCharacters([], "naruto");
            expect(result).toHaveLength(0);
        });

        it("should handle characters with missing fields", () => {
            const sparseCharacters: Characters = [
                {
                    id: 1,
                    name: "Test Character",
                },
            ];
            const result = filterCharacters(sparseCharacters, "test");
            expect(result).toHaveLength(1);
        });

        it("should handle characters with undefined personal", () => {
            const sparseCharacters: Characters = [
                {
                    id: 1,
                    name: "No Personal Info",
                    personal: undefined,
                },
            ];
            const result = filterCharacters(sparseCharacters, "clan");
            expect(result).toHaveLength(0);
        });

        it("should trim and normalize query", () => {
            const result = filterCharacters(mockCharacters, "  Naruto  ");
            expect(result).toHaveLength(1);
            expect(result[0]?.name).toBe("Naruto Uzumaki");
        });
    });

    describe("multiple field matches", () => {
        it("should return character if query matches any field", () => {
            // "Uchiha" should match both name and clan for Sasuke and Itachi
            const result = filterCharacters(mockCharacters, "uchiha");
            expect(result).toHaveLength(2);
        });

        it("should not duplicate characters when query matches multiple fields", () => {
            // Naruto's name contains Uzumaki, and his clan is also Uzumaki
            const result = filterCharacters(mockCharacters, "uzumaki");
            expect(result).toHaveLength(1);
        });
    });
});

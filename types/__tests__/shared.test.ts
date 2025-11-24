import { describe, it, expect } from "vitest";
import { getEntitySize, extractPaginationMeta } from "../shared";

describe("getEntitySize", () => {
    describe("small size (< 5 members)", () => {
        it("should return 'small' for 0 members", () => {
            expect(getEntitySize(0)).toBe("small");
        });

        it("should return 'small' for 1 member", () => {
            expect(getEntitySize(1)).toBe("small");
        });

        it("should return 'small' for 2 members", () => {
            expect(getEntitySize(2)).toBe("small");
        });

        it("should return 'small' for 3 members", () => {
            expect(getEntitySize(3)).toBe("small");
        });

        it("should return 'small' for 4 members", () => {
            expect(getEntitySize(4)).toBe("small");
        });

        it("should return 'small' for negative member count", () => {
            expect(getEntitySize(-1)).toBe("small");
        });
    });

    describe("medium size (5-9 members)", () => {
        it("should return 'medium' for 5 members (lower boundary)", () => {
            expect(getEntitySize(5)).toBe("medium");
        });

        it("should return 'medium' for 6 members", () => {
            expect(getEntitySize(6)).toBe("medium");
        });

        it("should return 'medium' for 7 members", () => {
            expect(getEntitySize(7)).toBe("medium");
        });

        it("should return 'medium' for 8 members", () => {
            expect(getEntitySize(8)).toBe("medium");
        });

        it("should return 'medium' for 9 members (upper boundary)", () => {
            expect(getEntitySize(9)).toBe("medium");
        });
    });

    describe("large size (>= 10 members)", () => {
        it("should return 'large' for 10 members (lower boundary)", () => {
            expect(getEntitySize(10)).toBe("large");
        });

        it("should return 'large' for 11 members", () => {
            expect(getEntitySize(11)).toBe("large");
        });

        it("should return 'large' for 50 members", () => {
            expect(getEntitySize(50)).toBe("large");
        });

        it("should return 'large' for 100 members", () => {
            expect(getEntitySize(100)).toBe("large");
        });

        it("should return 'large' for 1000 members", () => {
            expect(getEntitySize(1000)).toBe("large");
        });
    });

    describe("edge cases", () => {
        it("should handle decimal numbers (rounds down)", () => {
            // JavaScript treats 4.9 as less than 5
            expect(getEntitySize(4.9)).toBe("small");
            expect(getEntitySize(5.0)).toBe("medium");
            expect(getEntitySize(9.9)).toBe("medium");
            expect(getEntitySize(10.0)).toBe("large");
        });
    });
});

describe("extractPaginationMeta", () => {
    describe("basic functionality", () => {
        it("should extract pagination metadata correctly", () => {
            const response = {
                currentPage: 1,
                pageSize: 20,
                total: 100,
            };

            const result = extractPaginationMeta(response);

            expect(result).toEqual({
                currentPage: 1,
                pageSize: 20,
                total: 100,
                totalPages: 5,
            });
        });

        it("should preserve all original properties", () => {
            const response = {
                currentPage: 3,
                pageSize: 10,
                total: 45,
            };

            const result = extractPaginationMeta(response);

            expect(result.currentPage).toBe(3);
            expect(result.pageSize).toBe(10);
            expect(result.total).toBe(45);
        });
    });

    describe("totalPages calculation", () => {
        it("should calculate totalPages with exact division", () => {
            const response = {
                currentPage: 1,
                pageSize: 10,
                total: 100,
            };

            expect(extractPaginationMeta(response).totalPages).toBe(10);
        });

        it("should round up totalPages for partial pages", () => {
            const response = {
                currentPage: 1,
                pageSize: 10,
                total: 101,
            };

            expect(extractPaginationMeta(response).totalPages).toBe(11);
        });

        it("should return 1 total page for small totals", () => {
            const response = {
                currentPage: 1,
                pageSize: 20,
                total: 5,
            };

            expect(extractPaginationMeta(response).totalPages).toBe(1);
        });

        it("should return 0 total pages for 0 items", () => {
            const response = {
                currentPage: 1,
                pageSize: 20,
                total: 0,
            };

            expect(extractPaginationMeta(response).totalPages).toBe(0);
        });

        it("should handle page size of 1", () => {
            const response = {
                currentPage: 1,
                pageSize: 1,
                total: 100,
            };

            expect(extractPaginationMeta(response).totalPages).toBe(100);
        });

        it("should handle large page sizes", () => {
            const response = {
                currentPage: 1,
                pageSize: 1000,
                total: 50,
            };

            expect(extractPaginationMeta(response).totalPages).toBe(1);
        });

        it("should handle large totals", () => {
            const response = {
                currentPage: 1,
                pageSize: 20,
                total: 10000,
            };

            expect(extractPaginationMeta(response).totalPages).toBe(500);
        });
    });

    describe("edge cases", () => {
        it("should handle total equal to pageSize", () => {
            const response = {
                currentPage: 1,
                pageSize: 20,
                total: 20,
            };

            expect(extractPaginationMeta(response).totalPages).toBe(1);
        });

        it("should handle total just over pageSize", () => {
            const response = {
                currentPage: 1,
                pageSize: 20,
                total: 21,
            };

            expect(extractPaginationMeta(response).totalPages).toBe(2);
        });

        it("should handle total just under pageSize", () => {
            const response = {
                currentPage: 1,
                pageSize: 20,
                total: 19,
            };

            expect(extractPaginationMeta(response).totalPages).toBe(1);
        });

        it("should work with different currentPage values", () => {
            const response = {
                currentPage: 5,
                pageSize: 20,
                total: 100,
            };

            const result = extractPaginationMeta(response);

            expect(result.currentPage).toBe(5);
            expect(result.totalPages).toBe(5);
        });
    });

    describe("real-world scenarios", () => {
        it("should handle characters API response", () => {
            const response = {
                currentPage: 1,
                pageSize: 20,
                total: 1431,
            };

            const result = extractPaginationMeta(response);

            expect(result.totalPages).toBe(72);
        });

        it("should handle clans API response", () => {
            const response = {
                currentPage: 2,
                pageSize: 15,
                total: 52,
            };

            const result = extractPaginationMeta(response);

            expect(result.totalPages).toBe(4);
            expect(result.currentPage).toBe(2);
        });
    });
});

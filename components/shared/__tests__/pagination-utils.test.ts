import { describe, it, expect } from "vitest";
import { getVisiblePages, isEllipsis, type PageItem } from "../pagination-utils";

describe("getVisiblePages", () => {
    describe("single page", () => {
        it("should return [1] for totalPages = 1", () => {
            expect(getVisiblePages(1, 1)).toEqual([1]);
        });

        it("should return [1] for totalPages = 0", () => {
            expect(getVisiblePages(1, 0)).toEqual([1]);
        });

        it("should return [1] for negative totalPages", () => {
            expect(getVisiblePages(1, -1)).toEqual([1]);
        });
    });

    describe("few pages", () => {
        it("should return all pages for 2 pages, current = 1", () => {
            expect(getVisiblePages(1, 2)).toEqual([1, 2]);
        });

        it("should return all pages for 2 pages, current = 2", () => {
            expect(getVisiblePages(2, 2)).toEqual([1, 2]);
        });

        it("should return all pages for 3 pages, current = 1", () => {
            expect(getVisiblePages(1, 3)).toEqual([1, 2, 3]);
        });

        it("should return all pages for 3 pages, current = 2", () => {
            expect(getVisiblePages(2, 3)).toEqual([1, 2, 3]);
        });

        it("should return all pages for 3 pages, current = 3", () => {
            expect(getVisiblePages(3, 3)).toEqual([1, 2, 3]);
        });

        it("should handle 4 pages, current = 1 (shows ellipsis at end)", () => {
            // currentPage (1) is NOT > 3 so no start ellipsis
            // currentPage (1) IS < totalPages - 2 (2) so end ellipsis appears
            const result = getVisiblePages(1, 4);
            expect(result[0]).toBe(1);
            expect(result).toContain(2);
            expect(result).toContain("ellipsis");
            expect(result[result.length - 1]).toBe(4);
        });

        it("should handle 4 pages, current = 2 (no ellipsis)", () => {
            // currentPage (2) is NOT > 3 so no start ellipsis
            // currentPage (2) is NOT < totalPages - 2 (2) so no end ellipsis
            expect(getVisiblePages(2, 4)).toEqual([1, 2, 3, 4]);
        });

        it("should handle 4 pages, current = 3 (no ellipsis)", () => {
            expect(getVisiblePages(3, 4)).toEqual([1, 2, 3, 4]);
        });

        it("should handle 4 pages, current = 4 (shows ellipsis at start)", () => {
            // currentPage (4) IS > 3 so start ellipsis appears
            // currentPage (4) is NOT < totalPages - 2 (2) so no end ellipsis
            const result = getVisiblePages(4, 4);
            expect(result[0]).toBe(1);
            expect(result).toContain("ellipsis");
            expect(result).toContain(3);
            expect(result[result.length - 1]).toBe(4);
        });
    });

    describe("many pages with ellipsis at end", () => {
        it("should show ellipsis at end when on page 1 of 10", () => {
            const result = getVisiblePages(1, 10);
            expect(result[0]).toBe(1);
            expect(result[1]).toBe(2);
            expect(result).toContain("ellipsis");
            expect(result[result.length - 1]).toBe(10);
        });

        it("should show ellipsis at end when on page 2 of 10", () => {
            const result = getVisiblePages(2, 10);
            expect(result[0]).toBe(1);
            expect(result).toContain(2);
            expect(result).toContain(3);
            expect(result).toContain("ellipsis");
            expect(result[result.length - 1]).toBe(10);
        });

        it("should show ellipsis at end when on page 3 of 10", () => {
            const result = getVisiblePages(3, 10);
            expect(result[0]).toBe(1);
            expect(result).toContain(2);
            expect(result).toContain(3);
            expect(result).toContain(4);
            expect(result).toContain("ellipsis");
            expect(result[result.length - 1]).toBe(10);
        });
    });

    describe("many pages with ellipsis at start", () => {
        it("should show ellipsis at start when on last page of 10", () => {
            const result = getVisiblePages(10, 10);
            expect(result[0]).toBe(1);
            expect(result).toContain("ellipsis");
            expect(result).toContain(9);
            expect(result[result.length - 1]).toBe(10);
        });

        it("should show ellipsis at start when on page 9 of 10", () => {
            const result = getVisiblePages(9, 10);
            expect(result[0]).toBe(1);
            expect(result).toContain("ellipsis");
            expect(result).toContain(8);
            expect(result).toContain(9);
            expect(result[result.length - 1]).toBe(10);
        });

        it("should show ellipsis at start when on page 8 of 10", () => {
            const result = getVisiblePages(8, 10);
            expect(result[0]).toBe(1);
            expect(result).toContain("ellipsis");
            expect(result).toContain(7);
            expect(result).toContain(8);
            expect(result).toContain(9);
            expect(result[result.length - 1]).toBe(10);
        });
    });

    describe("many pages with ellipsis at both ends", () => {
        it("should show ellipsis at both ends when in middle of 10 pages", () => {
            const result = getVisiblePages(5, 10);
            expect(result[0]).toBe(1);
            expect(result[1]).toBe("ellipsis");
            expect(result).toContain(4);
            expect(result).toContain(5);
            expect(result).toContain(6);
            expect(result[result.length - 2]).toBe("ellipsis");
            expect(result[result.length - 1]).toBe(10);
        });

        it("should show ellipsis at both ends when on page 6 of 10", () => {
            const result = getVisiblePages(6, 10);
            expect(result[0]).toBe(1);
            expect(result).toContain("ellipsis");
            expect(result).toContain(5);
            expect(result).toContain(6);
            expect(result).toContain(7);
            expect(result[result.length - 1]).toBe(10);
        });
    });

    describe("edge cases", () => {
        it("should handle page 4 of 10 (boundary for start ellipsis)", () => {
            const result = getVisiblePages(4, 10);
            expect(result[0]).toBe(1);
            // Page 4 is > 3, so ellipsis should appear
            expect(result).toContain("ellipsis");
            expect(result).toContain(3);
            expect(result).toContain(4);
            expect(result).toContain(5);
            expect(result[result.length - 1]).toBe(10);
        });

        it("should handle page 7 of 10 (boundary for end ellipsis)", () => {
            const result = getVisiblePages(7, 10);
            expect(result[0]).toBe(1);
            expect(result).toContain("ellipsis");
            expect(result).toContain(6);
            expect(result).toContain(7);
            expect(result).toContain(8);
            // Page 7 < 10 - 2, so end ellipsis should appear
            expect(result[result.length - 1]).toBe(10);
        });

        it("should handle very large page numbers", () => {
            const result = getVisiblePages(500, 1000);
            expect(result[0]).toBe(1);
            expect(result[1]).toBe("ellipsis");
            expect(result).toContain(499);
            expect(result).toContain(500);
            expect(result).toContain(501);
            expect(result[result.length - 2]).toBe("ellipsis");
            expect(result[result.length - 1]).toBe(1000);
        });

        it("should always include first and last page", () => {
            for (let current = 1; current <= 20; current++) {
                const result = getVisiblePages(current, 20);
                expect(result[0]).toBe(1);
                expect(result[result.length - 1]).toBe(20);
            }
        });
    });

    describe("5 pages total", () => {
        it("should handle page 1 of 5", () => {
            const result = getVisiblePages(1, 5);
            expect(result).toEqual([1, 2, "ellipsis", 5]);
        });

        it("should handle page 3 of 5 (middle)", () => {
            const result = getVisiblePages(3, 5);
            expect(result).toEqual([1, 2, 3, 4, 5]);
        });

        it("should handle page 5 of 5", () => {
            const result = getVisiblePages(5, 5);
            expect(result).toEqual([1, "ellipsis", 4, 5]);
        });
    });
});

describe("isEllipsis", () => {
    it("should return true for 'ellipsis' string", () => {
        expect(isEllipsis("ellipsis")).toBe(true);
    });

    it("should return false for number 1", () => {
        expect(isEllipsis(1)).toBe(false);
    });

    it("should return false for number 10", () => {
        expect(isEllipsis(10)).toBe(false);
    });

    it("should return false for number 0", () => {
        expect(isEllipsis(0)).toBe(false);
    });

    it("should return false for negative numbers", () => {
        expect(isEllipsis(-1)).toBe(false);
    });

    it("should work correctly with array filter", () => {
        const pages: PageItem[] = [1, "ellipsis", 5, 6, 7, "ellipsis", 10];
        const ellipsisCount = pages.filter(isEllipsis).length;
        const numberCount = pages.filter((item) => !isEllipsis(item)).length;

        expect(ellipsisCount).toBe(2);
        expect(numberCount).toBe(5);
    });

    it("should be usable as type guard", () => {
        const item: PageItem = "ellipsis";
        if (isEllipsis(item)) {
            // TypeScript should narrow type to "ellipsis"
            expect(item).toBe("ellipsis");
        }
    });
});

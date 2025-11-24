import { describe, it, expect } from "vitest";
import { cn, toArray } from "../utils";

describe("cn", () => {
    it("should merge simple class names", () => {
        expect(cn("foo", "bar")).toBe("foo bar");
    });

    it("should handle conditional classes", () => {
        const isActive = true;
        const isDisabled = false;
        expect(cn("base", isActive && "active", isDisabled && "disabled")).toBe(
            "base active"
        );
    });

    it("should handle object syntax", () => {
        expect(cn({ foo: true, bar: false, baz: true })).toBe("foo baz");
    });

    it("should handle array syntax", () => {
        expect(cn(["foo", "bar"])).toBe("foo bar");
    });

    it("should handle mixed inputs", () => {
        expect(
            cn("base", ["array-class"], { "object-class": true }, "final")
        ).toBe("base array-class object-class final");
    });

    it("should merge Tailwind classes correctly", () => {
        expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
    });

    it("should handle conflicting Tailwind classes", () => {
        expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
    });

    it("should handle background color conflicts", () => {
        expect(cn("bg-red-500", "bg-blue-500")).toBe("bg-blue-500");
    });

    it("should handle margin conflicts", () => {
        expect(cn("mt-2", "mt-4")).toBe("mt-4");
    });

    it("should handle padding conflicts", () => {
        expect(cn("p-2", "p-4")).toBe("p-4");
    });

    it("should handle undefined and null values", () => {
        expect(cn("foo", undefined, null, "bar")).toBe("foo bar");
    });

    it("should handle empty string", () => {
        expect(cn("foo", "", "bar")).toBe("foo bar");
    });

    it("should return empty string for no inputs", () => {
        expect(cn()).toBe("");
    });

    it("should handle complex Tailwind merging", () => {
        expect(
            cn(
                "flex items-center justify-center",
                "flex-col justify-start",
                "items-end"
            )
        ).toBe("flex flex-col justify-start items-end");
    });

    it("should preserve non-conflicting classes", () => {
        expect(cn("rounded-lg shadow-md", "hover:shadow-lg")).toBe(
            "rounded-lg shadow-md hover:shadow-lg"
        );
    });

    it("should handle responsive prefixes correctly", () => {
        expect(cn("md:text-lg", "md:text-xl")).toBe("md:text-xl");
    });

    it("should handle state variants correctly", () => {
        expect(cn("hover:bg-red-500", "hover:bg-blue-500")).toBe(
            "hover:bg-blue-500"
        );
    });
});

describe("toArray", () => {
    describe("null and undefined handling", () => {
        it("should return empty array for null", () => {
            expect(toArray(null)).toEqual([]);
        });

        it("should return empty array for undefined", () => {
            expect(toArray(undefined)).toEqual([]);
        });
    });

    describe("single value handling", () => {
        it("should wrap a single string in an array", () => {
            expect(toArray("hello")).toEqual(["hello"]);
        });

        it("should wrap a single number in an array", () => {
            expect(toArray(42)).toEqual([42]);
        });

        it("should wrap a single object in an array", () => {
            const obj = { id: 1, name: "test" };
            expect(toArray(obj)).toEqual([obj]);
        });

        it("should wrap a single boolean in an array", () => {
            expect(toArray(true)).toEqual([true]);
            expect(toArray(false)).toEqual([false]);
        });

        it("should wrap zero in an array", () => {
            expect(toArray(0)).toEqual([0]);
        });

        it("should wrap empty string in an array", () => {
            expect(toArray("")).toEqual([""]);
        });
    });

    describe("array handling", () => {
        it("should return the same array for an array input", () => {
            const arr = [1, 2, 3];
            expect(toArray(arr)).toBe(arr);
        });

        it("should return empty array as-is", () => {
            const arr: number[] = [];
            expect(toArray(arr)).toBe(arr);
        });

        it("should return array of strings as-is", () => {
            const arr = ["a", "b", "c"];
            expect(toArray(arr)).toBe(arr);
        });

        it("should return array of objects as-is", () => {
            const arr = [{ id: 1 }, { id: 2 }];
            expect(toArray(arr)).toBe(arr);
        });
    });

    describe("type inference", () => {
        it("should maintain type for string input", () => {
            const result = toArray<string>("test");
            expect(result).toEqual(["test"]);
        });

        it("should maintain type for number array input", () => {
            const result = toArray<number>([1, 2, 3]);
            expect(result).toEqual([1, 2, 3]);
        });
    });
});

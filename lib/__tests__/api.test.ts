import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { ZodError, z } from "zod";
import { ApiError, ValidationError, fetchData } from "../api";

// Mock the config module
vi.mock("@/config", () => ({
    API_BASE_URL: "https://api.example.com",
}));

describe("ApiError", () => {
    describe("constructor", () => {
        it("should create an ApiError with correct properties", () => {
            const error = new ApiError("Not found", 404, "Not Found");

            expect(error).toBeInstanceOf(Error);
            expect(error).toBeInstanceOf(ApiError);
            expect(error.message).toBe("Not found");
            expect(error.status).toBe(404);
            expect(error.statusText).toBe("Not Found");
            expect(error.name).toBe("ApiError");
        });

        it("should create an ApiError for server errors", () => {
            const error = new ApiError(
                "Internal server error",
                500,
                "Internal Server Error"
            );

            expect(error.status).toBe(500);
            expect(error.statusText).toBe("Internal Server Error");
        });
    });

    describe("isApiError", () => {
        it("should return true for ApiError instances", () => {
            const error = new ApiError("Test error", 400, "Bad Request");
            expect(ApiError.isApiError(error)).toBe(true);
        });

        it("should return false for regular Error instances", () => {
            const error = new Error("Test error");
            expect(ApiError.isApiError(error)).toBe(false);
        });

        it("should return false for non-error values", () => {
            expect(ApiError.isApiError(null)).toBe(false);
            expect(ApiError.isApiError(undefined)).toBe(false);
            expect(ApiError.isApiError("error")).toBe(false);
            expect(ApiError.isApiError({ message: "error" })).toBe(false);
        });
    });

    describe("is404", () => {
        it("should return true for 404 ApiError", () => {
            const error = new ApiError("Not found", 404, "Not Found");
            expect(ApiError.is404(error)).toBe(true);
        });

        it("should return false for non-404 ApiError", () => {
            const error = new ApiError("Bad request", 400, "Bad Request");
            expect(ApiError.is404(error)).toBe(false);
        });

        it("should return false for non-ApiError", () => {
            const error = new Error("Not found");
            expect(ApiError.is404(error)).toBe(false);
        });
    });

    describe("isServerError", () => {
        it("should return true for 500 status", () => {
            const error = new ApiError(
                "Internal Server Error",
                500,
                "Internal Server Error"
            );
            expect(ApiError.isServerError(error)).toBe(true);
        });

        it("should return true for 502 status", () => {
            const error = new ApiError("Bad Gateway", 502, "Bad Gateway");
            expect(ApiError.isServerError(error)).toBe(true);
        });

        it("should return true for 503 status", () => {
            const error = new ApiError(
                "Service Unavailable",
                503,
                "Service Unavailable"
            );
            expect(ApiError.isServerError(error)).toBe(true);
        });

        it("should return false for 4xx status", () => {
            const error = new ApiError("Not found", 404, "Not Found");
            expect(ApiError.isServerError(error)).toBe(false);
        });

        it("should return false for non-ApiError", () => {
            expect(ApiError.isServerError(new Error("Server error"))).toBe(
                false
            );
        });
    });

    describe("isClientError", () => {
        it("should return true for 400 status", () => {
            const error = new ApiError("Bad Request", 400, "Bad Request");
            expect(ApiError.isClientError(error)).toBe(true);
        });

        it("should return true for 401 status", () => {
            const error = new ApiError("Unauthorized", 401, "Unauthorized");
            expect(ApiError.isClientError(error)).toBe(true);
        });

        it("should return true for 403 status", () => {
            const error = new ApiError("Forbidden", 403, "Forbidden");
            expect(ApiError.isClientError(error)).toBe(true);
        });

        it("should return true for 404 status", () => {
            const error = new ApiError("Not Found", 404, "Not Found");
            expect(ApiError.isClientError(error)).toBe(true);
        });

        it("should return true for 499 status", () => {
            const error = new ApiError("Client error", 499, "Client Error");
            expect(ApiError.isClientError(error)).toBe(true);
        });

        it("should return false for 500 status", () => {
            const error = new ApiError(
                "Internal Server Error",
                500,
                "Internal Server Error"
            );
            expect(ApiError.isClientError(error)).toBe(false);
        });

        it("should return false for 3xx status", () => {
            const error = new ApiError("Redirect", 301, "Moved Permanently");
            expect(ApiError.isClientError(error)).toBe(false);
        });

        it("should return false for non-ApiError", () => {
            expect(ApiError.isClientError(new Error("Client error"))).toBe(
                false
            );
        });
    });
});

describe("ValidationError", () => {
    describe("constructor", () => {
        it("should create a ValidationError with correct properties", () => {
            const zodError = new ZodError([
                {
                    code: "invalid_type",
                    expected: "string",
                    received: "number",
                    path: ["name"],
                    message: "Expected string, received number",
                },
            ]);
            const error = new ValidationError("Validation failed", zodError);

            expect(error).toBeInstanceOf(Error);
            expect(error).toBeInstanceOf(ValidationError);
            expect(error.message).toBe("Validation failed");
            expect(error.zodError).toBe(zodError);
            expect(error.name).toBe("ValidationError");
        });
    });

    describe("isValidationError", () => {
        it("should return true for ValidationError instances", () => {
            const zodError = new ZodError([]);
            const error = new ValidationError("Validation failed", zodError);
            expect(ValidationError.isValidationError(error)).toBe(true);
        });

        it("should return false for regular Error instances", () => {
            const error = new Error("Validation failed");
            expect(ValidationError.isValidationError(error)).toBe(false);
        });

        it("should return false for ApiError instances", () => {
            const error = new ApiError("Error", 400, "Bad Request");
            expect(ValidationError.isValidationError(error)).toBe(false);
        });

        it("should return false for non-error values", () => {
            expect(ValidationError.isValidationError(null)).toBe(false);
            expect(ValidationError.isValidationError(undefined)).toBe(false);
            expect(ValidationError.isValidationError("error")).toBe(false);
        });
    });
});

describe("fetchData", () => {
    const originalFetch = global.fetch;

    beforeEach(() => {
        vi.resetAllMocks();
    });

    afterEach(() => {
        global.fetch = originalFetch;
    });

    it("should fetch data successfully", async () => {
        const mockData = { id: 1, name: "Naruto" };
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockData),
        });

        const result = await fetchData<typeof mockData>("/characters/1");

        expect(result).toEqual(mockData);
        expect(global.fetch).toHaveBeenCalledWith(
            "https://api.example.com/characters/1",
            expect.objectContaining({
                next: {
                    revalidate: 60,
                    tags: undefined,
                },
            })
        );
    });

    it("should handle URL without leading slash", async () => {
        const mockData = { id: 1 };
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockData),
        });

        await fetchData("characters/1");

        expect(global.fetch).toHaveBeenCalledWith(
            "https://api.example.com/characters/1",
            expect.any(Object)
        );
    });

    it("should use custom revalidate option", async () => {
        const mockData = { id: 1 };
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockData),
        });

        await fetchData("/characters", { revalidate: 120 });

        expect(global.fetch).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({
                next: {
                    revalidate: 120,
                    tags: undefined,
                },
            })
        );
    });

    it("should use tags option", async () => {
        const mockData = { id: 1 };
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockData),
        });

        await fetchData("/characters", { tags: ["characters", "list"] });

        expect(global.fetch).toHaveBeenCalledWith(
            expect.any(String),
            expect.objectContaining({
                next: {
                    revalidate: 60,
                    tags: ["characters", "list"],
                },
            })
        );
    });

    it("should throw ApiError on non-ok response", async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: false,
            status: 404,
            statusText: "Not Found",
        });

        await expect(fetchData("/characters/999")).rejects.toThrow(ApiError);
        await expect(fetchData("/characters/999")).rejects.toMatchObject({
            status: 404,
            statusText: "Not Found",
        });
    });

    it("should throw ApiError on server error", async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: false,
            status: 500,
            statusText: "Internal Server Error",
        });

        await expect(fetchData("/characters")).rejects.toThrow(ApiError);
    });

    it("should validate data with Zod schema when provided", async () => {
        const schema = z.object({
            id: z.number(),
            name: z.string(),
        });
        const mockData = { id: 1, name: "Naruto" };
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockData),
        });

        const result = await fetchData("/characters/1", { schema });

        expect(result).toEqual(mockData);
    });

    it("should throw ValidationError when schema validation fails", async () => {
        const schema = z.object({
            id: z.number(),
            name: z.string(),
        });
        const mockData = { id: "invalid", name: 123 }; // Wrong types
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockData),
        });

        await expect(fetchData("/characters/1", { schema })).rejects.toThrow(
            ValidationError
        );
    });

    it("should include endpoint in ValidationError message", async () => {
        const schema = z.object({
            id: z.number(),
        });
        const mockData = { id: "invalid" };
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockData),
        });

        try {
            await fetchData("/characters/1", { schema });
            expect.fail("Should have thrown ValidationError");
        } catch (error) {
            expect(ValidationError.isValidationError(error)).toBe(true);
            if (ValidationError.isValidationError(error)) {
                expect(error.message).toContain("/characters/1");
            }
        }
    });

    it("should return typed data without schema", async () => {
        interface Character {
            id: number;
            name: string;
        }
        const mockData: Character = { id: 1, name: "Naruto" };
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockData),
        });

        const result = await fetchData<Character>("/characters/1");

        expect(result.id).toBe(1);
        expect(result.name).toBe("Naruto");
    });
});

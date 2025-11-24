import React from "react";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

// Cleanup after each test case
afterEach(() => {
    cleanup();
});

// Mock Next.js router
vi.mock("next/navigation", () => ({
    useRouter: () => ({
        push: vi.fn(),
        replace: vi.fn(),
        prefetch: vi.fn(),
        back: vi.fn(),
        forward: vi.fn(),
    }),
    usePathname: () => "/",
    useSearchParams: () => new URLSearchParams(),
}));

// Mock next/link - NOT async to avoid "async Client Component" error
vi.mock("next/link", () => ({
    default: function Link({
        children,
        href,
        ...props
    }: {
        children: React.ReactNode;
        href: string;
        [key: string]: unknown;
    }) {
        return React.createElement("a", { href, ...props }, children);
    },
}));

// Mock next/image
vi.mock("next/image", () => ({
    default: function Image({
        src,
        alt,
        fill,
        sizes,
        className,
        onError,
        ...props
    }: {
        src: string;
        alt: string;
        fill?: boolean;
        sizes?: string;
        className?: string;
        onError?: () => void;
        [key: string]: unknown;
    }) {
        return React.createElement("img", {
            src,
            alt,
            className,
            "data-fill": fill ? "true" : undefined,
            "data-sizes": sizes,
            onError,
            ...props,
        });
    },
}));

// Mock environment variables
vi.stubEnv("NEXT_API_URL", "https://api.example.com");

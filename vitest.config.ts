import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    plugins: [react(), tsconfigPaths()],
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: ["./test/setup.ts"],
        include: ["**/__tests__/**/*.{test,spec}.{ts,tsx}"],
        exclude: ["node_modules", ".next", "dist"],
        coverage: {
            provider: "v8",
            reporter: ["text", "json", "html"],
            include: [
                "lib/api.ts",
                "lib/utils.ts",
                "components/shared/pagination-utils.ts",
                "types/shared.ts",
                "features/characters/utils/filter-characters.ts",
                "features/characters/components/character-card.tsx",
            ],
            exclude: [
                "node_modules",
                ".next",
                "**/__tests__/**",
                "**/*.d.ts",
                "**/index.ts",
            ],
            thresholds: {
                lines: 80,
                functions: 80,
                branches: 80,
                statements: 80,
            },
        },
    },
});

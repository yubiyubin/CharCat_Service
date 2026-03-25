import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    exclude: ["node_modules", "e2e/**", "**/*.spec.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json-summary", "html"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/app/layout.tsx",
        "src/app/robots.ts",
        "src/app/sitemap.ts",
        "src/app/**/layout.tsx",
        "src/data/**",
        "src/components/ui/**",
        "src/components/theme-provider.tsx",
        "src/components/JsonLdLayout.tsx",
        "src/locales/**",
        "src/styles.ts",
        "src/**/*.d.ts",
        "src/globals.css",
        "src/app/emoji/**",
      ],
      thresholds: {
        lines: 90,
        functions: 85,
        branches: 85,
        statements: 90,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});

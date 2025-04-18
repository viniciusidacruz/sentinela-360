import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setup.ts",
    coverage: {
      provider: "v8",
    },
    exclude: [
      "node_modules",
      "dist",
      "build",
      "public",
      "**/interfaces/**",
      "**/constants/**",
      "./src/shared/interfaces/**",
      "./src/shared/constants/**",
    ],
  },
});

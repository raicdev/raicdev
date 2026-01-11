import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ["dist/**", "dist-ssr/**", ".tanstack/**", ".nitro/**", "node_modules/**"],
  },
]);

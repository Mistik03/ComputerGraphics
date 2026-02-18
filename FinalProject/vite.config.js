import { defineConfig } from "vite";

export default defineConfig({
  base: "./", // Ensures correct relative paths
  build: {
    outDir: "dist", // Output directory for production build
  },
});

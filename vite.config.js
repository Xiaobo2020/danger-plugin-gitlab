import { glob } from "glob";
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    minify: true,
    outDir: "dist",
    emptyOutDir: false,
    lib: {
      formats: ["es", "cjs"],
      entry: glob
        .sync("src/libs/**/*.ts")
        .map((file) => resolve(__dirname, file)),
    },
    rollupOptions: {
      output: {
        preserveModules: true,
      },
    },
  },
  test: {
    exclude: ["src/tests/*", "node_modules"],
  },
});

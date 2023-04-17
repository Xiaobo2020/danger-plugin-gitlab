import { glob } from "glob";
import { resolve } from "path";
import { defineConfig } from "vite";

const isTestFile = (filename) =>
  [".test.ts", ".spec.ts"].some(
    (suffix) => (filename || "").indexOf(suffix) !== -1
  );

export default defineConfig({
  build: {
    minify: true,
    outDir: "dist",
    emptyOutDir: false,
    lib: {
      formats: ["es", "cjs"],
      entry: [
        ...glob
          .sync("src/libs/**/*.ts")
          .filter((file) => !isTestFile(file))
          .map((file) => resolve(__dirname, file)),
        ...glob
          .sync("src/utils/**/*.ts")
          .filter((file) => !isTestFile(file))
          .map((file) => resolve(__dirname, file)),
      ],
    },
    rollupOptions: {
      external: ["node:fs"],
      output: {
        preserveModules: true,
      },
    },
  },
  test: {
    exclude: ["src/tests/*", "node_modules"],
  },
});

import { resolve } from "path";
import { build, defineConfig } from "vite";

// const libraries = [
//   {
//     entry: resolve(__dirname, "./src/libs/changelog.ts"),
//     filename: "[filename]",
//   },
// ];

// libraries.forEach(async (lib) => {
//   await build({
//     build: {
//       outDir: "dist",
//       emptyOutDir: false,
//       lib: {
//         ...lib,
//         formats: ["es", "cjs"],
//       },
//     },
//   });
// });

export default defineConfig({
  build: {
    outDir: "dist",
    emptyOutDir: false,
    lib: {
      formats: ["es", "cjs"],
      entry: {
        "libs/changelog": resolve(__dirname, "./libs/changelog.ts"),
      },
    },
  },
});

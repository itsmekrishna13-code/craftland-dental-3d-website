import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteSingleFile({
      // Keep JS chunks external: the Three.js chunk imports from the entry
      // chunk, so inlining/deleting the entry would break the lazy import.
      inlinePattern: ["*.css"],
      overrideConfig: {
        build: {
          assetsInlineLimit: () => true,
          chunkSizeWarningLimit: 100000000,
          cssCodeSplit: false,
          assetsDir: "",
          rollupOptions: { output: { inlineDynamicImports: false } },
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});

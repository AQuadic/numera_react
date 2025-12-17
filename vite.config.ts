import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://numra.motofy.io",
        changeOrigin: true,
        secure: true,
        rewrite: (p) => p.replace(/^\/api/, "/api"),
      },
      // Proxy for fetching plate images during download (bypasses CORS)
      "/plate-generate": {
        target: "https://numra.motofy.io",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});

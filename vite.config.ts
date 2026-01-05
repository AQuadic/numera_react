import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://numra.motofy.io",
        changeOrigin: true,
        secure: true,
        rewrite: (p) => p.replace(/^\/api/, "/api"),
        bypass: (req) => {
          if (req.url && req.url.startsWith("/api/image-proxy")) {
            return req.url;
          }
        },
      },
    },
  },
  plugins: [
    react(),
    {
      name: "configure-server",
      configureServer(server) {
        server.middlewares.use("/api/image-proxy", async (req, res) => {
          try {
            const url = new URL(req.url || "", `http://${req.headers.host}`);
            const pathParam = url.searchParams.get("path");

            if (!pathParam) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: "Path is required" }));
              return;
            }

            const cleanPath = pathParam.startsWith("/")
              ? pathParam
              : `/${pathParam}`;
            const targetUrl = `https://numra.motofy.io${cleanPath}`;

            const response = await fetch(targetUrl);

            if (!response.ok) {
              throw new Error(
                `Failed to fetch: ${response.status} ${response.statusText}`
              );
            }

            const arrayBuffer = await response.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            res.setHeader(
              "Content-Type",
              response.headers.get("content-type") || "image/png"
            );
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.end(buffer);
          } catch (error) {
            console.error("Proxy error:", error);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: "Failed to fetch image" }));
          }
        });
      },
    },
  ],
});

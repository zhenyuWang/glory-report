import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { join } from "path/posix";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  server: {
    open: true,
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "http://127.0.0.1:7001",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: "@/",
        replacement: join(__dirname, "./src/"),
      },
    ],
  },
});

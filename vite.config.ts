import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { join } from "path/posix";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: "@/",
        replacement: join(__dirname, "src/"),
      },
    ],
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/test-task_todos/",
  resolve: {
    alias: {
      src: path.resolve(__dirname, "src"),
    },
  },
});

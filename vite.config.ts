import react from "@vitejs/plugin-react";
import { vite } from "million/compiler";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vite({ auto: true }), react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
});

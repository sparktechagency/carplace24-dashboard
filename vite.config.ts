import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  envPrefix: ["VITE_", "GOOGLE_"],
  server: {
    // host: "192.168.10.20",
    // port: 3003,
  },
});

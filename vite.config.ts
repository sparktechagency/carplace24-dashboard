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
    host: "83.228.197.97",
    port: 5001,
    // host: "10.10.7.47",
    // port: 3003,
  },
});

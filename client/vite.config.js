import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "./src"),
      "@public": path.resolve(__dirname, "./public"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@http": path.resolve(__dirname, "./src/http"),
      "@incrum": path.resolve(__dirname, "./src/incrum"),
      "@managers": path.resolve(__dirname, "./src/managers"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@stores": path.resolve(__dirname, "./src/stores"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@ui": path.resolve(__dirname, "./src/components/ui"),
      "@modals": path.resolve(__dirname, "./src/components/modals"),
      "@layout": path.resolve(__dirname, "./src/components/layout"),
    },
  },
});

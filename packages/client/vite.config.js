import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    testMatch: ["**/__tests__/**/*.test.[jt]s?(x)"],
    coverage: {
      provider: "istanbul", // or 'v8',
      reporter: ["text", "json", "html"],
    },
  },
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.join(__dirname, "src/components"),
      "@constants": path.join(__dirname, "src/constants"),
      "@context": path.join(__dirname, "src/context"),
      "@graphql": path.join(__dirname, "src/graphql"),
      "@layouts": path.join(__dirname, "src/layouts"),
      "@modules": path.join(__dirname, "src/modules"),
      "@pages": path.join(__dirname, "src/pages"),
      "@styles": path.join(__dirname, "src/styles"),
      "@theme": path.join(__dirname, "src/theme"),
      "@guards": path.join(__dirname, "src/guards"),
    },
  },
  base: "/",
});

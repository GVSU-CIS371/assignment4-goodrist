import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/assignment5-goodrist/",   
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler", 
      },
    },
  },
});

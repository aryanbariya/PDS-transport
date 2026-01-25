import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      onwarn(warning, defaultHandler) {
        if (warning.code === "EVAL") return;
        defaultHandler(warning);
      },
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("@mui") || id.includes("@emotion")) {
              return "vendor_mui";
            }
            if (id.includes("@material-tailwind") || id.includes("@heroicons")) {
              return "vendor_mt";
            }
            if (id.includes("datatables.net") || id.includes("jquery")) {
              return "vendor_datatables";
            }
            if (id.includes("jspdf")) {
              return "vendor_jspdf";
            }
            if (id.includes("html2canvas")) {
              return "vendor_html2canvas";
            }
            if (id.includes("apexcharts") || id.includes("react-apexcharts")) {
              return "vendor_charts";
            }
            if (id.includes("lottie") || id.includes("lottie-react")) {
              return "vendor_lottie";
            }
            if (id.includes("react-icons")) {
              return "vendor_icons";
            }
            if (id.includes("react") || id.includes("react-dom") || id.includes("react-router")) {
              return "vendor_react_core";
            }
            if (id.includes("axios") || id.includes("sweetalert2")) {
              return "vendor_utils";
            }
            return "vendor_others";
          }
        },
      },
    },
  },
});

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  build: {
    rollupOptions: {
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
            if (id.includes("jspdf") || id.includes("html2canvas")) {
              return "vendor_pdf";
            }
            if (id.includes("apexcharts") || id.includes("react-apexcharts")) {
              return "vendor_charts";
            }
            return "vendor";
          }
        },
      },
    },
  },
});

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef3ff",
          100: "#dbe7ff",
          500: "#4f7cff",
          600: "#3d68e8"
        },
        kosovo: {
          sky: "#5fb5f5",
          deep: "#1c86d1",
          gold: "#f4cd46",
          pale: "#e9f6ff"
        }
      }
    }
  },
  plugins: []
};

export default config;

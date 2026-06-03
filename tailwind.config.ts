import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#f0faf9",
          100: "#ccefec",
          200: "#99dfd9",
          300: "#5ec9c0",
          400: "#2fb5aa",
          500: "#2a9d8f",
          600: "#238277",
          700: "#1c685f",
          800: "#154e48",
          900: "#0d3430",
        },
        gold: {
          400: "#f0c93a",
          500: "#e9b949",
          600: "#d4a438",
        },
        navy: {
          700: "#1a2d42",
          800: "#0f1f30",
          900: "#0d1b2a",
        },
      },
    },
  },
  plugins: [],
};
export default config;

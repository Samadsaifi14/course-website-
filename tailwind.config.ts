import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          50: "#edf4f0",
          100: "#dbe9e2",
          200: "#bad4c8",
          300: "#8fb9a6",
          400: "#649985",
          500: "#397662",
          600: "#1f5e4b",
          700: "#173f34",
          800: "#17352d",
          900: "#122b25",
          950: "#091713",
        },
      },
    },
  },
  plugins: [],
};
export default config;

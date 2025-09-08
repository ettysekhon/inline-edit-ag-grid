import type { Config } from "tailwindcss";

export default {
  content: ["index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  plugins: [],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0ea5e9",
          dark: "#0284c7",
        },
      },
      fontFamily: {
        sans: ["var(--font-primary)"],
      },
    },
  },
} satisfies Config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Kinetic Dark — deep black + electric lime
        ink: {
          DEFAULT: "#0A0A0B", // page background
          50: "#1A1A1C",
          100: "#161618",
          200: "#121214",
          300: "#0E0E10",
          400: "#0A0A0B",
        },
        lime: {
          DEFAULT: "#C6F432", // electric lime — single accent
          50: "#F0FBD0",
          100: "#E0F7A0",
          200: "#D0F370",
          300: "#C6F432",
          400: "#A8D420",
          500: "#8AB014",
        },
        mist: {
          DEFAULT: "#8A8A8E", // muted text on dark
          light: "#A8A8AC",
          dark: "#5C5C60",
        },
        chalk: {
          DEFAULT: "#F5F5F4", // off-white text
          dim: "#D4D4D2",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "10xl": ["10rem", { lineHeight: "0.9" }],
        "11xl": ["13rem", { lineHeight: "0.85" }],
      },
      letterSpacing: {
        ultra: "-0.04em",
        wide2: "0.15em",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "snap": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      animation: {
        "scroll-hint": "scroll-hint 2s ease-in-out infinite",
        "marquee-x": "marquee-x 40s linear infinite",
      },
      keyframes: {
        "scroll-hint": {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.4" },
          "50%": { transform: "translateY(8px)", opacity: "1" },
        },
        "marquee-x": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

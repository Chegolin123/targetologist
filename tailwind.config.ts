import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        card: "0 1px 3px rgba(26, 27, 30, 0.04), 0 1px 2px rgba(26, 27, 30, 0.03)",
        "card-hover": "0 4px 16px rgba(26, 27, 30, 0.06)",
        button: "0 2px 8px rgba(200, 120, 44, 0.22)",
        "button-hover": "0 4px 16px rgba(200, 120, 44, 0.30)",
      },
      colors: {
        // Premium Agency "Amber & Charcoal" palette
        amber: {
          DEFAULT: "#C8782C",
          50: "#FDF6ED",
          100: "#F9E8D0",
          200: "#F3D19E",
          300: "#EBB66B",
          400: "#E09C3E",
          500: "#C8782C", // Primary accent
          600: "#A56122",
          700: "#824B1B",
          800: "#5F3616",
          900: "#3D2110",
        },
        charcoal: {
          DEFAULT: "#1A1B1E",
          50: "#F6F6F6",
          100: "#E7E7E8",
          200: "#CECFD0",
          300: "#A8AAAD",
          400: "#7B7E82",
          500: "#5C5A55",
          600: "#454440",
          700: "#32322F",
          800: "#1E1F22",
          900: "#1A1B1E",
        },
        sage: {
          DEFAULT: "#2D5A4B",
          light: "#3D7A64",
          dark: "#1F3D33",
        },
        surface: {
          DEFAULT: "#FCFAF7", // Warm paper white — page background
          card: "#FFFFFF", // Card surfaces
          muted: "#F5F2ED", // Slightly darker surface
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.25rem",
        "4xl": "1.75rem",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        "aurora-drift": "aurora-drift 20s ease-in-out infinite alternate",
        "grain": "grain 8s steps(10) infinite",
        "scroll-hint": "scroll-hint 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "aurora-drift": {
          "0%": { transform: "translate(0%, 0%) scale(1)" },
          "50%": { transform: "translate(2%, 1%) scale(1.05)" },
          "100%": { transform: "translate(-1%, -1%) scale(0.95)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "20%": { transform: "translate(-15%, 5%)" },
          "30%": { transform: "translate(7%, -25%)" },
          "40%": { transform: "translate(-5%, 25%)" },
          "50%": { transform: "translate(-15%, 10%)" },
          "60%": { transform: "translate(15%, 0%)" },
          "70%": { transform: "translate(0%, 15%)" },
          "80%": { transform: "translate(3%, 35%)" },
          "90%": { transform: "translate(-10%, 10%)" },
        },
        "scroll-hint": {
          "0%, 100%": { transform: "translateY(0)", opacity: "0.6" },
          "50%": { transform: "translateY(6px)", opacity: "1" },
        },
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.22, 1, 0.36, 1)",
        "in-out-expo": "cubic-bezier(0.65, 0, 0.35, 1)",
        "drawer": "cubic-bezier(0.32, 0.72, 0, 1)",
        "emphasized": "cubic-bezier(0.3, 0, 0, 1)",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
      },
    },
  },
  plugins: [],
};

export default config;

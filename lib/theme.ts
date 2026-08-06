/**
 * Design tokens for the Premium Agency "Amber & Charcoal" theme.
 * Mirror of tailwind.config.ts — used for JS/3D contexts where Tailwind classes don't reach.
 */

export const palette = {
  amber: {
    DEFAULT: "#C8782C",
    50: "#FDF6ED",
    100: "#F9E8D0",
    200: "#F3D19E",
    300: "#EBB66B",
    400: "#E09C3E",
    500: "#C8782C",
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
    DEFAULT: "#FCFAF7",
    card: "#FFFFFF",
    muted: "#F5F2ED",
  },
  border: {
    DEFAULT: "#E8E4DC",
    strong: "#D4CFC5",
  },
} as const;

// Hex constants for Three.js and JS
export const AMBER_HEX = palette.amber[500];
export const AMBER_DARK_HEX = palette.amber[600];
export const CHARCOAL_HEX = palette.charcoal[900];
export const CHARCOAL_DARK_HEX = palette.charcoal[800];
export const SAGE_HEX = palette.sage.DEFAULT;
export const SURFACE_HEX = palette.surface.DEFAULT;
export const BORDER_HEX = palette.border.DEFAULT;

/** Unified easing curve — use everywhere */
export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;
export const EASE_IN_OUT_EXPO = [0.65, 0, 0.35, 1] as const;
export const EASE_EMPHASIZED = [0.3, 0, 0, 1] as const;

/** Design tokens for Kinetic Dark theme. */

export const palette = {
  ink: "#0A0A0B",
  ink50: "#1A1A1C",
  ink100: "#161618",
  lime: "#C6F432",
  lime400: "#A8D420",
  mist: "#8A8A8E",
  chalk: "#F5F5F4",
} as const;

export const INK_HEX = palette.ink;
export const INK_50_HEX = palette.ink50;
export const LIME_HEX = palette.lime;
export const LIME_400_HEX = palette.lime400;
export const MIST_HEX = palette.mist;
export const CHALK_HEX = palette.chalk;

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_SNAP = [0.22, 1, 0.36, 1] as const;

"use client";

import { useEffect } from "react";

/**
 * Soft large radial spotlight following cursor, amber-tinted.
 * Sets CSS variables --mx, --my on documentElement.
 * Only on desktop with fine pointer.
 */
export function CursorSpotlight() {
  useEffect(() => {
    const isMobile =
      typeof window !== "undefined" &&
      (window.matchMedia("(max-width: 768px)").matches ||
        window.matchMedia("(pointer: coarse)").matches);

    if (isMobile) return;

    let raf = 0;
    let mx = -500;
    let my = -500;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const tick = () => {
      document.documentElement.style.setProperty("--mx", `${mx}px`);
      document.documentElement.style.setProperty("--my", `${my}px`);
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.documentElement.style.removeProperty("--mx");
      document.documentElement.style.removeProperty("--my");
    };
  }, []);

  return null;
}

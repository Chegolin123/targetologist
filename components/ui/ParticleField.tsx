"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Particle flow field — "traffic/data stream" background.
 * Pure Canvas2D (no Three.js overhead). Scroll-driven vertical drift.
 * Respects reduced-motion (renders static faint dots).
 */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let scrollY = 0;

    const PARTICLE_COUNT = 80;
    const particles: { x: number; y: number; vx: number; vy: number; len: number; alpha: number }[] = [];

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = w + "px";
      canvas!.style.height = h + "px";
      ctx!.scale(dpr, dpr);
    }

    function init() {
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: Math.random() * 0.5 + 0.15,
          len: Math.random() * 40 + 20,
          alpha: Math.random() * 0.3 + 0.05,
        });
      }
    }

    function onScroll() {
      scrollY = window.scrollY;
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h);

      const offset = scrollY * 0.1;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // wrap
        if (p.y > h + p.len) {
          p.y = -p.len;
          p.x = Math.random() * w;
        }
        if (p.x < -p.len) p.x = w + p.len;
        if (p.x > w + p.len) p.x = -p.len;

        const drawY = ((p.y + offset) % (h + p.len * 2)) - p.len;

        // Draw streak
        const gradient = ctx!.createLinearGradient(p.x, drawY - p.len, p.x, drawY);
        gradient.addColorStop(0, "rgba(198, 244, 50, 0)");
        gradient.addColorStop(1, `rgba(198, 244, 50, ${p.alpha})`);

        ctx!.strokeStyle = gradient;
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        ctx!.moveTo(p.x, drawY - p.len);
        ctx!.lineTo(p.x, drawY);
        ctx!.stroke();

        // Bright head dot
        ctx!.fillStyle = `rgba(198, 244, 50, ${p.alpha * 1.5})`;
        ctx!.beginPath();
        ctx!.arc(p.x, drawY, 1.2, 0, Math.PI * 2);
        ctx!.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    resize();
    init();
    window.addEventListener("resize", () => { resize(); init(); });
    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ opacity: reducedMotion ? 0.15 : 1 }}
    />
  );
}

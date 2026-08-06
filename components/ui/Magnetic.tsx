"use client";

import { type ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";

export function Magnetic({ children, strength = 0.3, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 200, damping: 20 });
  const sy = useSpring(my, { stiffness: 200, damping: 20 });
  const x = useTransform(sx, [-0.5, 0.5], [-strength * 40, strength * 40]);
  const y = useTransform(sy, [-0.5, 0.5], [-strength * 40, strength * 40]);

  if (reducedMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        mx.set((e.clientX - (r.left + r.width / 2)) / (r.width / 2));
        my.set((e.clientY - (r.top + r.height / 2)) / (r.height / 2));
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

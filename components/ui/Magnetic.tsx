"use client";

import { type ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";

interface MagneticProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export function Magnetic({ children, strength = 0.35, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 250, damping: 22, mass: 0.6 });
  const springY = useSpring(my, { stiffness: 250, damping: 22, mass: 0.6 });
  const x = useTransform(springX, [-0.5, 0.5], [-strength * 50, strength * 50]);
  const y = useTransform(springY, [-0.5, 0.5], [-strength * 50, strength * 50]);

  if (reducedMotion) return <div className={className}>{children}</div>;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mx.set((e.clientX - cx) / (rect.width / 2));
    my.set((e.clientY - cy) / (rect.height / 2));
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

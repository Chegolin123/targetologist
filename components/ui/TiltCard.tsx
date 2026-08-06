"use client";

import { type ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
}

export function TiltCard({ children, className, maxTilt = 8, scale = 1.02 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [maxTilt, -maxTilt]), {
    stiffness: 250, damping: 22, mass: 0.6,
  });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-maxTilt, maxTilt]), {
    stiffness: 250, damping: 22, mass: 0.6,
  });
  const s = useSpring(1, { stiffness: 250, damping: 22, mass: 0.6 });

  if (reducedMotion) return <div className={className}>{children}</div>;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => s.set(scale)}
      onMouseLeave={() => { mouseX.set(0.5); mouseY.set(0.5); s.set(1); }}
      style={{ rotateX, rotateY, scale: s, transformPerspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

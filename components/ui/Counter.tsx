"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useReducedMotion } from "motion/react";

interface Props {
  to: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export function Counter({ to, duration = 1.8, className, prefix = "", suffix = "", decimals = 0 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!ref.current || started) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setStarted(true); obs.disconnect(); }
    }, { threshold: 0.4 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    if (reducedMotion) { if (ref.current) ref.current.textContent = fmt(to); return; }
    const ctrl = animate(0, to, {
      duration, ease: [0.16, 1, 0.3, 1],
      onUpdate(v) { if (ref.current) ref.current.textContent = fmt(v); },
    });
    return () => ctrl.stop();
  }, [started, to, duration, decimals, reducedMotion]);

  function fmt(v: number) {
    const r = decimals > 0 ? v.toFixed(decimals) : Math.round(v).toString();
    return `${prefix}${Number(r).toLocaleString("ru-RU", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`;
  }

  return <span ref={ref} className={className}>{fmt(to)}</span>;
}

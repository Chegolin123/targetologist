"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useReducedMotion } from "motion/react";

interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  className,
  prefix = "",
  suffix = "",
  decimals = 0,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!ref.current || started) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;

    if (reducedMotion) {
      if (ref.current) {
        ref.current.textContent = formatValue(to, decimals, prefix, suffix);
      }
      return;
    }

    const controls = animate(from, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(value) {
        if (ref.current) {
          ref.current.textContent = formatValue(value, decimals, prefix, suffix);
        }
      },
    });

    return () => controls.stop();
  }, [started, from, to, duration, decimals, prefix, suffix, reducedMotion]);

  if (reducedMotion) {
    return (
      <span ref={ref} className={className}>
        {formatValue(to, decimals, prefix, suffix)}
      </span>
    );
  }

  return <span ref={ref} className={className} />;
}

function formatValue(value: number, decimals: number, prefix: string, suffix: string): string {
  const rounded = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();
  const withSeparators = Number(rounded).toLocaleString("ru-RU", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${prefix}${withSeparators}${suffix}`;
}

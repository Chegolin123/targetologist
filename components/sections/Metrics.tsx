"use client";

import { Reveal } from "@/components/ui/Reveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { metrics } from "@/lib/content";

export function MetricsSection() {
  return (
    <section className="relative py-24 sm:py-32 bg-charcoal-800 overflow-hidden">
      {/* Subtle radial accent behind */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(200, 120, 44, 0.08) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      <div className="container-px relative z-10">
        <Reveal>
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-amber/70 mb-3 block">
            В цифрах
          </span>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mt-8">
          {metrics.map((m, i) => (
            <Reveal key={i} delay={0.1 * i}>
              <div className="text-center sm:text-left">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white">
                  <AnimatedCounter
                    to={m.value}
                    suffix={m.suffix}
                    decimals={m.decimals}
                    duration={2}
                  />
                </div>
                <p className="text-sm text-charcoal-300 mt-2 max-w-[14ch] mx-auto sm:mx-0">
                  {m.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

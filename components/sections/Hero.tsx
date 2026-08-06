"use client";

import { motion, useReducedMotion } from "motion/react";
import { Magnetic } from "@/components/ui/Magnetic";
import { hero, profile } from "@/lib/content";

export function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <section id="top" className="relative min-h-dvh flex flex-col justify-center overflow-hidden pt-28 pb-16">
      <div className="container-px relative z-10">
        {/* Status badge */}
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 mb-8"
        >
          <span className="relative flex w-2 h-2">
            <span className="absolute inline-flex w-full h-full rounded-full bg-lime opacity-60 animate-ping" />
            <span className="relative inline-flex w-2 h-2 rounded-full bg-lime" />
          </span>
          <span className="font-mono text-xs tracking-wide2 uppercase text-mist-light">
            {hero.status} · {profile.platforms}
          </span>
        </motion.div>

        {/* Massive kinetic title */}
        <h1 className="font-display font-bold tracking-ultr">
          {hero.titleLines.map((line, i) => (
            <motion.span
              key={i}
              initial={reducedMotion ? {} : { opacity: 0, y: 40, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="block leading-[0.9]"
              style={{ fontSize: "clamp(3rem, 12vw, 9rem)" }}
            >
              {line}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={reducedMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 max-w-xl text-lg sm:text-xl text-mist-light leading-relaxed"
        >
          {hero.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col sm:flex-row gap-3"
        >
          <Magnetic>
            <a href="#contact" className="btn-lime group">
              {hero.cta}
              <svg className="group-hover:translate-x-1 transition-transform" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </Magnetic>
          <Magnetic>
            <a href={`https://t.me/${profile.telegram.replace("@", "")}`} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              {hero.ctaTg}
            </a>
          </Magnetic>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={reducedMotion ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 flex flex-wrap gap-x-12 gap-y-4"
        >
          {hero.stats.map((s, i) => (
            <div key={i} className="flex items-baseline gap-2">
              <span className="font-mono text-2xl sm:text-3xl font-medium text-lime">{s.value}</span>
              <span className="font-mono text-xs uppercase tracking-wide2 text-mist">{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      {!reducedMotion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] tracking-wide2 uppercase text-mist">Скролл</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-px h-8 bg-gradient-to-b from-lime to-transparent"
          />
        </motion.div>
      )}

      {/* Bottom marquee */}
      <div className="absolute bottom-0 inset-x-0 overflow-hidden border-t border-white/[0.04] py-3">
        <div className="flex animate-marquee-x whitespace-nowrap">
          {[...Array(2)].map((_, dup) => (
            <div key={dup} className="flex items-center">
              {hero.stats.map((s, i) => (
                <span key={i} className="font-mono text-xs text-mist mx-6">
                  {s.value} {s.label}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

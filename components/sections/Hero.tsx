"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { Magnetic } from "@/components/ui/Magnetic";
import { hero, profile } from "@/lib/content";

// Lazy-load 3D scene — never blocks LCP
const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((m) => ({ default: m.HeroScene })),
  { ssr: false }
);

export function Hero() {
  const reducedMotion = useReducedMotion();

  return (
    <section className="relative min-h-dvh flex items-center overflow-hidden pt-24 sm:pt-28 lg:pt-0">
      {/* 3D background — behind content */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      <div className="container-px relative z-10 w-full pb-16 sm:pb-0">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[calc(100dvh-7rem)]">
          {/* Text column */}
          <div className="flex flex-col justify-center pt-16 lg:pt-0">
            <Reveal blur={true} duration={0.8}>
              <p className="font-mono text-xs sm:text-sm tracking-[0.2em] uppercase text-amber mb-4">
                {hero.greeting}
              </p>
            </Reveal>

            <Reveal blur={true} duration={0.8} delay={0.1}>
              <h1
                className="font-display font-bold tracking-tight text-charcoal leading-[1.05]"
                style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
              >
                {hero.title}
              </h1>
            </Reveal>

            <Reveal blur={true} duration={0.8} delay={0.2}>
              <p className="mt-3 text-lg sm:text-xl text-amber font-display font-medium">
                {hero.subtitle}
              </p>
            </Reveal>

            <Reveal blur={true} duration={0.8} delay={0.3}>
              <p className="mt-6 text-lg text-charcoal-500 max-w-md text-pretty">
                {profile.headline}
              </p>
            </Reveal>

            {/* CTAs */}
            <Reveal blur={true} duration={0.8} delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <Magnetic>
                  <a
                    href="#contact"
                    className="btn-primary text-base px-8 py-4 group"
                  >
                    {hero.ctaPrimary}
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/20 group-hover:translate-x-0.5 group-hover:-translate-y-px transition-transform duration-300">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </a>
                </Magnetic>
                <Magnetic>
                  <a
                    href={`https://t.me/${profile.telegram.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost text-base px-8 py-4"
                  >
                    {hero.ctaSecondary}
                  </a>
                </Magnetic>
              </div>
            </Reveal>
          </div>

          {/* Photo column */}
          <div className="flex justify-center lg:justify-end items-center pt-8 lg:pt-0">
            <TiltCard maxTilt={6} scale={1.03}>
              {/* Double bezel frame for photo */}
              <div className="double-bezel w-[260px] sm:w-[320px] lg:w-[380px] aspect-[3/4]">
                <div className="double-bezel-inner overflow-hidden p-0">
                  <Image
                    src="/photos/photo2-jacket.png"
                    alt={hero.photoAlt}
                    width={380}
                    height={507}
                    className="w-full h-full object-cover"
                    priority
                    sizes="(max-width: 640px) 260px, (max-width: 1024px) 320px, 380px"
                  />
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      {!reducedMotion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <span className="text-xs font-mono tracking-widest uppercase text-charcoal-400">
            Скролл
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border-2 border-charcoal-300 flex items-start justify-center p-1"
          >
            <motion.div className="w-1.5 h-1.5 rounded-full bg-amber" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

"use client";

import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { caseStudy } from "@/lib/content";

export function CaseStudySection() {
  return (
    <section id="case" className="section relative">
      <div className="container-px">
        <Reveal>
          <span className="eyebrow">{caseStudy.label}</span>
        </Reveal>

        {/* Oversized title */}
        <Reveal delay={0.1}>
          <h2
            className="display mt-4 max-w-4xl"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)", lineHeight: 0.95 }}
          >
            {caseStudy.title}
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-4 font-mono text-sm text-mist uppercase tracking-wide2">
            {caseStudy.context}
          </p>
        </Reveal>

        {/* Metrics grid — oversized */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px mt-16 bg-white/[0.06]">
          {caseStudy.metrics.map((m, i) => (
            <Reveal key={i} delay={0.1 + i * 0.1}>
              <div className="bg-ink p-6 sm:p-8 lg:p-10">
                <div
                  className="font-display font-bold text-lime glow-lime"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1 }}
                >
                  <Counter to={m.value} suffix={m.suffix} decimals={"decimals" in m ? m.decimals : 0} />
                </div>
                <p className="mt-3 font-mono text-xs uppercase tracking-wide2 text-mist">
                  {m.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Description + UTP */}
        <div className="grid lg:grid-cols-2 gap-10 mt-16">
          <Reveal>
            <p className="text-lg text-mist-light leading-relaxed max-w-prose">
              {caseStudy.desc}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <blockquote className="border-l-2 border-lime pl-6">
              <p className="font-display text-xl sm:text-2xl text-chalk leading-snug">
                {caseStudy.utp}
              </p>
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

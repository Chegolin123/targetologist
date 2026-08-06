"use client";

import { Reveal } from "@/components/ui/Reveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { caseStudy } from "@/lib/content";

export function CaseStudySection() {
  return (
    <section id="case" className="section bg-surface-muted">
      <div className="container-px">
        <Reveal>
          <span className="section-eyebrow">{caseStudy.eyebrow}</span>
          <h2 className="section-title mt-2">{caseStudy.title}</h2>
        </Reveal>

        {/* Editorial Split */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 mt-12">
          {/* Left: story */}
          <div className="space-y-6">
            <Reveal delay={0.1}>
              <p className="text-sm font-mono text-charcoal-400 uppercase tracking-wider">
                {caseStudy.platform}
              </p>
              <p className="text-lg text-charcoal-500 mt-2">{caseStudy.client}</p>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="text-charcoal text-pretty leading-relaxed">
                {caseStudy.description}
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <ul className="space-y-3">
                {caseStudy.approach.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-charcoal-500">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber/10 text-amber flex items-center justify-center text-xs font-mono font-bold mt-0.5">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.25}>
              <blockquote className="border-l-2 border-amber pl-4 italic text-charcoal-500 text-sm">
                {caseStudy.utp}
              </blockquote>
              <p className="text-xs text-charcoal-400 mt-2">{caseStudy.rating}</p>
            </Reveal>
          </div>

          {/* Right: metrics card */}
          <Reveal delay={0.3} direction="left">
            <div className="double-bezel h-fit lg:sticky lg:top-24">
              <div className="double-bezel-inner">
                <h3 className="text-sm font-mono text-charcoal-400 uppercase tracking-wider mb-6">
                  Результаты
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  {caseStudy.metrics.map((m, i) => (
                    <div key={i}>
                      <div className="text-3xl sm:text-4xl font-display font-bold text-charcoal">
                        <AnimatedCounter
                          to={m.value}
                          suffix={m.suffix}
                          decimals={"decimals" in m ? m.decimals : 0}
                          duration={1.5}
                        />
                      </div>
                      <p className="text-sm text-charcoal-500 mt-1">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

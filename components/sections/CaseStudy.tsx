"use client";

import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { caseStudies } from "@/lib/content";

export function CaseStudySection() {
  return (
    <section id="case" className="section">
      <div className="container-px">
        <Reveal>
          <span className="eyebrow">Кейсы</span>
          <h2 className="display mt-3" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
            Результаты
          </h2>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-px bg-white/[0.06] md:grid-cols-2">
          {caseStudies.map((cs) => (
            <RevealItem key={cs.id}>
              <CaseCard cs={cs} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function CaseCard({ cs }: { cs: typeof caseStudies[number] }) {
  return (
    <div className="bg-ink p-6 sm:p-8 lg:p-10 h-full flex flex-col group hover:bg-ink-50 transition-colors duration-300">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-lime/70">
          {cs.label}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-mist">
          {cs.context}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-display text-2xl sm:text-3xl font-semibold text-chalk group-hover:text-lime transition-colors duration-300">
        {cs.title}
      </h3>

      {/* Description */}
      <p className="mt-4 text-sm sm:text-base text-mist-light leading-relaxed">
        {cs.desc}
      </p>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-5 mt-8">
        {cs.metrics.map((m, i) => (
          <div key={i}>
            <div
              className="font-display font-bold text-lime"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", lineHeight: 1 }}
            >
              <Counter
                to={m.value}
                suffix={m.suffix}
                decimals={"decimals" in m ? m.decimals : 0}
                duration={1.5}
              />
            </div>
            <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-mist">
              {m.label}
            </p>
          </div>
        ))}
      </div>

      {/* UTP quote */}
      <blockquote className="mt-8 pt-5 border-t border-white/[0.06]">
        <p className="text-sm text-chalk/90 italic leading-relaxed">{cs.utp}</p>
      </blockquote>
    </div>
  );
}

"use client";

import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { processSteps } from "@/lib/content";

export function ProcessSection() {
  return (
    <section id="process" className="section">
      <div className="container-px">
        <Reveal>
          <span className="eyebrow">Процесс</span>
          <h2 className="display mt-3" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
            Как я работаю
          </h2>
        </Reveal>

        <RevealGroup className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06]">
          {processSteps.map((step) => (
            <RevealItem key={step.num}>
              <div className="bg-ink p-6 sm:p-8 h-full flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-3xl font-bold text-lime/30">{step.num}</span>
                  <span className="font-mono text-[10px] uppercase tracking-wide2 text-mist border border-white/10 rounded-full px-2 py-1">
                    {step.duration}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold text-chalk mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-mist-light leading-relaxed flex-1">
                  {step.desc}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

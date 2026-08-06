"use client";

import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { processSteps } from "@/lib/content";

export function ProcessSection() {
  return (
    <section id="process" className="section bg-surface-muted">
      <div className="container-px">
        <Reveal>
          <span className="section-eyebrow">Как мы работаем</span>
          <h2 className="section-title mt-2">Процесс</h2>
          <p className="section-subtitle">
            Прозрачно, по этапам. Вы всегда знаете, что происходит и зачем.
          </p>
        </Reveal>

        <RevealGroup staggerDelay={0.1}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            {processSteps.map((step, i) => (
              <RevealItem key={step.id}>
                <div className="relative h-full">
                  {/* Connector line (desktop only, not on last) */}
                  {i < processSteps.length - 1 && (
                    <div
                      className="hidden lg:block absolute top-7 left-full w-full h-px"
                      style={{
                        background:
                          "linear-gradient(to right, rgba(200,120,44,0.2), transparent)",
                      }}
                      aria-hidden="true"
                    />
                  )}

                  {/* Step number */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex-shrink-0 w-9 h-9 rounded-full bg-amber text-white flex items-center justify-center font-mono font-bold text-sm">
                      {i + 1}
                    </span>
                    <span className="text-xs font-mono text-charcoal-400 uppercase tracking-wider">
                      {step.duration}
                    </span>
                  </div>

                  <h3 className="text-lg font-display font-semibold text-charcoal mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-charcoal-500 leading-relaxed text-pretty">
                    {step.description}
                  </p>
                </div>
              </RevealItem>
            ))}
          </div>
        </RevealGroup>
      </div>
    </section>
  );
}

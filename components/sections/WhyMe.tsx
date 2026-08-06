"use client";

import { cn } from "@/lib/utils";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { principles } from "@/lib/content";

// Custom SVG icons — NOT emoji, NOT AI-drawn people
const principleIcons: Record<string, React.ReactNode> = {
  ai: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v1a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M8 12a4 4 0 0 1 8 0" />
      <path d="M4 22h16c0-4.4-3.6-8-8-8s-8 3.6-8 8Z" />
      <circle cx="17" cy="7" r="1.5" />
      <circle cx="7" cy="7" r="1.5" />
      <path d="M12 9v1M10 11l1-1M14 11l-1-1" />
    </svg>
  ),
  data: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" />
      <path d="M7 16l4-6 4 3 4-7" />
    </svg>
  ),
  budget: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  experience: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z" />
      <path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.11" />
    </svg>
  ),
};

export function WhyMeSection() {
  return (
    <section id="why-me" className="section">
      <div className="container-px">
        <Reveal>
          <span className="section-eyebrow">Подход</span>
          <h2 className="section-title mt-2">Почему я</h2>
          <p className="section-subtitle">
            Четыре принципа, которые отличают мою работу от «просто настройки рекламы».
          </p>
        </Reveal>

        <RevealGroup staggerDelay={0.08}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mt-12">
            {principles.map((p) => (
              <RevealItem key={p.id}>
                <PrincipleCard principle={p} />
              </RevealItem>
            ))}
          </div>
        </RevealGroup>
      </div>
    </section>
  );
}

function PrincipleCard({ principle }: { principle: typeof principles[number] }) {
  const icon = principleIcons[principle.id];

  return (
    <div className="card card-hover p-6 sm:p-8 group">
      <div className="w-10 h-10 rounded-xl bg-amber/10 text-amber flex items-center justify-center mb-4 group-hover:bg-amber group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-lg font-display font-semibold text-charcoal mb-2">
        {principle.title}
      </h3>
      <p className="text-charcoal-500 text-sm leading-relaxed text-pretty">
        {principle.description}
      </p>
    </div>
  );
}

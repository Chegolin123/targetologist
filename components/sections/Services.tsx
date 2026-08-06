"use client";

import { cn } from "@/lib/utils";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { services, platforms, type Service } from "@/lib/content";

export function ServicesSection() {
  return (
    <section id="services" className="section">
      <div className="container-px">
        {/* Section header */}
        <Reveal>
          <span className="section-eyebrow">Что я делаю</span>
          <h2 className="section-title mt-2">Услуги</h2>
          <p className="section-subtitle">
            Полный цикл: от аудита до масштабирования. Работаю с двумя платформами.
          </p>
        </Reveal>

        {/* Platform badges */}
        <Reveal delay={0.1}>
          <div className="flex flex-wrap gap-3 mt-8 mb-14">
            {platforms.items.map((p) => (
              <span
                key={p.name}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/5 bg-white text-sm font-medium text-charcoal-500"
              >
                <span className="w-2 h-2 rounded-full bg-amber" />
                {p.name}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Asymmetrical Bento Grid */}
        <RevealGroup staggerDelay={0.08}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {services.map((service) => (
              <RevealItem key={service.id}>
                <ServiceCard service={service} />
              </RevealItem>
            ))}
          </div>
        </RevealGroup>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const isLarge = service.size === "large";
  const accentClass = service.accent === "amber" ? "text-amber" : "text-sage";
  const accentBgClass = service.accent === "amber" ? "bg-amber/5" : "bg-sage/5";
  const accentDotClass = service.accent === "amber" ? "bg-amber" : "bg-sage";

  return (
    <div
      className={cn(
        "double-bezel group h-full",
        isLarge && "lg:col-span-2"
      )}
    >
      <div className="double-bezel-inner flex flex-col">
        {/* Accent line */}
        <div className={cn("w-8 h-0.5 rounded-full mb-4", accentDotClass)} />

        <h3 className="text-xl sm:text-2xl font-display font-semibold text-charcoal mb-3">
          {service.title}
        </h3>

        <p className="text-charcoal-500 mb-5 text-pretty">{service.description}</p>

        {/* Feature list */}
        <ul className="space-y-2 mt-auto">
          {service.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-charcoal-500">
              <span className={cn("mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0", accentDotClass)} />
              {f}
            </li>
          ))}
        </ul>

        {/* Subtle hover glow */}
        <div
          className={cn(
            "absolute inset-0 rounded-[1.75rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
            accentBgClass
          )}
        />
      </div>
    </div>
  );
}

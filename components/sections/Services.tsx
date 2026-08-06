"use client";

import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { services } from "@/lib/content";

export function ServicesSection() {
  return (
    <section id="services" className="section">
      <div className="container-px">
        <Reveal>
          <span className="eyebrow">Услуги</span>
          <h2 className="display mt-3" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
            Что я делаю
          </h2>
        </Reveal>

        <RevealGroup className="mt-16 space-y-px">
          {services.map((s) => (
            <RevealItem key={s.id}>
              <ServiceRow service={s} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function ServiceRow({ service }: { service: typeof services[number] }) {
  return (
    <div className="group grid grid-cols-12 gap-4 sm:gap-6 py-8 sm:py-10 border-t border-white/[0.06] transition-colors duration-300 hover:bg-white/[0.015]">
      {/* Number */}
      <div className="col-span-2 sm:col-span-1">
        <span className="font-mono text-sm text-mist group-hover:text-lime transition-colors">
          {service.num}
        </span>
      </div>

      {/* Title */}
      <div className="col-span-10 sm:col-span-4">
        <h3 className="font-display text-xl sm:text-2xl font-semibold text-chalk group-hover:text-lime transition-colors duration-300">
          {service.title}
        </h3>
      </div>

      {/* Description */}
      <div className="col-span-12 sm:col-span-4">
        <p className="text-mist-light text-sm sm:text-base leading-relaxed">{service.desc}</p>
      </div>

      {/* Points */}
      <div className="col-span-12 sm:col-span-3">
        <ul className="space-y-1">
          {service.points.map((p, i) => (
            <li key={i} className="flex items-center gap-2 font-mono text-xs text-mist">
              <span className="w-1 h-1 rounded-full bg-lime/50" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

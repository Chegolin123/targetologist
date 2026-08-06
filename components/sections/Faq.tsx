"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { faq } from "@/lib/content";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section">
      <div className="container-px">
        <Reveal>
          <span className="eyebrow">FAQ</span>
          <h2 className="display mt-3" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>
            Частые вопросы
          </h2>
        </Reveal>

        <RevealGroup className="mt-14 max-w-3xl">
          {faq.map((item, i) => (
            <RevealItem key={i}>
              <div className="border-t border-white/[0.06] last:border-b">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 py-6 text-left group"
                  aria-expanded={open === i}
                >
                  <span className="font-display text-lg sm:text-xl text-chalk group-hover:text-lime transition-colors">
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: open === i ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="flex-shrink-0 text-lime"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M10 4v12M4 10h12" strokeLinecap="round" />
                    </svg>
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-mist-light leading-relaxed max-w-prose">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

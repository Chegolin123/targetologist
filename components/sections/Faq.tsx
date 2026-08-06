"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { faq } from "@/lib/content";

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(faq[0]?.id ?? null);

  return (
    <section id="faq" className="section">
      <div className="container-px">
        <Reveal>
          <span className="section-eyebrow">Частые вопросы</span>
          <h2 className="section-title mt-2">FAQ</h2>
          <p className="section-subtitle">
            Отвечаю честно, без маркетингового тумана.
          </p>
        </Reveal>

        <RevealGroup staggerDelay={0.06}>
          <div className="max-w-3xl mt-12 space-y-3">
            {faq.map((item) => {
              const isOpen = openId === item.id;
              return (
                <RevealItem key={item.id}>
                  <FaqItem
                    item={item}
                    isOpen={isOpen}
                    onToggle={() => setOpenId(isOpen ? null : item.id)}
                  />
                </RevealItem>
              );
            })}
          </div>
        </RevealGroup>
      </div>
    </section>
  );
}

function FaqItem({
  item,
  isOpen,
  onToggle,
}: {
  item: typeof faq[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border transition-colors duration-300",
        isOpen
          ? "border-amber/30 bg-white shadow-card"
          : "border-black/5 bg-white hover:border-amber/20"
      )}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-charcoal text-pretty">
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-amber"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M8 3v10M3 8h10" />
          </svg>
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-charcoal-500 text-pretty leading-relaxed">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { nav, profile } from "@/lib/content";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-out-expo",
        scrolled ? "py-3" : "py-5"
      )}>
        <div className="container-px">
          <nav className={cn(
            "flex items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 ease-out-expo",
            scrolled ? "bg-ink-50/80 backdrop-blur-xl border border-white/[0.06]" : "bg-transparent border border-transparent"
          )}>
            {/* Logo */}
            <a href="#top" className="font-display font-bold text-chalk tracking-tight">
              ЧЕГОЛИН<span className="text-lime">.</span>
            </a>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-sm font-body text-mist-light hover:text-chalk transition-colors duration-200"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* CTA */}
            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-body font-semibold bg-lime text-ink rounded-full transition-all duration-300 active:scale-95 hover:shadow-[0_0_24px_rgba(198,244,50,0.35)]"
            >
              Связаться
            </a>

            {/* Mobile burger */}
            <button
              className="md:hidden relative w-9 h-9 flex flex-col items-center justify-center gap-1.5"
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Меню"
              aria-expanded={mobileOpen}
            >
              <span className={cn("block w-5 h-px bg-chalk transition-all duration-300", mobileOpen && "rotate-45 translate-y-[3.5px]")} />
              <span className={cn("block w-5 h-px bg-chalk transition-all duration-300", mobileOpen && "-rotate-45 -translate-y-[3.5px]")} />
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-ink/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center gap-8"
          >
            {nav.map((item, i) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.05 * i, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl font-display font-semibold text-chalk hover:text-lime transition-colors"
              >
                {item.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.05 * nav.length, duration: 0.4 }}
              className="mt-4 px-8 py-3 bg-lime text-ink font-semibold rounded-full"
            >
              {profile.telegram}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

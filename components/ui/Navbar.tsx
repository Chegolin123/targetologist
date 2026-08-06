"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { nav } from "@/lib/content";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section for desktop dot indicator
  useEffect(() => {
    const sections = nav.map((item) => item.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      {/* Fluid island pill */}
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 flex justify-center transition-all duration-400 ease-out-expo",
          scrolled ? "pt-4" : "pt-6"
        )}
      >
        <nav
          className={cn(
            "flex items-center gap-1 px-3 py-2 rounded-full transition-all duration-400 ease-out-expo",
            scrolled
              ? "nav-glass"
              : "bg-transparent"
          )}
          aria-label="Основная навигация"
        >
          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {nav.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-full transition-colors duration-200",
                    isActive
                      ? "text-amber"
                      : "text-charcoal-500 hover:text-charcoal"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* CTA button */}
          <a
            href="#contact"
            className={cn(
              "hidden md:inline-flex ml-2 px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ease-out-expo",
              "bg-amber text-white shadow-button hover:bg-amber-600 active:scale-[0.98]"
            )}
          >
            Связаться
          </a>

          {/* Mobile burger */}
          <button
            className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-full"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={mobileOpen}
          >
            <span
              className={cn(
                "absolute w-5 h-[1.5px] bg-charcoal rounded-full transition-all duration-300",
                mobileOpen ? "rotate-45" : "-translate-y-1.5"
              )}
            />
            <span
              className={cn(
                "absolute w-5 h-[1.5px] bg-charcoal rounded-full transition-all duration-300",
                mobileOpen ? "-rotate-45" : "translate-y-1.5"
              )}
            />
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-surface/95 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col items-center justify-center h-full gap-6">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={closeMobile}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.1 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="text-2xl font-display font-medium text-charcoal hover:text-amber transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={closeMobile}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.1 * nav.length, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="mt-4 px-8 py-3 bg-amber text-white font-semibold rounded-full shadow-button"
              >
                Связаться
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

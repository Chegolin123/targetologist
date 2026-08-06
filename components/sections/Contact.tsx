"use client";

import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { contact, profile } from "@/lib/content";

export function ContactSection() {
  return (
    <section id="contact" className="section">
      <div className="container-px">
        <Reveal>
          <span className="section-eyebrow">{contact.eyebrow}</span>
          <h2 className="section-title mt-2">{contact.title}</h2>
          <p className="section-subtitle">{contact.subtitle}</p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 mt-12">
          {/* Contact info card */}
          <Reveal delay={0.1}>
            <div className="double-bezel h-full">
              <div className="double-bezel-inner flex flex-col justify-center">
                <h3 className="text-lg font-display font-semibold text-charcoal mb-6">
                  На связи
                </h3>

                <div className="space-y-5">
                  {/* Telegram */}
                  <a
                    href={`https://t.me/${profile.telegram.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-amber/5 hover:bg-amber/10 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full bg-amber text-white flex items-center justify-center flex-shrink-0">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.66-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.04-.48-.82-.27-1.47-.42-1.42-.88.03-.24.37-.49 1.02-.74 4.02-1.75 6.71-2.9 8.04-3.46 3.83-1.59 4.63-1.87 5.15-1.88.11 0 .37.03.54.16.14.11.18.26.2.38.02.11.04.35.02.54Z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-charcoal-400">Telegram</p>
                      <p className="font-medium text-charcoal group-hover:text-amber transition-colors">
                        {profile.telegram}
                      </p>
                    </div>
                    <svg className="ml-auto w-4 h-4 text-charcoal-300 group-hover:translate-x-1 transition-transform" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 4l4 4-4 4" />
                    </svg>
                  </a>

                  {/* Email */}
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-sage/5 hover:bg-sage/10 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full bg-sage text-white flex items-center justify-center flex-shrink-0">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-charcoal-400">Email</p>
                      <p className="font-medium text-charcoal group-hover:text-sage transition-colors">
                        {profile.email}
                      </p>
                    </div>
                  </a>

                  {/* Phone */}
                  <a
                    href={`tel:${profile.phone.replace(/\s/g, "")}`}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-charcoal-100/50 hover:bg-charcoal-100 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full bg-charcoal-800 text-white flex items-center justify-center flex-shrink-0">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-charcoal-400">Телефон</p>
                      <p className="font-medium text-charcoal">
                        {profile.phone}
                      </p>
                    </div>
                  </a>
                </div>

                <p className="mt-6 text-xs text-charcoal-400">
                  {contact.responseTime}
                </p>
              </div>
            </div>
          </Reveal>

          {/* CTA block */}
          <Reveal delay={0.2} direction="left">
            <div className="flex flex-col justify-center h-full">
              <p className="text-lg text-charcoal-500 mb-8 text-pretty">
                Расскажите о вашем бизнесе и целях — я подготовлю конкретное предложение
                с прогнозом лидов и бюджетом.
              </p>

              <Magnetic>
                <a
                  href={`https://t.me/${profile.telegram.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-lg px-8 py-4 w-fit group"
                >
                  {contact.cta}
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/20 group-hover:translate-x-1 group-hover:-translate-y-px transition-transform duration-300">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                      <path d="M1 7.5h13M9 2.5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

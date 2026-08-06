"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { contact, profile } from "@/lib/content";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success";

export function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", contact: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (form.name.trim().length < 2) e.name = "Укажите имя";
    if (form.contact.trim().length < 3) e.contact = "Email или Telegram";
    if (form.message.trim().length < 10) e.message = "Опишите проект подробнее";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus("submitting");

    // 1) Try Telegram bot (CORS allowed by Telegram API)
    try {
      const msg = `🎯 НОВАЯ ЗАЯВКА С САЙТА\n━━━━━━━━━━━━━━\n👤 Имя: ${form.name}\n📱 Контакт: ${form.contact}\n📝 Сообщение: ${form.message}`;
      const resp = await fetch(`https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TG_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: process.env.NEXT_PUBLIC_TG_CHAT_ID,
          text: msg,
        }),
      });
      const data = await resp.json();
      if (!data.ok) throw new Error("Telegram send failed");
      setStatus("success");
      setForm({ name: "", contact: "", message: "" });
      return;
    } catch {
      // 2) Fallback: mailto
      const subject = encodeURIComponent(`Заказ — ${form.name}`);
      const body = encodeURIComponent(`Имя: ${form.name}\nКонтакт: ${form.contact}\n\n${form.message}`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus("success");
      setForm({ name: "", contact: "", message: "" });
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container-px">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left: pitch */}
          <div>
            <Reveal>
              <span className="eyebrow">Контакты</span>
              <h2 className="display mt-3" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 0.95 }}>
                {contact.title}
              </h2>
              <p className="mt-6 text-lg text-mist-light max-w-md">{contact.subtitle}</p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10 space-y-3">
                <a href={`https://t.me/${profile.telegram.replace("@", "")}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] hover:bg-lime/5 border border-white/[0.06] hover:border-lime/30 transition-all duration-300 group">
                  <span className="w-10 h-10 rounded-full bg-lime/10 text-lime flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.07-.2c-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.66-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.04-.48-.82-.27-1.47-.42-1.42-.88.03-.24.37-.49 1.02-.74 4.02-1.75 6.71-2.9 8.04-3.46 3.83-1.59 4.63-1.87 5.15-1.88.11 0 .37.03.54.16.14.11.18.26.2.38.02.11.04.35.02.54Z"/></svg>
                  </span>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wide2 text-mist">Telegram</p>
                    <p className="font-medium text-chalk group-hover:text-lime transition-colors">{profile.telegram}</p>
                  </div>
                </a>
                <a href={`mailto:${profile.email}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] hover:bg-lime/5 border border-white/[0.06] hover:border-lime/30 transition-all duration-300 group">
                  <span className="w-10 h-10 rounded-full bg-lime/10 text-lime flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  </span>
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wide2 text-mist">Email</p>
                    <p className="font-medium text-chalk group-hover:text-lime transition-colors">{profile.email}</p>
                  </div>
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="mt-6 font-mono text-xs text-mist">{contact.response}</p>
            </Reveal>
          </div>

          {/* Right: form */}
          <Reveal delay={0.2}>
            {status === "success" ? (
              <div role="status" aria-live="polite" className="panel p-10 flex flex-col items-center justify-center text-center min-h-[400px]">
                <div className="w-14 h-14 rounded-full bg-lime text-ink flex items-center justify-center mb-5">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <h3 className="font-display text-xl font-semibold text-chalk mb-2">Отправлено</h3>
                <p className="text-mist-light max-w-xs">Свяжусь в ближайшее время. Проверьте почту или Telegram.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="panel p-6 sm:p-8 space-y-5">
                <Field label="Имя" id="name" required>
                  <input
                    id="name" type="text" autoComplete="name"
                    value={form.name}
                    onChange={(e) => { setForm({ ...form, name: e.target.value }); if (errors.name) setErrors({ ...errors, name: "" }); }}
                    className={inputClass(!!errors.name)}
                    placeholder="Как к вам обращаться"
                  />
                  {errors.name && <ErrorText>{errors.name}</ErrorText>}
                </Field>

                <Field label="Email или Telegram" id="contact" required>
                  <input
                    id="contact" type="text" autoComplete="email"
                    value={form.contact}
                    onChange={(e) => { setForm({ ...form, contact: e.target.value }); if (errors.contact) setErrors({ ...errors, contact: "" }); }}
                    className={inputClass(!!errors.contact)}
                    placeholder="name@mail.ru или @username"
                  />
                  {errors.contact && <ErrorText>{errors.contact}</ErrorText>}
                </Field>

                <Field label="О проекте" id="message" required>
                  <textarea
                    id="message" rows={4}
                    value={form.message}
                    onChange={(e) => { setForm({ ...form, message: e.target.value }); if (errors.message) setErrors({ ...errors, message: "" }); }}
                    className={cn(inputClass(!!errors.message), "resize-none")}
                    placeholder="Ниша, бюджет, цели"
                  />
                  {errors.message && <ErrorText>{errors.message}</ErrorText>}
                </Field>

                <Magnetic>
                  <button type="submit" disabled={status === "submitting"}
                    className="btn-lime w-full justify-center disabled:opacity-50">
                    {status === "submitting" ? "Отправляю…" : contact.cta}
                  </button>
                </Magnetic>
                <p className="text-xs font-mono text-mist text-center">
                  Нажимая, вы соглашаетесь с обработкой данных
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, id, required, children }: { label: string; id: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-mono uppercase tracking-wide2 text-mist mb-2">
        {label} {required && <span className="text-lime">*</span>}
      </label>
      {children}
    </div>
  );
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return <p role="alert" className="mt-1.5 text-xs text-red-400">{children}</p>;
}

function inputClass(hasError: boolean) {
  return cn(
    "w-full px-4 py-3 rounded-xl bg-white/[0.03] border text-chalk placeholder:text-mist",
    "transition-colors duration-200 outline-none focus:ring-2 focus:ring-lime/20",
    hasError ? "border-red-400/50" : "border-white/[0.08] focus:border-lime/40"
  );
}

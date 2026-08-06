"use client";

import { useState, useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { contact, profile } from "@/lib/content";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

export function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const firstInvalidRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  const validate = (field: keyof FormState, value: string): string | undefined => {
    if (field === "name") {
      if (!value.trim()) return "Укажите, как к вам обращаться";
      if (value.trim().length < 2) return "Слишком короткое имя";
    }
    if (field === "email") {
      if (!value.trim()) return "Укажите email или Telegram";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && !value.startsWith("@")) {
        return "Неверный формат. Пример: name@mail.ru или @telegram";
      }
    }
    if (field === "message") {
      if (!value.trim()) return "Опишите кратко ваш бизнес и цели";
      if (value.trim().length < 10) return "Слишком коротко — добавьте деталей";
    }
    return undefined;
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    // Clear error on edit
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleBlur = (field: keyof FormState) => {
    const error = validate(field, form[field]);
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: Errors = {
      name: validate("name", form.name),
      email: validate("email", form.email),
      message: validate("message", form.message),
    };
    setErrors(newErrors);

    // Focus first invalid field
    if (newErrors.name) {
      firstInvalidRef.current = document.getElementById("contact-name") as HTMLInputElement;
    } else if (newErrors.email) {
      firstInvalidRef.current = document.getElementById("contact-email") as HTMLInputElement;
    } else if (newErrors.message) {
      firstInvalidRef.current = document.getElementById("contact-message") as HTMLTextAreaElement;
    }
    if (firstInvalidRef.current) {
      firstInvalidRef.current.focus();
      return;
    }

    setStatus("submitting");

    try {
      // mailto fallback — opens default mail client with pre-filled body
      const subject = encodeURIComponent(`Заказ с сайта — ${form.name}`);
      const body = encodeURIComponent(
        `Имя: ${form.name}\nКонтакт: ${form.email}\n\n${form.message}`
      );
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;

      // Simulate success after redirect attempt
      setTimeout(() => {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      }, 800);
    } catch {
      setStatus("error");
    }
  };

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

                <div className="space-y-3">
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

          {/* Contact form */}
          <Reveal delay={0.2} direction="left">
            {status === "success" ? (
              <div
                role="status"
                aria-live="polite"
                className="double-bezel h-full"
              >
                <div className="double-bezel-inner flex flex-col items-center justify-center text-center py-16">
                  <div className="w-14 h-14 rounded-full bg-sage text-white flex items-center justify-center mb-5">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-display font-semibold text-charcoal mb-2">
                    Заявка отправлена
                  </h3>
                  <p className="text-charcoal-500 max-w-xs">
                    Я свяжусь с вами в ближайшее время. Проверьте почту или Telegram.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-sm font-medium text-charcoal mb-2"
                  >
                    Как вас зовут <span className="text-amber" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    autoComplete="name"
                    required
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    onBlur={() => handleBlur("name")}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={cn(
                      "w-full px-4 py-3 rounded-xl border bg-white text-charcoal",
                      "transition-colors duration-200 outline-none",
                      "focus:border-amber focus:ring-2 focus:ring-amber/20",
                      errors.name ? "border-red-400" : "border-black/10"
                    )}
                    placeholder="Иван"
                  />
                  {errors.name && (
                    <p
                      id="name-error"
                      role="alert"
                      className="mt-1.5 text-sm text-red-500"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email / Telegram */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-medium text-charcoal mb-2"
                  >
                    Email или Telegram <span className="text-amber" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="text"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={cn(
                      "w-full px-4 py-3 rounded-xl border bg-white text-charcoal",
                      "transition-colors duration-200 outline-none",
                      "focus:border-amber focus:ring-2 focus:ring-amber/20",
                      errors.email ? "border-red-400" : "border-black/10"
                    )}
                    placeholder="name@mail.ru или @username"
                  />
                  {errors.email && (
                    <p
                      id="email-error"
                      role="alert"
                      className="mt-1.5 text-sm text-red-500"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm font-medium text-charcoal mb-2"
                  >
                    {contact.messageLabel} <span className="text-amber" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    onBlur={() => handleBlur("message")}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    className={cn(
                      "w-full px-4 py-3 rounded-xl border bg-white text-charcoal resize-none",
                      "transition-colors duration-200 outline-none",
                      "focus:border-amber focus:ring-2 focus:ring-amber/20",
                      errors.message ? "border-red-400" : "border-black/10"
                    )}
                    placeholder="Например: клининговая компания в Москве, нужен Директ на поиск, бюджет 30к/мес"
                  />
                  {errors.message && (
                    <p
                      id="message-error"
                      role="alert"
                      className="mt-1.5 text-sm text-red-500"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Error banner */}
                {status === "error" && (
                  <div
                    role="alert"
                    className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm"
                  >
                    Не удалось отправить. Напишите напрямую в Telegram —{" "}
                    <a
                      href={`https://t.me/${profile.telegram.replace("@", "")}`}
                      className="underline font-medium"
                    >
                      {profile.telegram}
                    </a>
                  </div>
                )}

                {/* Submit */}
                <Magnetic>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="btn-primary text-base px-8 py-4 w-full sm:w-auto group disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? (
                      <>
                        <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                          <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                        </svg>
                        Отправляю…
                      </>
                    ) : (
                      <>
                        {contact.submitLabel}
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/20 group-hover:translate-x-0.5 group-hover:-translate-y-px transition-transform duration-300">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </>
                    )}
                  </button>
                </Magnetic>

                <p className="text-xs text-charcoal-400">
                  Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.
                </p>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { profile } from "@/lib/content";

export default function NotFound() {
  return (
    <main className="min-h-dvh flex items-center justify-center px-5">
      <div className="text-center">
        <p className="font-display font-bold text-lime glow-lime leading-none" style={{ fontSize: "clamp(6rem, 18vw, 12rem)" }}>404</p>
        <h1 className="mt-4 text-2xl font-display font-semibold text-chalk">Страница не найдена</h1>
        <p className="mt-3 text-mist-light">Вернитесь на главную.</p>
        <Link href="/" className="btn-lime mt-8 inline-flex">На главную</Link>
        <p className="mt-8 font-mono text-xs text-mist">
          Или Telegram:{" "}
          <a href={`https://t.me/${profile.telegram.replace("@", "")}`} className="text-lime hover:underline">{profile.telegram}</a>
        </p>
      </div>
    </main>
  );
}

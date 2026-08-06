import Link from "next/link";
import { profile } from "@/lib/content";

export default function NotFound() {
  return (
    <main className="min-h-dvh flex items-center justify-center px-5">
      <div className="text-center max-w-md">
        <p
          className="font-display font-bold text-amber leading-none"
          style={{ fontSize: "clamp(5rem, 15vw, 9rem)" }}
        >
          404
        </p>
        <h1 className="mt-4 text-2xl font-display font-semibold text-charcoal">
          Страница не найдена
        </h1>
        <p className="mt-3 text-charcoal-500">
          Возможно, страница была перемещена или удалена. Вернитесь на главную.
        </p>
        <Link href="/" className="btn-primary mt-8 inline-flex">
          На главную
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M13 7H1M6 2 1 7l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <p className="mt-8 text-sm text-charcoal-400">
          Или напишите в Telegram:{" "}
          <a
            href={`https://t.me/${profile.telegram.replace("@", "")}`}
            className="text-amber hover:underline"
          >
            {profile.telegram}
          </a>
        </p>
      </div>
    </main>
  );
}

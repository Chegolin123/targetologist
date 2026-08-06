import type { Metadata } from "next";
import { profile } from "@/lib/content";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description: "Обработка персональных данных на сайте таргетолога Алексея Чеголина.",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-dvh py-24 sm:py-32">
      <article className="container-px max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-display font-semibold text-charcoal">
          Политика конфиденциальности
        </h1>
        <p className="mt-2 text-sm text-charcoal-400">
          Последнее обновление: {new Date().toLocaleDateString("ru-RU")}
        </p>

        <div className="mt-10 space-y-8 text-charcoal-500 leading-relaxed">
          <section>
            <h2 className="text-xl font-display font-semibold text-charcoal mb-3">
              1. Общие положения
            </h2>
            <p>
              Настоящая политика определяет порядок обработки персональных данных
              и меры по обеспечению их безопасности, предпринимаемые Алексеем Чеголиным
              (далее — «Оператор») в отношении персональных данных, которые Оператор
              может получить о субъекте персональных данных при использовании сайта.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-semibold text-charcoal mb-3">
              2. Состав персональных данных
            </h2>
            <p>
              Оператор обрабатывает следующие персональные данные, предоставленные
              пользователем через форму обратной связи:
            </p>
            <ul className="mt-3 space-y-1.5 list-disc pl-5">
              <li>имя (как к вам обращаться);</li>
              <li>контактные данные (email или Telegram);</li>
              <li>текст сообщения, описывающего бизнес и цели.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-display font-semibold text-charcoal mb-3">
              3. Цели обработки
            </h2>
            <p>
              Персональные данные обрабатываются исключительно для связи с пользователем,
              ответа на запрос и подготовки коммерческого предложения. Оператор не передаёт
              персональные данные третьим лицам без согласия пользователя.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-semibold text-charcoal mb-3">
              4. Хранение и удаление
            </h2>
            <p>
              Персональные данные хранятся до достижения цели обработки или до отзыва
              согласия. По запросу пользователя данные удаляются в течение 30 дней.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-display font-semibold text-charcoal mb-3">
              5. Контакты
            </h2>
            <p>
              По вопросам обработки персональных данных пишите:{" "}
              <a href={`mailto:${profile.email}`} className="text-amber hover:underline">
                {profile.email}
              </a>{" "}
              или в Telegram{" "}
              <a
                href={`https://t.me/${profile.telegram.replace("@", "")}`}
                className="text-amber hover:underline"
              >
                {profile.telegram}
              </a>
              .
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}

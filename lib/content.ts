/**
 * Single source of truth for all site content.
 * Every section reads from here — no hardcoded strings in components.
 */

// ── Profile ──────────────────────────────────────────────────────────
export const profile = {
  name: "Алексей Чеголин",
  firstName: "Алексей",
  role: "Таргетолог",
  tagline: "Яндекс.Директ & VK Реклама",
  headline: "Привожу целевые лиды из рекламы. Без слива бюджета.",
  location: "Москва",
  email: "chegolin@yandex.ru",
  telegram: "@NoWayWhile",
  phone: "+7 993 200-65-51",
  github: "Chegolin123",
  available: true,
} as const;

// ── Hero ─────────────────────────────────────────────────────────────
export const hero = {
  greeting: "Привет, я Алексей",
  title: "Таргетолог",
  subtitle: "Специалист по Яндекс.Директ и VK Рекламе",
  ctaPrimary: "Обсудить проект",
  ctaSecondary: "Telegram",
  photoAlt: "Алексей Чеголин — таргетолог",
} as const;

// ── Navigation ───────────────────────────────────────────────────────
export const nav = [
  { label: "Услуги", href: "#services" },
  { label: "Кейс", href: "#case" },
  { label: "Подход", href: "#why-me" },
  { label: "Контакты", href: "#contact" },
] as const;

// ── Platforms ────────────────────────────────────────────────────────
export const platforms = {
  title: "Работаю с платформами",
  items: [
    {
      name: "Яндекс.Директ",
      description: "Поисковая реклама, РСЯ, ретаргетинг, медийная реклама",
    },
    {
      name: "VK Реклама",
      description: "Таргетированная реклама ВКонтакте, лид-формы, ретаргетинг",
    },
  ],
} as const;

// ── Services ─────────────────────────────────────────────────────────
export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  size: "large" | "medium" | "small";
  accent: "amber" | "sage";
}

export const services: Service[] = [
  {
    id: "audit",
    title: "Аудит рекламных кампаний",
    description:
      "Разберу текущие кампании, найду точки слива бюджета и покажу, где вы теряете лиды.",
    features: [
      "Анализ семантического ядра",
      "Проверка креативов на ФЗ-38",
      "Оценка эффективности ставок",
      "Отчёт с рекомендациями",
    ],
    size: "small",
    accent: "sage",
  },
  {
    id: "direct",
    title: "Настройка Яндекс.Директ",
    description:
      "Запуск рекламы под ключ: от семантики до первых лидов. Поиск + РСЯ + ретаргетинг.",
    features: [
      "Сбор семантического ядра (WordStat + AI)",
      "Генерация креативов с проверкой ФЗ-38",
      "Настройка кампаний и групп объявлений",
      "Минус-слова и авто-оптимизация",
      "Подключение Метрики и целей",
      "Отчётность каждую неделю",
    ],
    size: "large",
    accent: "amber",
  },
  {
    id: "vk",
    title: "VK Реклама",
    description:
      "Таргетинг ВКонтакте: лид-формы, ретаргетинг на подписчиков, lookalike-аудитории.",
    features: [
      "Запуск рекламных кампаний",
      "Настройка лид-форм",
      "Lookalike и ретаргетинг",
      "Аналитика и оптимизация",
    ],
    size: "medium",
    accent: "amber",
  },
  {
    id: "management",
    title: "Ведение и оптимизация",
    description:
      "Еженедельная работа с кампаниями: корректировка ставок, минус-слова, A/B тесты.",
    features: [
      "Еженедельная оптимизация",
      "Корректировка ставок",
      "A/B тесты креативов",
      "Месячный отчёт",
    ],
    size: "small",
    accent: "sage",
  },
];

// ── Case Study ───────────────────────────────────────────────────────
export const caseStudy = {
  eyebrow: "Кейс",
  title: "Все Горящие туры Отели",
  client: "Android-приложение, агрегатор 15+ туроператоров",
  description:
    "Разработал стратегию таргетированной рекламы для Android-приложения в RuStore. Три шага за 2 месяца: изучение аудитории → масштабирование → финальная оценка.",
  approach: [
    "Тест 3 сегментов аудитории (Выгодные туры, Семейный отдых, Внутренний туризм)",
    "Выбор лидеров по сценариям A/B/C",
    "Lookalike-аудитории и ротация креативов",
  ],
  utp: "«Мы не туроператор. Мы сравниваем всех — и находим лучшую цену.»",
  metrics: [
    { value: 50000, suffix: " ₽", label: "Бюджет" },
    { value: 9.4, decimals: 1, suffix: "/10", label: "Оценка эксперта" },
    { value: 700, suffix: "+", label: "Установок (прогноз)" },
    { value: 70, suffix: " ₽", label: "CPI средний" },
  ],
  platform: "VK Реклама",
  rating: "4.6★ (49 оценок, 10 000+ скачиваний)",
} as const;

// ── Why Me ───────────────────────────────────────────────────────────
export interface Principle {
  id: string;
  title: string;
  description: string;
}

export const principles: Principle[] = [
  {
    id: "ai",
    title: "AI-инструменты",
    description:
      "Автоматизирую рутину с помощью AI-агентов: сбор семантики, генерация креативов, анализ метрик. 43 инструмента в арсенале. Больше времени — стратегии, меньше — кнопкам.",
  },
  {
    id: "data",
    title: "Data-driven подход",
    description:
      "Решения на основе цифр, а не интуиции. Анализирую поисковые запросы, CTR, конверсии и CPL перед каждым действием. Никаких «мне кажется».",
  },
  {
    id: "budget",
    title: "Без слива бюджета",
    description:
      "Guardrails на каждый этап: лимиты ставок, дневной бюджет, аудит каждого списания. Прозрачная отчётность — вы видите каждую копейку.",
  },
  {
    id: "experience",
    title: "Реальный опыт",
    description:
      "За плечами — разработка AI-агента для управления Яндекс.Директом. Знаю API изнутри, не только интерфейс. Разбираюсь в технологии глубже среднестатистического директолога.",
  },
];

// ── Metrics ──────────────────────────────────────────────────────────
export const metrics = [
  { value: 50000, suffix: "+ ₽", label: "Бюджетов под управлением", decimals: 0 },
  { value: 9.4, decimals: 1, suffix: "/10", label: "Экспертная оценка стратегии" },
  { value: 43, suffix: "", label: "Инструмента в AI-арсенале", decimals: 0 },
  { value: 2, suffix: "", label: "Платформы: Директ + VK", decimals: 0 },
] as const;

// ── Contact ──────────────────────────────────────────────────────────
export const contact = {
  eyebrow: "Контакты",
  title: "Готовы получать лиды?",
  subtitle:
    "Напишите мне в Telegram или заполните форму — обсудим ваш проект и я подготовлю предложение.",
  cta: "Написать в Telegram",
  responseTime: "Отвечаю в течение 2 часов",
  emailLabel: "Email",
  messageLabel: "Опишите ваш бизнес и цели",
  submitLabel: "Отправить",
  successMessage: "Спасибо! Я свяжусь с вами в ближайшее время.",
} as const;

// ── Footer ───────────────────────────────────────────────────────────
export const footer = {
  copyright: `© ${new Date().getFullYear()} Алексей Чеголин. Таргетолог.`,
  links: [
    { label: "GitHub", href: "https://github.com/Chegolin123" },
    { label: "Telegram", href: "https://t.me/NoWayWhile" },
  ],
} as const;

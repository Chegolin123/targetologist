import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Алексей Чеголин — Таргетолог",
    short_name: "Чеголин",
    description: "Настройка и ведение рекламы в Яндекс.Директ и VK Рекламе",
    start_url: "/",
    display: "standalone",
    background_color: "#FCFAF7",
    theme_color: "#C8782C",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}

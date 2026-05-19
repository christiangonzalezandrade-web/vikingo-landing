import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
/** Debe coincidir con `locales` en `src/i18n/routing.ts` (no importar routing aquí: rompe next.config). */
const LOCALE_PATTERN = "en|es|pt|de|fr|it";

const buildId =
  process.env.NEXT_PUBLIC_BUILD_ID ??
  process.env.BUILD_ID ??
  "dev";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BUILD_ID: buildId,
  },
  /** Oculta el badge "N" (Next.js DevTools) en la esquina inferior izquierda durante `next dev`. */
  devIndicators: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  /**
   * Evita `no-store` en `/_next/static` y archivos de `public/` (CSS/JS/fonts).
   * Aplicar cache agresivo a todo `/:path*` rompe estilos en algunos despliegues/CDN.
   */
  async headers() {
    const noStore = [
      { key: "Cache-Control", value: "no-store, no-cache, must-revalidate" },
      { key: "Pragma", value: "no-cache" },
    ] as const;

    return [
      { source: "/", headers: [...noStore] },
      { source: `/:locale(${LOCALE_PATTERN})`, headers: [...noStore] },
      { source: `/:locale(${LOCALE_PATTERN})/:path*`, headers: [...noStore] },
    ];
  },
};

export default withNextIntl(nextConfig);

import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

/**
 * Ilustración del ecosistema Vikingo (Coffee Point, Smart Vend, Multi-Kiosk,
 * Parking EV, AI Service Hub, Laundry, Massage, Secure Data Center → Global
 * Management Dashboard). Server Component.
 *
 * Imagen: `public/ilustracion-maestra-ecosistema-vikingo.png`.
 */
export async function HeroEcosystem({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "hero" });

  return (
    <div className="relative mx-auto mt-16 w-full max-w-6xl">
      <div
        className="pointer-events-none absolute inset-x-0 -inset-y-6 -z-10 rounded-[2rem] bg-gradient-to-b from-blue-500/10 via-cyan-400/5 to-transparent blur-2xl"
        aria-hidden
      />
      <div className="relative overflow-hidden rounded-3xl border border-white/30 bg-white/70 p-2 shadow-2xl shadow-blue-500/10 backdrop-blur-sm dark:border-white/10 dark:bg-white/[0.04]">
        <Image
          src="/ilustracion-maestra-ecosistema-vikingo.png"
          alt={t("ecosystemAlt")}
          width={1774}
          height={887}
          sizes="(min-width: 1280px) 1152px, (min-width: 768px) 90vw, 100vw"
          priority={false}
          className="mx-auto h-auto w-full select-none rounded-2xl"
        />
      </div>
    </div>
  );
}

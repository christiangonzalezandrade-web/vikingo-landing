import { getTranslations } from "next-intl/server";
import { ArrowRight, Zap } from "lucide-react";
import { CONTACT_MAILTO } from "@/lib/config";
import { HeroAnimatedStats } from "@/components/HeroAnimatedStats";
import { HeroEcosystem } from "@/components/HeroEcosystem";
import type { Locale } from "@/i18n/routing";
import esMessages from "../../messages/es.json";

/** Todo el hero en servidor salvo la mini animación de números (cliente). */
export async function Hero({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "hero" });
  /** Título ES: leído del JSON en build — no depende de la resolución interna de next-intl. */
  const heroTitle = locale === "es" ? esMessages.hero.title : t("title");

  return (
    <section className="relative min-h-screen overflow-hidden pt-28 pb-20 mesh-bg grid-pattern">
      <div
        className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl animate-pulse-glow"
        aria-hidden
      />
      <div
        className="absolute bottom-1/4 right-1/4 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl animate-pulse-glow"
        style={{ animationDelay: "1s" }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50/80 px-4 py-1.5 text-sm font-medium text-[#0066ff] dark:border-blue-800 dark:bg-blue-950/50 dark:text-[#3d8bff]">
            <Zap className="h-3.5 w-3.5" />
            {t("badge")}
          </span>
          <h1 className="mt-8 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="text-[#0a1628] dark:text-white">{heroTitle}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            {t("subtitle")}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center">
            <a
              href={CONTACT_MAILTO}
              className="group flex items-center gap-2 rounded-xl gradient-bg px-8 py-4 text-base font-semibold text-white shadow-xl shadow-blue-500/30 transition hover:opacity-90"
            >
              {t("ctaDemo")}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        <HeroAnimatedStats
          machines={t("stats.machines")}
          transactions={t("stats.transactions")}
          uptimeLabel={t("stats.uptime")}
          countriesLabel={t("stats.countries")}
        />

        <HeroEcosystem locale={locale} />
      </div>
    </section>
  );
}

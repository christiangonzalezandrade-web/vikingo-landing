"use client";

import { useTranslations } from "next-intl";
import { Cloud, Coins, Globe, Rocket, Zap, MapPin } from "lucide-react";
import { WorldCoverageMap } from "./WorldCoverageMap";

const currencies = ["USD", "EUR", "GBP", "BRL", "CLP", "MXN", "CAD", "AUD", "CHF", "PLN", "CZK", "RON"];

export function GlobalCoverage() {
  const t = useTranslations("global");

  const features = [
    { icon: Zap, key: "sumup" as const },
    { icon: Coins, key: "multicurrency" as const },
    { icon: Globe, key: "international" as const },
    { icon: Cloud, key: "cloud" as const },
    { icon: Rocket, key: "onboarding" as const },
    { icon: MapPin, key: "expansion" as const },
  ];

  return (
    <section id="global" className="section-dark relative overflow-hidden py-24">
      <div className="absolute inset-0 opacity-20" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#0066ff33_0%,_transparent_70%)]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-medium uppercase tracking-widest text-[#00d4ff]">
            {t("badge")}
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">{t("title")}</h2>
          <p className="mt-4 text-lg text-slate-400">{t("subtitle")}</p>
        </div>

        <WorldCoverageMap />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, key }) => (
            <div
              key={key}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:border-[#0066ff]/50 hover:bg-white/10"
            >
              <Icon className="h-8 w-8 text-[#00d4ff]" />
              <h3 className="mt-4 font-semibold">{t(`features.${key}`)}</h3>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <h3 className="font-semibold text-[#00d4ff]">{t("currencies")}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {currencies.map((c) => (
                <span key={c} className="rounded-lg bg-white/10 px-3 py-1.5 font-mono text-sm">
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
            <h3 className="font-semibold text-[#00d4ff]">{t("live")}</h3>
            <div className="mt-4 flex items-center gap-2 text-sm text-emerald-400">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              {t("networkActive")}
            </div>
            <p className="mt-4 text-sm text-slate-400">{t("networkDesc")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

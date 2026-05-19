"use client";

import { useTranslations } from "next-intl";
import {
  CreditCard,
  Radio,
  Brain,
  Package,
  Users,
  Sparkles,
  Monitor,
  BarChart3,
  Globe,
  Coins,
} from "lucide-react";

const items = [
  { key: "cashless", icon: CreditCard },
  { key: "telemetry", icon: Radio },
  { key: "ai", icon: Brain },
  { key: "inventory", icon: Package },
  { key: "corporate", icon: Users },
  { key: "pricingAi", icon: Sparkles },
  { key: "remote", icon: Monitor },
  { key: "reports", icon: BarChart3 },
  { key: "international", icon: Globe },
  { key: "multicurrency", icon: Coins },
] as const;

export function Solutions() {
  const t = useTranslations("solutions");

  return (
    <section id="solutions" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-sm font-medium uppercase tracking-widest text-[#0066ff]">
            {t("badge")}
          </span>
          <h2 className="mt-4 text-3xl font-bold text-[#0a1628] sm:text-4xl dark:text-white">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">{t("subtitle")}</p>
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {items.map(({ key, icon: Icon }) => (
            <div
              key={key}
              className="group rounded-2xl border border-slate-200/60 bg-white p-6 transition hover:border-[#0066ff]/40 hover:shadow-xl hover:shadow-blue-500/10 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#0066ff] transition group-hover:gradient-bg group-hover:text-white dark:bg-blue-950/50">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-semibold">{t(`items.${key}.title`)}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                {t(`items.${key}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

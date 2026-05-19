"use client";

import { useTranslations } from "next-intl";
import {
  TrendingUp,
  Banknote,
  Gauge,
  Eye,
  Wrench,
  Smile,
  Globe,
  Building2,
} from "lucide-react";

const benefitKeys = [
  "sales",
  "cash",
  "efficiency",
  "visibility",
  "predictive",
  "experience",
  "scale",
  "centralized",
] as const;

const icons = [TrendingUp, Banknote, Gauge, Eye, Wrench, Smile, Globe, Building2];

export function Benefits() {
  const t = useTranslations("benefits");

  return (
    <section className="py-24 mesh-bg">
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
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefitKeys.map((key, i) => {
            const Icon = icons[i];
            return (
              <div
                key={key}
                className="rounded-2xl border border-slate-200/60 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-bg text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-semibold">{t(`items.${key}.title`)}</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  {t(`items.${key}.desc`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

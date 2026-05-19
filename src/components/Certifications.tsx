"use client";

import { useTranslations } from "next-intl";
import { ShieldCheck, Award } from "lucide-react";

export function Certifications() {
  const t = useTranslations("certifications");
  const items = t.raw("items") as string[];

  return (
    <section id="certifications" className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-[#0066ff]">
            <ShieldCheck className="h-4 w-4" />
            {t("badge")}
          </span>
          <h2 className="mt-4 text-3xl font-bold text-[#0a1628] sm:text-4xl dark:text-white">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">{t("subtitle")}</p>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item}
              className="group flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-white p-5 transition hover:border-[#0066ff]/40 hover:shadow-lg hover:shadow-blue-500/10 dark:border-slate-800 dark:bg-slate-950"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#0066ff] transition group-hover:gradient-bg group-hover:text-white dark:bg-blue-950/50">
                <Award className="h-5 w-5" />
              </div>
              <p className="text-sm font-medium leading-snug text-[#0a1628] dark:text-slate-200">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { Plug, CreditCard, Globe } from "lucide-react";

const steps = [
  { key: "1", icon: Plug, num: "01" },
  { key: "2", icon: CreditCard, num: "02" },
  { key: "3", icon: Globe, num: "03" },
] as const;

export function HowItWorks() {
  const t = useTranslations("howItWorks");

  return (
    <section className="section-dark py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-sm font-medium uppercase tracking-widest text-[#00d4ff]">
            {t("badge")}
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">{t("title")}</h2>
        </div>
        <div className="relative mt-20 grid gap-12 md:grid-cols-3">
          <div
            className="absolute top-16 left-0 right-0 hidden h-0.5 bg-gradient-to-r from-transparent via-[#0066ff] to-transparent md:block"
            aria-hidden
          />
          {steps.map(({ key, icon: Icon, num }) => (
            <div
              key={key}
              className="relative text-center"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                <Icon className="h-8 w-8 text-[#00d4ff]" />
              </div>
              <span className="mt-4 block text-4xl font-bold text-white/20">{num}</span>
              <h3 className="mt-2 text-xl font-semibold">{t(`steps.${key}.title`)}</h3>
              <p className="mt-3 text-slate-400">{t(`steps.${key}.desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

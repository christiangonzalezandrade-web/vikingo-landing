"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { CONTACT_MAILTO } from "@/lib/config";

export function FinalCTA() {
  const t = useTranslations("cta");

  return (
    <section className="relative overflow-hidden py-24">
      <div className="absolute inset-0 gradient-bg opacity-95" />
      <div className="absolute inset-0 mesh-bg opacity-30" />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl md:text-5xl">{t("title")}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">{t("subtitle")}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={CONTACT_MAILTO}
              className="group flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-base font-semibold text-[#0066ff] shadow-xl transition hover:bg-blue-50"
            >
              {t("demo")}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <a
              href={CONTACT_MAILTO}
              className="rounded-xl border-2 border-white/40 px-8 py-4 text-base font-semibold text-white transition hover:bg-white/10"
            >
              {t("executive")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

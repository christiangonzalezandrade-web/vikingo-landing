"use client";

import { useTranslations } from "next-intl";
import { Users } from "lucide-react";
import { ScrollLink } from "./ScrollLink";

export function CareersButton() {
  const t = useTranslations("careers");

  return (
    <div className="fixed bottom-6 left-4 z-40 md:bottom-8 md:left-6">
      <ScrollLink
        href="#careers"
        className="group flex items-center gap-2 rounded-full border border-[#0066ff]/30 bg-white px-4 py-2.5 text-xs font-semibold text-[#0066ff] shadow-lg shadow-blue-500/15 transition hover:border-[#0066ff] hover:shadow-xl sm:px-5 sm:py-3 sm:text-sm dark:border-blue-800 dark:bg-slate-900 dark:text-[#3d8bff]"
      >
        <Users className="h-4 w-4 shrink-0 transition group-hover:scale-110" />
        <span className="max-w-[140px] leading-tight sm:max-w-none">{t("button")}</span>
      </ScrollLink>
    </div>
  );
}

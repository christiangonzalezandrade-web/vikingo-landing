"use client";

import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type FaqItem = { q: string; a: string };

export function FAQ() {
  const t = useTranslations("faq");
  const items = t.raw("items") as FaqItem[];
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-sm font-medium uppercase tracking-widest text-[#0066ff]">
            {t("badge")}
          </span>
          <h2 className="mt-4 text-3xl font-bold text-[#0a1628] sm:text-4xl dark:text-white">
            {t("title")}
          </h2>
        </div>
        <div className="mt-12 space-y-3">
          {items.map((item, i) => (
            <div
              key={item.q}
              className="overflow-hidden rounded-xl border border-slate-200/60 bg-white dark:border-slate-800 dark:bg-slate-900"
            >
              <button
                type="button"
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between px-6 py-4 text-left font-medium"
                aria-expanded={open === i}
              >
                {item.q}
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-slate-400 transition-transform",
                    open === i && "rotate-180"
                  )}
                />
              </button>
              {open === i && (
                <p className="border-t border-slate-200 px-6 py-4 text-sm text-slate-600 dark:border-slate-700 dark:text-slate-400">
                  {item.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

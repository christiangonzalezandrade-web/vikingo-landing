"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { MapPin } from "lucide-react";
import { countries, type CountryCode } from "@/lib/countries";
import type { Locale } from "@/i18n/routing";
import { OPEN_COUNTRY_GATE_EVENT } from "./CountryGate";

const STORAGE_KEY = "vikingo_prefs";

export function CountrySelector() {
  const t = useTranslations("countryGate");
  const locale = useLocale() as Locale;
  const [country, setCountry] = useState<CountryCode>("CL");

  useEffect(() => {
    queueMicrotask(() => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) setCountry(JSON.parse(raw).country as CountryCode);
      } catch {
        /* ignore */
      }
    });
  }, []);

  const handleChange = (code: CountryCode) => {
    setCountry(code);
    const raw = localStorage.getItem(STORAGE_KEY);
    const prefs = raw ? JSON.parse(raw) : { locale };
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...prefs, country: code }));
    window.dispatchEvent(new CustomEvent("vikingo-country-change", { detail: code }));
  };

  return (
    <div className="hidden items-center gap-1 lg:flex">
      <div className="relative">
        <MapPin className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
        <select
          value={country}
          onChange={(e) => handleChange(e.target.value as CountryCode)}
          aria-label={t("country")}
          className="appearance-none rounded-lg border border-slate-200/80 bg-white/80 py-2 pl-8 pr-8 text-xs font-medium text-slate-700 outline-none focus:border-[#0066ff] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
        >
          {countries.map((c) => (
            <option key={c.code} value={c.code}>
              {c.flag} {c.name[locale] ?? c.name.en}
            </option>
          ))}
        </select>
      </div>
      <button
        type="button"
        onClick={() => window.dispatchEvent(new CustomEvent(OPEN_COUNTRY_GATE_EVENT))}
        className="rounded-lg px-2 py-2 text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-[#0066ff] dark:hover:bg-white/10"
        title={t("change")}
      >
        {t("change")}
      </button>
    </div>
  );
}

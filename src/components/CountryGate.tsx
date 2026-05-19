"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { countries, type CountryCode } from "@/lib/countries";
import { localeNames, type Locale } from "@/i18n/routing";
import { Globe } from "lucide-react";

const STORAGE_KEY = "vikingo_prefs";
export const OPEN_COUNTRY_GATE_EVENT = "vikingo-open-country-gate";

export function getStoredCountry(): CountryCode | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw).country as CountryCode;
  } catch {
    return null;
  }
}

function readPrefs(): { country: CountryCode; locale: Locale } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { country?: CountryCode; locale?: Locale };
    if (!parsed.country || !parsed.locale) return null;
    return { country: parsed.country, locale: parsed.locale };
  } catch {
    return null;
  }
}

export function CountryGate() {
  const t = useTranslations("countryGate");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState<CountryCode>("CL");
  const [language, setLanguage] = useState<Locale>(locale);

  useEffect(() => {
    const prefs = readPrefs();
    if (prefs) {
      queueMicrotask(() => {
        setCountry(prefs.country);
        setLanguage(prefs.locale);
      });
      return;
    }
    const id = window.requestAnimationFrame(() => setOpen(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const onOpen = () => {
      const prefs = readPrefs();
      if (prefs) {
        setCountry(prefs.country);
        setLanguage(prefs.locale);
      }
      setOpen(true);
    };
    window.addEventListener(OPEN_COUNTRY_GATE_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_COUNTRY_GATE_EVENT, onOpen);
  }, []);

  const handleContinue = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ country, locale: language }));
    setOpen(false);
    if (language !== locale) router.replace(pathname, { locale: language });
    window.dispatchEvent(new CustomEvent("vikingo-country-change", { detail: country }));
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="country-gate-title"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a1628]/70 p-4 backdrop-blur-md"
    >
      <div className="w-full max-w-md rounded-2xl border border-slate-200/80 bg-white p-8 shadow-2xl dark:border-slate-700 dark:bg-slate-900">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/50">
          <Globe className="h-7 w-7 text-[#0066ff]" />
        </div>
        <h2
          id="country-gate-title"
          className="mt-6 text-center text-2xl font-bold text-[#0a1628] dark:text-white"
        >
          {t("title")}
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-400">
          {t("subtitle")}
        </p>
        <div className="mt-8 space-y-4">
          <div>
            <label htmlFor="country-gate-country" className="mb-1.5 block text-sm font-medium">
              {t("country")}
            </label>
            <select
              id="country-gate-country"
              value={country}
              onChange={(e) => setCountry(e.target.value as CountryCode)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#0066ff] dark:border-slate-700 dark:bg-slate-800"
            >
              {countries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.name[locale] ?? c.name.en}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="country-gate-language" className="mb-1.5 block text-sm font-medium">
              {t("language")}
            </label>
            <select
              id="country-gate-language"
              value={language}
              onChange={(e) => setLanguage(e.target.value as Locale)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#0066ff] dark:border-slate-700 dark:bg-slate-800"
            >
              {(Object.keys(localeNames) as Locale[]).map((l) => (
                <option key={l} value={l}>
                  {localeNames[l]}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          type="button"
          onClick={handleContinue}
          className="mt-8 w-full rounded-xl gradient-bg py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:opacity-90"
        >
          {t("continue")}
        </button>
      </div>
    </div>
  );
}

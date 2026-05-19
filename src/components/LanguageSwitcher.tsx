"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { localeNames, type Locale } from "@/i18n/routing";
import { Globe, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ variant = "light" }: { variant?: "light" | "dark" }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const switchLocale = (newLocale: Locale) => {
    try {
      const raw = localStorage.getItem("vikingo_prefs");
      const prefs = raw ? JSON.parse(raw) : {};
      localStorage.setItem(
        "vikingo_prefs",
        JSON.stringify({ ...prefs, locale: newLocale })
      );
    } catch {
      /* ignore */
    }
    router.replace(pathname, { locale: newLocale });
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all",
          variant === "dark"
            ? "text-slate-300 hover:bg-white/10"
            : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
        )}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <Globe className="h-4 w-4" />
        <span className="uppercase">{locale}</span>
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-50 mt-2 min-w-[160px] overflow-hidden rounded-xl border border-slate-200/80 bg-white py-1 shadow-xl dark:border-slate-700 dark:bg-slate-900"
        >
          {(Object.keys(localeNames) as Locale[]).map((l) => (
            <li key={l} role="option" aria-selected={l === locale}>
              <button
                type="button"
                onClick={() => switchLocale(l)}
                className={cn(
                  "flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm transition-colors hover:bg-slate-50 dark:hover:bg-slate-800",
                  l === locale && "bg-blue-50 font-semibold text-[#0066ff] dark:bg-blue-950/50"
                )}
              >
                <span className="w-6 text-xs uppercase text-slate-400">{l}</span>
                {localeNames[l]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

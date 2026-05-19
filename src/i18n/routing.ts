import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const locales = ["en", "es", "pt", "de", "fr", "it"] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales: [...locales],
  /** Primario para copy y redirección desde `/` cuando no aplica otra regla. */
  defaultLocale: "es",
  localePrefix: "always",
  localeDetection: true,
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);

export const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
  pt: "Português",
  de: "Deutsch",
  fr: "Français",
  it: "Italiano",
};

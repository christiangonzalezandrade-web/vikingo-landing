"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Globe } from "lucide-react";
import { VikingoLogo } from "./VikingoLogo";
import { ScrollLink } from "./ScrollLink";
import { CONTACT_MAILTO } from "@/lib/config";

/**
 * Item de footer “próximamente”: muestra el texto sin enlace ni `href="#"`
 * (evita saltos al top y links muertos para SEO).
 */
function ComingSoonItem({ label, comingSoonLabel }: { label: string; comingSoonLabel: string }) {
  return (
    <span
      className="inline-flex flex-wrap items-center gap-2 text-slate-500"
      title={comingSoonLabel}
    >
      {label}
      <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-400">
        {comingSoonLabel}
      </span>
    </span>
  );
}

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();
  const comingSoon = t("comingSoon");

  return (
    <footer className="border-t border-slate-200/60 bg-[#0a1628] text-slate-300 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="inline-flex shrink-0 py-1">
              <VikingoLogo size="md" variant="inverse" />
            </Link>
            <p className="mt-4 text-sm text-slate-400">{t("tagline")}</p>
            <p className="mt-4 flex items-center gap-2 text-sm text-[#00d4ff]">
              <Globe className="h-4 w-4" />
              {t("international")}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white">{t("product")}</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <ScrollLink href="#solutions" className="hover:text-white">
                  {t("links.solutions")}
                </ScrollLink>
              </li>
              <li>
                <ScrollLink href="#pricing" className="hover:text-white">
                  {t("links.pricing")}
                </ScrollLink>
              </li>
              <li>
                <ComingSoonItem label={t("links.docs")} comingSoonLabel={comingSoon} />
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white">{t("company")}</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <ComingSoonItem label={t("links.about")} comingSoonLabel={comingSoon} />
              </li>
              <li>
                <ScrollLink href="#careers" className="hover:text-white">
                  {t("links.careers")}
                </ScrollLink>
              </li>
              <li>
                <a href={CONTACT_MAILTO} className="hover:text-white">
                  {t("links.contact")}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white">{t("legal")}</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <ComingSoonItem label={t("links.privacy")} comingSoonLabel={comingSoon} />
              </li>
              <li>
                <ComingSoonItem label={t("links.terms")} comingSoonLabel={comingSoon} />
              </li>
              <li>
                <ComingSoonItem label={t("links.support")} comingSoonLabel={comingSoon} />
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © {year} Vikingo. {t("rights")}
            {process.env.NEXT_PUBLIC_BUILD_ID ? (
              <span
                className="mt-1 block font-mono text-[11px] text-emerald-400"
                title="Si no ves este número, estás en una versión antigua"
              >
                v {process.env.NEXT_PUBLIC_BUILD_ID}
              </span>
            ) : null}
          </p>
          <LanguageSwitcher variant="dark" />
        </div>
      </div>
    </footer>
  );
}

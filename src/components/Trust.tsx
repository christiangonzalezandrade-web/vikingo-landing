"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

/** Logos en `public/payments/` — espaciado con flex `gap`. */
const PAYMENT_LOGOS = [
  { src: "/payments/visa.png", alt: "Visa" },
  { src: "/payments/mastercard.png", alt: "Mastercard", tall: true },
  { src: "/payments/redcompra.png", alt: "Redcompra" },
  { src: "/payments/bancoestado.png", alt: "BancoEstado", wide: true },
  { src: "/payments/google-pay.png", alt: "Google Pay" },
  { src: "/payments/apple-pay.png", alt: "Apple Pay" },
  { src: "/payments/samsung-pay.png", alt: "Samsung Pay" },
  { src: "/payments/contactless.png", alt: "Contactless" },
  { src: "/payments/amex.png", alt: "American Express" },
] as const;

export function Trust() {
  const t = useTranslations("trust");

  const metrics = [
    t("metrics.uptime"),
    t("metrics.coverage"),
    t("metrics.multinational"),
  ];

  return (
    <section className="border-y border-slate-200/60 bg-white py-16 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-medium text-[#0066ff]">{t("paymentsLabel")}</p>
        <ul
          className="mt-10 flex list-none flex-wrap items-end justify-center gap-x-8 gap-y-6 px-2 sm:gap-x-10 md:gap-x-14 lg:gap-x-16"
          aria-label={t("paymentsLabel")}
        >
          {PAYMENT_LOGOS.map((logo) => (
            <li key={logo.src} className="flex shrink-0 items-end justify-center">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={160}
                height={56}
                sizes="(max-width: 640px) 100px, 140px"
                className={
                  "tall" in logo && logo.tall
                    ? "h-10 w-auto max-w-[9rem] object-contain object-bottom sm:h-11 md:h-12"
                    : "wide" in logo && logo.wide
                      ? "h-9 w-auto max-w-[9.5rem] object-contain object-bottom sm:h-10 md:h-11"
                      : "h-8 w-auto max-w-[7.5rem] object-contain object-bottom sm:h-9 md:h-10"
                }
                loading="lazy"
              />
            </li>
          ))}
        </ul>
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {metrics.map((m) => (
            <div
              key={m}
              className="rounded-2xl border border-slate-200/60 bg-slate-50/50 py-6 text-center dark:border-slate-800 dark:bg-slate-900/50"
            >
              <p className="text-lg font-bold text-[#0066ff] md:text-xl">{m}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

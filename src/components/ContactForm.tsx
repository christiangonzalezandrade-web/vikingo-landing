"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Send, MessageCircle, CheckCircle2 } from "lucide-react";
import { countries } from "@/lib/countries";
import { WHATSAPP_NUMBER } from "@/lib/config";
import type { Locale } from "@/i18n/routing";

export function ContactForm() {
  const t = useTranslations("contact");
  const tWa = useTranslations("whatsapp");
  const locale = useLocale() as Locale;
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSent(true);
  };

  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(tWa("message"))}`;

  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-sm font-medium uppercase tracking-widest text-[#0066ff]">
            {t("badge")}
          </span>
          <h2 className="mt-4 text-3xl font-bold text-[#0a1628] sm:text-4xl dark:text-white">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">{t("subtitle")}</p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-10 lg:grid-cols-5">
          <div
            className="lg:col-span-3"
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50 p-12 text-center dark:border-emerald-900 dark:bg-emerald-950/30">
                <CheckCircle2 className="h-14 w-14 text-emerald-500" />
                <p className="mt-4 text-lg font-semibold text-emerald-800 dark:text-emerald-300">
                  {t("success")}
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5 rounded-2xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-blue-500/5 dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">{t("name")}</label>
                    <input
                      required
                      name="name"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#0066ff] dark:border-slate-700 dark:bg-slate-800"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">{t("email")}</label>
                    <input
                      required
                      type="email"
                      name="email"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#0066ff] dark:border-slate-700 dark:bg-slate-800"
                    />
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">{t("company")}</label>
                    <input
                      required
                      name="company"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#0066ff] dark:border-slate-700 dark:bg-slate-800"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">{t("country")}</label>
                    <select
                      name="country"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#0066ff] dark:border-slate-700 dark:bg-slate-800"
                    >
                      {countries.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.flag} {c.name[locale] ?? c.name.en}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">{t("phone")}</label>
                    <input
                      name="phone"
                      type="tel"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#0066ff] dark:border-slate-700 dark:bg-slate-800"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">{t("machines")}</label>
                    <select
                      name="machines"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#0066ff] dark:border-slate-700 dark:bg-slate-800"
                    >
                      <option>1–25</option>
                      <option>26–100</option>
                      <option>101–500</option>
                      <option>500+</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">{t("message")}</label>
                  <textarea
                    required
                    name="message"
                    rows={4}
                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#0066ff] dark:border-slate-700 dark:bg-slate-800"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl gradient-bg py-4 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:opacity-90 disabled:opacity-60"
                >
                  <Send className="h-4 w-4" />
                  {loading ? "..." : t("submit")}
                </button>
              </form>
            )}
          </div>

          <div
            className="flex flex-col justify-center lg:col-span-2"
          >
            <div className="rounded-2xl border border-slate-200/80 bg-gradient-to-br from-[#0a1628] to-[#1a3683] p-8 text-white dark:border-slate-700">
              <p className="text-sm text-slate-300">{t("or")}</p>
              <h3 className="mt-2 text-xl font-bold">{t("whatsapp")}</h3>
              <p className="mt-3 text-sm text-slate-400">{t("whatsappHint")}</p>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#20bd5a]"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

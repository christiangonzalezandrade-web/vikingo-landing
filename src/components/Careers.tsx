"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Rocket,
  CheckCircle2,
  Send,
  Sparkles,
  Code2,
} from "lucide-react";

export function Careers() {
  const t = useTranslations("careers");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const areas = t.raw("areas") as string[];
  const values = t.raw("values") as string[];
  const examples = t.raw("examples") as string[];
  const understand = t.raw("understand") as string[];
  const technologies = t.raw("technologies") as string[];
  const attach = t.raw("attach") as string[];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSent(true);
  };

  return (
    <section id="careers" className="relative scroll-mt-28 overflow-hidden py-24">
      <div
        className="absolute inset-0 bg-gradient-to-b from-blue-50/80 via-white to-white dark:from-slate-950 dark:via-slate-950 dark:to-slate-900"
        aria-hidden
      />
      <div
        className="absolute top-0 right-0 h-96 w-96 rounded-full bg-[#0066ff]/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50/80 px-4 py-1.5 text-sm font-medium text-[#0066ff] dark:border-blue-800 dark:bg-blue-950/50">
            <Sparkles className="h-3.5 w-3.5" />
            {t("badge")}
          </span>
          <h2 className="mt-6 text-3xl font-bold text-[#0a1628] sm:text-4xl md:text-5xl dark:text-white">
            {t("title")}
          </h2>
        </div>

        <div
          className="prose prose-slate mx-auto mt-10 max-w-none dark:prose-invert"
        >
          <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-400">{t("intro1")}</p>
          <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400">{t("intro2")}</p>
        </div>

        <div
          className="mt-12 rounded-2xl border border-slate-200/80 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-900"
        >
          <h3 className="flex items-center gap-2 text-xl font-bold text-[#0a1628] dark:text-white">
            <Code2 className="h-5 w-5 text-[#0066ff]" />
            {t("recruitingTitle")}
          </h3>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {areas.map((area) => (
              <li
                key={area}
                className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#0066ff]" />
                {area}
              </li>
            ))}
          </ul>
        </div>

        <div
          className="mt-10"
        >
          <h3 className="text-xl font-bold text-[#0a1628] dark:text-white">{t("whatWeLookForTitle")}</h3>
          <p className="mt-3 text-slate-600 dark:text-slate-400">{t("whatWeLookForIntro")}</p>
          <ul className="mt-4 space-y-2">
            {values.map((v) => (
              <li key={v} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0066ff]" />
                {v}
              </li>
            ))}
          </ul>
        </div>

        <div
          className="mt-10 rounded-2xl border border-[#0066ff]/20 bg-blue-50/50 p-8 dark:border-blue-900 dark:bg-blue-950/30"
        >
          <h3 className="text-xl font-bold text-[#0a1628] dark:text-white">{t("advantageTitle")}</h3>
          <p className="mt-3 text-slate-600 dark:text-slate-400">{t("advantageIntro")}</p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {examples.map((ex) => (
              <li key={ex} className="text-sm text-slate-600 dark:text-slate-400">
                · {ex}
              </li>
            ))}
          </ul>
          <p className="mt-6 font-medium text-[#0a1628] dark:text-white">{t("understandTitle")}</p>
          <ul className="mt-3 space-y-2">
            {understand.map((q) => (
              <li key={q} className="text-sm font-medium text-[#0066ff]">
                {q}
              </li>
            ))}
          </ul>
        </div>

        <div
          className="mt-10"
        >
          <h3 className="text-xl font-bold text-[#0a1628] dark:text-white">{t("techTitle")}</h3>
          <p className="mt-3 text-slate-600 dark:text-slate-400">{t("techIntro")}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-slate-200/80 bg-white px-3 py-1.5 font-mono text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div
          className="mt-10 text-center"
        >
          <h3 className="flex items-center justify-center gap-2 text-2xl font-bold text-[#0a1628] dark:text-white">
            <Rocket className="h-6 w-6 text-[#0066ff]" />
            {t("buildTitle")}
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">{t("buildText")}</p>
        </div>

        <div
          className="mt-14"
        >
          <h3 className="text-xl font-bold text-[#0a1628] dark:text-white">{t("formTitle")}</h3>
          <p className="mt-2 text-sm text-slate-500">{t("formSubtitle")}</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {attach.map((item) => (
              <span
                key={item}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-400"
              >
                {item}
              </span>
            ))}
          </ul>

          {sent ? (
            <div className="mt-8 flex flex-col items-center rounded-2xl border border-emerald-200 bg-emerald-50 p-12 dark:border-emerald-900 dark:bg-emerald-950/30">
              <CheckCircle2 className="h-14 w-14 text-emerald-500" />
              <p className="mt-4 text-lg font-semibold text-emerald-800 dark:text-emerald-300">
                {t("formSuccess")}
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5 rounded-2xl border border-slate-200/80 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">{t("form.name")}</label>
                  <input required name="name" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#0066ff] dark:border-slate-700 dark:bg-slate-800" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">{t("form.email")}</label>
                  <input required type="email" name="email" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#0066ff] dark:border-slate-700 dark:bg-slate-800" />
                </div>
            </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">{t("form.linkedin")}</label>
                  <input name="linkedin" type="url" placeholder="https://linkedin.com/in/..." className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#0066ff] dark:border-slate-700 dark:bg-slate-800" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">{t("form.portfolio")}</label>
                  <input name="portfolio" type="url" placeholder="GitHub / portfolio" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#0066ff] dark:border-slate-700 dark:bg-slate-800" />
                </div>
            </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">{t("form.technologies")}</label>
                  <input required name="technologies" placeholder="Python, React, AWS..." className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#0066ff] dark:border-slate-700 dark:bg-slate-800" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">{t("form.experience")}</label>
                  <select name="experience" required className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#0066ff] dark:border-slate-700 dark:bg-slate-800">
                    <option value="junior">{t("form.expJunior")}</option>
                    <option value="mid">{t("form.expMid")}</option>
                    <option value="senior">{t("form.expSenior")}</option>
                    <option value="lead">{t("form.expLead")}</option>
                  </select>
                </div>
            </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">{t("form.salary")}</label>
                  <input name="salary" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#0066ff] dark:border-slate-700 dark:bg-slate-800" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">{t("form.availability")}</label>
                  <input name="availability" className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#0066ff] dark:border-slate-700 dark:bg-slate-800" />
                </div>
            </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">{t("form.differentiator")}</label>
                <textarea
                  required
                  name="differentiator"
                  rows={5}
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#0066ff] dark:border-slate-700 dark:bg-slate-800"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">{t("form.cv")}</label>
                <input
                  type="file"
                  name="cv"
                  accept=".pdf,.doc,.docx"
                  className="w-full rounded-xl border border-dashed border-slate-300 px-4 py-3 text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-[#0066ff] file:px-4 file:py-2 file:text-sm file:font-medium file:text-white dark:border-slate-600"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl gradient-bg py-4 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:opacity-90 disabled:opacity-60"
              >
                <Send className="h-4 w-4" />
                {loading ? "..." : t("form.submit")}
              </button>
            </form>
          )}

          <p className="mt-8 text-center text-lg font-semibold text-[#0a1628] dark:text-white">
            {t("closing1")}
          </p>
          <p className="mt-2 text-center text-[#0066ff]">{t("closing2")}</p>
        </div>
            </div>
    </section>
  );
}

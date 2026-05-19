"use client";

import { Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { CONTACT_MAILTO } from "@/lib/config";

type ComparisonRow = {
  id: string;
  label: string;
  launch: string;
  scale: string;
  enterprise: string;
};

function CellContent({ rowId, value }: { rowId: string; value: string }) {
  const v = value.trim();
  if (v === "✅" || v === "yes") {
    return (
      <span
        className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#0066ff]/12 text-[#0066ff] ring-1 ring-inset ring-[#0066ff]/25 dark:bg-[#0066ff]/20 dark:text-[#3d8bff] dark:ring-[#3d8bff]/30"
        title="Incluido"
        aria-label="Incluido"
      >
        <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
      </span>
    );
  }
  if (v === "—" || v === "–" || v === "-" || v === "no") {
    return <span className="text-slate-400 dark:text-slate-500">—</span>;
  }
  if (rowId === "saasPrice") {
    const sep = " / ";
    const i = v.indexOf(sep);
    if (i > 0) {
      const main = v.slice(0, i);
      const suffix = v.slice(i);
      return (
        <span className="text-sm leading-snug text-slate-800 dark:text-slate-100">
          <strong className="font-bold text-[#0a1628] dark:text-white">{main}</strong>
          <span className="font-medium">{suffix}</span>
        </span>
      );
    }
  }
  return <span className="text-sm leading-snug text-slate-700 dark:text-slate-200">{value}</span>;
}

export function Pricing() {
  const t = useTranslations("pricing");
  const rawRows = t.raw("comparison.rows");
  const rows = Array.isArray(rawRows) ? (rawRows as ComparisonRow[]) : [];
  const rawCtas = t.raw("comparison.ctas");
  const ctas =
    rawCtas && typeof rawCtas === "object" && "launch" in rawCtas
      ? (rawCtas as { launch: string; scale: string; enterprise: string })
      : { launch: "", scale: "", enterprise: "" };

  return (
    <section id="pricing" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-medium uppercase tracking-widest text-[#0066ff]">{t("badge")}</span>
          <h2 className="mt-4 text-3xl font-bold text-[#0a1628] sm:text-4xl dark:text-white">{t("title")}</h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">{t("subtitle")}</p>
        </div>

        <div className="mt-12 overflow-x-auto rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 dark:border-slate-800 dark:bg-slate-800/50">
                <th
                  className="sticky left-0 z-10 min-w-[168px] bg-slate-50/95 px-4 py-4 font-semibold text-slate-900 backdrop-blur-sm dark:bg-slate-900/95 dark:text-white sm:min-w-[220px] sm:px-5"
                  scope="col"
                  aria-label={t("comparison.featureColumnA11y")}
                >
                  <span aria-hidden>{t("comparison.featureColumn").trim() || "\u00a0"}</span>
                </th>
                <th className="px-3 py-5 text-center text-xl font-bold tracking-tight text-[#0066ff] sm:px-4 sm:text-2xl">
                  {t("comparison.headers.launch")}
                </th>
                <th className="relative px-3 py-5 text-center text-xl font-bold tracking-tight text-[#0066ff] sm:px-4 sm:text-2xl">
                  <span className="inline-flex flex-wrap items-baseline justify-center gap-x-2 gap-y-0">
                    <span>{t("comparison.headers.scale")}</span>
                    <span className="text-xs font-normal italic text-slate-600 dark:text-slate-400">
                      ({t("comparison.headers.scaleBadge")})
                    </span>
                  </span>
                </th>
                <th className="px-3 py-5 text-center text-xl font-bold tracking-tight text-[#0066ff] sm:px-4 sm:text-2xl">
                  {t("comparison.headers.enterprise")}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr
                  key={row.id}
                  className={cn(
                    "border-b border-slate-100 dark:border-slate-800/80",
                    idx % 2 === 1 && "bg-slate-50/40 dark:bg-slate-800/20"
                  )}
                >
                  <th
                    scope="row"
                    className="sticky left-0 z-10 bg-white/95 px-4 py-3.5 font-semibold text-slate-900 backdrop-blur-sm dark:bg-slate-900/95 dark:text-slate-100 sm:px-5"
                  >
                    {row.label}
                  </th>
                  <td
                    className={cn(
                      "px-3 py-3.5 text-center align-middle sm:px-4",
                      row.id === "transactionFee" && "font-semibold text-[#0a1628] dark:text-slate-100"
                    )}
                  >
                    <CellContent rowId={row.id} value={row.launch} />
                  </td>
                  <td
                    className={cn(
                      "bg-blue-50/25 px-3 py-3.5 text-center align-middle dark:bg-blue-950/20 sm:px-4",
                      row.id === "transactionFee" && "font-semibold text-[#0a1628] dark:text-slate-100"
                    )}
                  >
                    <CellContent rowId={row.id} value={row.scale} />
                  </td>
                  <td
                    className={cn(
                      "px-3 py-3.5 text-center align-middle sm:px-4",
                      row.id === "transactionFee" && "font-semibold text-[#0a1628] dark:text-slate-100"
                    )}
                  >
                    <CellContent rowId={row.id} value={row.enterprise} />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-slate-200 bg-slate-50/90 dark:border-slate-700 dark:bg-slate-800/40">
                <th
                  scope="row"
                  className="sticky left-0 bg-slate-50/95 px-4 py-4 text-left font-bold text-slate-900 backdrop-blur-sm dark:bg-slate-900/95 dark:text-white sm:px-5"
                >
                  {t("comparison.ctaRowLabel")}
                </th>
                <td className="px-3 py-4 text-center sm:px-4">
                  <a
                    href={CONTACT_MAILTO}
                    className="inline-block rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-900 transition hover:border-[#0066ff] hover:text-[#0066ff] dark:border-slate-600 dark:text-white dark:hover:border-[#0066ff]"
                  >
                    {ctas.launch}
                  </a>
                </td>
                <td className="bg-blue-50/35 px-3 py-4 text-center dark:bg-blue-950/25 sm:px-4">
                  <a
                    href={CONTACT_MAILTO}
                    className="inline-block rounded-xl bg-gradient-to-r from-[#0066ff] to-[#00d4ff] px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-500/25 transition hover:opacity-95"
                  >
                    {ctas.scale}
                  </a>
                </td>
                <td className="px-3 py-4 text-center sm:px-4">
                  <a
                    href={CONTACT_MAILTO}
                    className="inline-block rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-900 transition hover:border-[#0066ff] hover:text-[#0066ff] dark:border-slate-600 dark:text-white dark:hover:border-[#0066ff]"
                  >
                    {ctas.enterprise}
                  </a>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  );
}

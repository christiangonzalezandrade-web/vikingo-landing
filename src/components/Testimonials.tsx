import { getTranslations } from "next-intl/server";
import { Quote } from "lucide-react";
import type { Locale } from "@/i18n/routing";

type Testimonial = { quote: string; author: string; role: string; country: string };

/** Servidor: el HTML incluye citas y nombres sin depender del bundle cliente. */
export async function Testimonials({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "testimonials" });
  const items = t.raw("items") as Testimonial[];

  return (
    <section className="border-y border-slate-200/60 bg-slate-50 py-24 dark:border-slate-800 dark:bg-slate-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-medium uppercase tracking-widest text-[#0066ff]">
            {t("badge")}
          </span>
          <h2 className="mt-4 text-3xl font-bold text-[#0a1628] sm:text-4xl dark:text-white">
            {t("title")}
          </h2>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.author}
              className="rounded-2xl border border-slate-200/60 bg-white p-8 dark:border-slate-800 dark:bg-slate-900"
            >
              <Quote className="h-8 w-8 text-[#0066ff]/30" />
              <p className="mt-4 text-slate-700 dark:text-slate-300">&ldquo;{item.quote}&rdquo;</p>
              <div className="mt-6 border-t border-slate-200 pt-6 dark:border-slate-700">
                <p className="font-semibold">{item.author}</p>
                <p className="text-sm text-slate-500">{item.role}</p>
                <p className="text-xs text-[#0066ff]">{item.country}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

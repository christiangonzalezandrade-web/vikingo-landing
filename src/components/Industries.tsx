"use client";

import { useTranslations } from "next-intl";
import {
  Coffee,
  Gamepad2,
  ShoppingBag,
  Store,
  UtensilsCrossed,
  ParkingCircle,
  LayoutGrid,
  Shirt,
} from "lucide-react";

const icons = [
  UtensilsCrossed,
  Coffee,
  ParkingCircle,
  LayoutGrid,
  Shirt,
  Gamepad2,
  Store,
  ShoppingBag,
  Store,
];

export function Industries() {
  const t = useTranslations("industries");
  const items = t.raw("items") as string[];

  return (
    <section id="industries" className="section-dark py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-sm font-medium uppercase tracking-widest text-[#00d4ff]">
            {t("badge")}
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl md:text-5xl">{t("title")}</h2>
        </div>
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((label, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div
                key={label}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition hover:-translate-y-1 hover:border-[#0066ff]/40 hover:bg-white/10"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0066ff]/20 text-[#00d4ff]">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="font-medium">{label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

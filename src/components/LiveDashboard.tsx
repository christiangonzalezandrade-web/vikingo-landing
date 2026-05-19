"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Activity, AlertTriangle, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const salesData = [
  { time: "00:00", revenue: 4200 },
  { time: "04:00", revenue: 2800 },
  { time: "08:00", revenue: 8900 },
  { time: "12:00", revenue: 12400 },
  { time: "16:00", revenue: 10200 },
  { time: "20:00", revenue: 7600 },
];

const countryData = [
  { country: "US", revenue: 84 },
  { country: "DE", revenue: 62 },
  { country: "ES", revenue: 48 },
  { country: "BR", revenue: 55 },
  { country: "UK", revenue: 71 },
];

const tabs = ["sales", "machines", "inventory", "routes", "global"] as const;

export function LiveDashboard() {
  const t = useTranslations("dashboard");
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("sales");
  /** Recharts ResponsiveContainer mide el padre; en SSR/prerender suele ser 0×0 y dispara width/height -1 (carga lenta o warnings). */
  const [chartsReady, setChartsReady] = useState(false);
  useEffect(() => {
    queueMicrotask(() => setChartsReady(true));
  }, []);

  return (
    <section id="platform" className="py-24">
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

        <div
          className="mt-12 overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex items-center gap-2 border-b border-slate-200/60 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-amber-400" />
            <div className="h-3 w-3 rounded-full bg-green-400" />
            <span className="ml-2 text-sm font-medium">Vikingo OS</span>
            <span className="ml-auto flex items-center gap-1 text-xs text-emerald-500">
              <Activity className="h-3 w-3" />
              Live
            </span>
          </div>

          <div className="flex flex-wrap gap-1 border-b border-slate-200/60 p-2 dark:border-slate-800">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "rounded-lg px-4 py-2 text-sm font-medium transition",
                  activeTab === tab
                    ? "bg-[#0066ff] text-white"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                )}
              >
                {t(`tabs.${tab}`)}
              </button>
            ))}
          </div>

          <div className="grid gap-6 p-6 lg:grid-cols-3">
            <div className="min-w-0 lg:col-span-2">
              <p className="mb-4 text-sm font-medium text-slate-500">Revenue (24h)</p>
              <div className="h-64 w-full min-w-0">
                {chartsReady ? (
                  <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                    <AreaChart data={salesData}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0066ff" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#0066ff" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="time" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#0066ff"
                        fill="url(#colorRevenue)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full w-full rounded-lg bg-slate-100/90 dark:bg-slate-800/60" aria-hidden />
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-slate-200/60 p-4 dark:border-slate-700">
                <p className="text-sm text-slate-500">Machines online</p>
                <p className="text-3xl font-bold text-emerald-500">9,847</p>
                <p className="text-xs text-slate-400">98.4% uptime</p>
              </div>
              <div className="rounded-xl border border-amber-200/60 bg-amber-50/50 p-4 dark:border-amber-900 dark:bg-amber-950/20">
                <div className="flex items-center gap-2 text-amber-600">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm font-medium">{t("alerts.lowStock")}</span>
                </div>
                <p className="mt-1 text-xs text-slate-500">Machine #2847 — Berlin</p>
              </div>
              <div className="min-w-0 rounded-xl border border-slate-200/60 p-4 dark:border-slate-700">
                <p className="mb-2 text-sm font-medium">Revenue by country</p>
                <div className="h-32 w-full min-w-0">
                  {chartsReady ? (
                    <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                      <BarChart data={countryData} layout="vertical">
                        <XAxis type="number" hide />
                        <YAxis dataKey="country" type="category" width={30} tick={{ fontSize: 11 }} />
                        <Bar dataKey="revenue" fill="#0066ff" radius={4} />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full w-full rounded-lg bg-slate-100/90 dark:bg-slate-800/60" aria-hidden />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200/60 px-6 py-4 dark:border-slate-800">
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="flex items-center gap-1 text-emerald-500">
                <MapPin className="h-4 w-4" />
                {t("alerts.machineOnline")}: São Paulo #102
              </span>
              <span className="text-slate-400">|</span>
              <span>{t("alerts.paymentSuccess")}: €12.50</span>
              <span className="text-slate-400">|</span>
              <span>USD · EUR · GBP · BRL</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

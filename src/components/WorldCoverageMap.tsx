"use client";

import { useState } from "react";
import { geoEqualEarth, geoPath } from "d3-geo";
import type { Feature, FeatureCollection, Geometry } from "geojson";
import { useLocale, useTranslations } from "next-intl";
import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";
import countries110m from "world-atlas/countries-110m.json";
import { numericIdToIso } from "@/lib/country-numeric-ids";
import {
  marketNamesEs,
  resolveMarketIso,
  sumupMarketsByRegion,
  type SumupMarketCode,
} from "@/lib/sumup-markets";

type RegionKey = keyof typeof sumupMarketsByRegion;

const MAP_W = 900;
const MAP_H = 460;

function readIso(geo: { id?: string | number; properties?: Record<string, unknown> }): string | null {
  const id = geo.id != null ? String(geo.id) : "";
  const fromNumeric = numericIdToIso[id];
  if (fromNumeric) return resolveMarketIso(fromNumeric);
  return null;
}

const worldTopology = countries110m as unknown as Topology;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const worldFeatures = feature(worldTopology, (worldTopology.objects as any).countries) as FeatureCollection<Geometry>;

type PreparedPath = {
  key: string;
  d: string;
  iso: string | null;
  active: boolean;
};

function buildPaths(): PreparedPath[] {
  const projection = geoEqualEarth()
    .scale(160)
    .center([12, 4])
    .translate([MAP_W / 2, MAP_H / 2]);
  const path = geoPath(projection);

  return worldFeatures.features
    .map((feat, index) => {
      const f = feat as Feature<Geometry>;
      const iso = readIso({
        id: f.id as string | number | undefined,
        properties: (f.properties ?? undefined) as Record<string, unknown> | undefined,
      });
      const d = path(f);
      if (!d) return null;
      return {
        key: f.id != null ? `geo-${String(f.id)}` : `geo-${index}`,
        d,
        iso,
        active: iso !== null,
      };
    })
    .filter((x): x is PreparedPath => x !== null);
}

const preparedPaths = buildPaths();

export function WorldCoverageMap() {
  const t = useTranslations("global");
  const locale = useLocale();
  const [hovered, setHovered] = useState<string | null>(null);

  const nameFor = (code: SumupMarketCode) => {
    if (locale === "es" && marketNamesEs[code]) return marketNamesEs[code];
    return marketNamesEs[code] ?? code;
  };

  const regions: { key: RegionKey; codes: readonly SumupMarketCode[] }[] = [
    { key: "europe", codes: sumupMarketsByRegion.europe },
    { key: "americas", codes: sumupMarketsByRegion.americas },
    { key: "oceania", codes: sumupMarketsByRegion.oceania },
  ];

  return (
    <div className="relative mx-auto mt-16 max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[#0a1628]/40 p-4 backdrop-blur-sm sm:p-6">
      <h3 className="text-center text-sm font-semibold text-[#00d4ff]">{t("mapTitle")}</h3>
      <p className="mt-1 text-center text-xs text-slate-400">{t("mapLegend")}</p>

      <div className="relative mx-auto mt-4 min-h-[280px] w-full max-w-4xl sm:min-h-[320px] [&_svg]:mx-auto [&_svg]:block [&_svg]:h-auto [&_svg]:max-h-[460px] [&_svg]:w-full">
        <svg
          viewBox={`0 0 ${MAP_W} ${MAP_H}`}
          className="rsm-svg max-h-[460px] w-full text-slate-400"
          role="img"
          aria-label={t("mapTitle")}
        >
          <g className="rsm-geographies">
            {preparedPaths.map(({ key, d, iso, active }) => {
              const isHover = iso !== null && hovered === iso;
              const fill = !active ? "#243b53" : isHover ? "#3d8bff" : "#0066ff";
              return (
                <path
                  key={key}
                  d={d}
                  className="rsm-geography outline-none"
                  style={{
                    fill,
                    stroke: "#0f172a",
                    strokeWidth: 0.4,
                    cursor: active ? "pointer" : "default",
                  }}
                  onMouseEnter={() => active && iso && setHovered(iso)}
                  onMouseLeave={() => setHovered(null)}
                />
              );
            })}
          </g>
        </svg>

        {hovered && (
          <div className="pointer-events-none absolute bottom-2 left-1/2 z-10 -translate-x-1/2 rounded-lg border border-white/10 bg-[#0a1628]/95 px-4 py-2 text-sm font-medium text-white shadow-xl">
            {nameFor(hovered as SumupMarketCode)}
          </div>
        )}
      </div>

      <div className="mt-6 grid gap-6 border-t border-white/10 pt-6 sm:grid-cols-3">
        {regions.map(({ key, codes }) => (
          <div key={key}>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#00d4ff]">
              {t(`regions.${key}`)}
            </p>
            <ul className="flex flex-wrap gap-1.5">
              {codes.map((code) => (
                <li
                  key={code}
                  className="rounded-md border border-[#0066ff]/30 bg-[#0066ff]/20 px-2 py-0.5 text-[11px] text-slate-100"
                >
                  {nameFor(code)}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-slate-500">{t("anyCountry")}</p>
    </div>
  );
}

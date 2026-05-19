/** Mercados SumUp — ISO 3166-1 alpha-2 */
export const sumupMarketsByRegion = {
  europe: [
    "DE", "AT", "BE", "BG", "CY", "HR", "DK", "SK", "SI", "ES", "EE", "FI", "FR",
    "GR", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NO", "NL", "PL", "PT", "GB",
    "CZ", "RO", "SE", "CH",
  ],
  americas: ["BR", "CA", "CL", "CO", "US", "MX", "PE"],
  oceania: ["AU"],
} as const;

export const sumupMarketCodes = [
  ...sumupMarketsByRegion.europe,
  ...sumupMarketsByRegion.americas,
  ...sumupMarketsByRegion.oceania,
] as const;

export type SumupMarketCode = (typeof sumupMarketCodes)[number];

export const sumupMarketSet = new Set<string>(sumupMarketCodes);

/** world-atlas / Natural Earth a veces usan códigos distintos */
export const isoAliases: Record<string, string> = {
  UK: "GB",
};

/** Nombres en español (SumUp) */
export const marketNamesEs: Record<SumupMarketCode, string> = {
  DE: "Alemania", AT: "Austria", BE: "Bélgica", BG: "Bulgaria", CY: "Chipre",
  HR: "Croacia", DK: "Dinamarca", SK: "Eslovaquia", SI: "Eslovenia", ES: "España",
  EE: "Estonia", FI: "Finlandia", FR: "Francia", GR: "Grecia", HU: "Hungría",
  IE: "Irlanda", IT: "Italia", LV: "Letonia", LT: "Lituania", LU: "Luxemburgo",
  MT: "Malta", NO: "Noruega", NL: "Países Bajos", PL: "Polonia", PT: "Portugal",
  GB: "Reino Unido", CZ: "República Checa", RO: "Rumania", SE: "Suecia", CH: "Suiza",
  BR: "Brasil", CA: "Canadá", CL: "Chile", CO: "Colombia", US: "Estados Unidos",
  MX: "México", PE: "Perú", AU: "Australia",
};

export function resolveMarketIso(iso: string | undefined): string | null {
  if (!iso) return null;
  const upper = iso.toUpperCase();
  const normalized = isoAliases[upper] ?? upper;
  return sumupMarketSet.has(normalized) ? normalized : null;
}

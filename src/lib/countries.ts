export const countries = [
  { code: "CL", flag: "🇨🇱", name: { en: "Chile", es: "Chile", pt: "Chile", de: "Chile", fr: "Chili", it: "Cile" } },
  { code: "US", flag: "🇺🇸", name: { en: "United States", es: "Estados Unidos", pt: "Estados Unidos", de: "USA", fr: "États-Unis", it: "Stati Uniti" } },
  { code: "ES", flag: "🇪🇸", name: { en: "Spain", es: "España", pt: "Espanha", de: "Spanien", fr: "Espagne", it: "Spagna" } },
  { code: "BR", flag: "🇧🇷", name: { en: "Brazil", es: "Brasil", pt: "Brasil", de: "Brasilien", fr: "Brésil", it: "Brasile" } },
  { code: "DE", flag: "🇩🇪", name: { en: "Germany", es: "Alemania", pt: "Alemanha", de: "Deutschland", fr: "Allemagne", it: "Germania" } },
  { code: "FR", flag: "🇫🇷", name: { en: "France", es: "Francia", pt: "França", de: "Frankreich", fr: "France", it: "Francia" } },
  { code: "IT", flag: "🇮🇹", name: { en: "Italy", es: "Italia", pt: "Itália", de: "Italien", fr: "Italie", it: "Italia" } },
  { code: "GB", flag: "🇬🇧", name: { en: "United Kingdom", es: "Reino Unido", pt: "Reino Unido", de: "UK", fr: "Royaume-Uni", it: "Regno Unito" } },
  { code: "MX", flag: "🇲🇽", name: { en: "Mexico", es: "México", pt: "México", de: "Mexiko", fr: "Mexique", it: "Messico" } },
  { code: "PT", flag: "🇵🇹", name: { en: "Portugal", es: "Portugal", pt: "Portugal", de: "Portugal", fr: "Portugal", it: "Portogallo" } },
  { code: "CA", flag: "🇨🇦", name: { en: "Canada", es: "Canadá", pt: "Canadá", de: "Kanada", fr: "Canada", it: "Canada" } },
  { code: "AU", flag: "🇦🇺", name: { en: "Australia", es: "Australia", pt: "Austrália", de: "Australien", fr: "Australie", it: "Australia" } },
] as const;

export type CountryCode = (typeof countries)[number]["code"];

export const CHILE_CODE: CountryCode = "CL";

export { sumupMarketCodes as sumUpCountries } from "./sumup-markets";

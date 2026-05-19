#!/usr/bin/env node
/**
 * Tras `next build`, comprueba que el HTML prerenderizado de /es incluye
 * los textos críticos definidos en messages/es.json (hero + testimonio 1).
 * Si falla, el artefacto no refleja los JSON y no debes desplegar.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
const messagesPath = join(root, "messages", "es.json");
const htmlPath = join(root, ".next", "server", "app", "es.html");

if (!existsSync(htmlPath)) {
  console.error("verify-landing-copy: falta .next/server/app/es.html — ejecuta antes: npm run build");
  process.exit(1);
}

const messages = JSON.parse(readFileSync(messagesPath, "utf8"));
const html = readFileSync(htmlPath, "utf8");

const heroTitle = messages?.hero?.title;
if (typeof heroTitle !== "string" || !heroTitle.trim()) {
  console.error("verify-landing-copy: messages/es.json → hero.title inválido");
  process.exit(1);
}

const obsoleteHero = "Transforma el comercio autónomo en todo el mundo";
if (html.includes(obsoleteHero)) {
  console.error("verify-landing-copy: FALLO — titular antiguo del hero aún en HTML.");
  process.exit(1);
}

if (!html.includes(heroTitle)) {
  console.error("verify-landing-copy: FALLO — hero.title no está en es.html:", JSON.stringify(heroTitle));
  process.exit(1);
}

const testimonialAuthor = messages?.testimonials?.items?.[0]?.author;
if (typeof testimonialAuthor !== "string" || !testimonialAuthor.trim()) {
  console.error("verify-landing-copy: messages/es.json → testimonials.items[0].author inválido");
  process.exit(1);
}

if (!html.includes(testimonialAuthor)) {
  console.error(
    "verify-landing-copy: FALLO — autor del primer testimonio no está en es.html:",
    JSON.stringify(testimonialAuthor)
  );
  process.exit(1);
}

if (html.includes("Marco R.") || html.includes("EuroVend Group")) {
  console.error(
    "verify-landing-copy: FALLO — el HTML aún contiene datos viejos del testimonio (Marco R. / EuroVend)."
  );
  process.exit(1);
}

console.log("verify-landing-copy: OK");
console.log("  hero:", JSON.stringify(heroTitle));
console.log("  testimonio[0].author:", JSON.stringify(testimonialAuthor));

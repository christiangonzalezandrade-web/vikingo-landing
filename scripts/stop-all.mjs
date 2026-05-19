#!/usr/bin/env node
/**
 * Cierra servidores en puertos 3020–3360 (rango kill-all del proyecto).
 * Uso: npm run stop:all
 */
import { execSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const script = join(root, "scripts", "kill-all.sh");

try {
  execSync(`chmod +x "${script}" && bash "${script}"`, {
    cwd: root,
    stdio: "inherit",
  });
} catch {
  console.error("\n→ Ejecuta esto en Terminal.app (fuera de Cursor):\n");
  console.error(
    "kill -9 $(for p in $(seq 3020 3360); do lsof -ti tcp:$p 2>/dev/null; done) 2>/dev/null\n"
  );
  process.exit(1);
}

console.log("\nCierra pestañas de terminal huérfanas en Cursor (icono papelera) si quedaron abiertas.\n");

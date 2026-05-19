#!/usr/bin/env node
/**
 * Único comando para desarrollo: limpia, compila y arranca (puerto en scripts/port.mjs).
 * Uso: npm run fresh
 */
import { execSync, spawn } from "node:child_process";
import { existsSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { HOST, PORT, URL, URL_ALT } from "./port.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const buildId = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);

console.log("→ Liberando puertos 3020–3360...");
execSync("node scripts/stop-all.mjs", { cwd: root, stdio: "inherit" });
execSync("node scripts/stop.mjs", { cwd: root, stdio: "inherit" });
execSync("sleep 2", { shell: true });

let busy = true;
try {
  execSync(`lsof -ti tcp:${PORT}`, { stdio: "pipe" });
} catch {
  busy = false;
}
if (busy) {
  console.error(`\n✗ El puerto ${PORT} sigue ocupado (servidor viejo).`);
  console.error(`  En Terminal.app ejecuta:\n`);
  console.error(`    kill -9 $(lsof -ti tcp:${PORT})`);
  console.error(`    cd ~/Documents/vikingo-landing && npm run fresh\n`);
  process.exit(1);
}

const nextDir = join(root, ".next");
if (existsSync(nextDir)) {
  console.log("→ Eliminando caché .next...");
  rmSync(nextDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
}

writeFileSync(
  join(root, ".env.local"),
  `# Generado por npm run fresh\nNEXT_PUBLIC_BUILD_ID=${buildId}\n`,
  "utf8"
);

console.log(`→ Build: ${buildId}`);
console.log("→ Compilando...");
execSync("npm run build", {
  cwd: root,
  stdio: "inherit",
  env: { ...process.env, NEXT_PUBLIC_BUILD_ID: buildId },
});

console.log(`\n✓ Servidor listo en puerto ${PORT}:\n`);
console.log(`  ${URL}`);
console.log(`  ${URL_ALT}\n`);
console.log(`  Abre en el navegador: npm run open\n`);

const child = spawn("npx", ["next", "start", "-H", HOST, "-p", PORT], {
  cwd: root,
  stdio: "inherit",
  env: { ...process.env, NEXT_PUBLIC_BUILD_ID: buildId },
});

child.on("error", (err) => {
  console.error(err);
  process.exit(1);
});

child.on("exit", (code) => {
  if (code !== 0 && code !== null) process.exit(code ?? 1);
});

process.on("SIGINT", () => {
  child.kill("SIGTERM");
  process.exit(0);
});

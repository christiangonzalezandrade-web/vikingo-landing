#!/usr/bin/env node
/** Desarrollo: puerto en port.mjs; polling por defecto evita EMFILE en macOS. */
import { spawn } from "node:child_process";
import { execSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { DEV_BIND_HOST, PORT, URL, URL_ALT } from "./port.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

execSync("bash scripts/kill-all.sh", { cwd: root, stdio: "inherit" });

console.log("\n╔══════════════════════════════════════════════════════════╗");
console.log("║  Abre en el navegador (solo HTTP, nunca https://)       ║");
console.log("╚══════════════════════════════════════════════════════════╝");
console.log(`  ${URL}`);
console.log(`  ${URL_ALT}`);
console.log(`\n→ Escuchando en ${DEV_BIND_HOST}:${PORT}  (webpack: VIKINGO_WEBPACK=1 npm run dev)\n`);

const useWebpack = process.env.VIKINGO_WEBPACK === "1";
const args = useWebpack
  ? ["next", "dev", "--webpack", "-H", DEV_BIND_HOST, "-p", PORT]
  : ["next", "dev", "-H", DEV_BIND_HOST, "-p", PORT];

const child = spawn("npx", args, {
  cwd: root,
  stdio: "inherit",
  env: {
    ...process.env,
    /** Evita "EMFILE: too many open files" del file watcher en macOS */
    WATCHPACK_POLLING: process.env.WATCHPACK_POLLING ?? "true",
    CHOKIDAR_USEPOLLING: process.env.CHOKIDAR_USEPOLLING ?? "true",
  },
});

process.on("SIGINT", () => {
  child.kill("SIGTERM");
  process.exit(0);
});

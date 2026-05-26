#!/usr/bin/env node
/** Producción en App Platform: escucha en 0.0.0.0 y en PORT (DO inyecta 8080). */
import { spawn } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const host = "0.0.0.0";
const port = process.env.PORT ?? "8080";

console.log(`→ next start en ${host}:${port}\n`);

const child = spawn("npx", ["next", "start", "-H", host, "-p", port], {
  cwd: root,
  stdio: "inherit",
  env: process.env,
});

process.on("SIGTERM", () => {
  child.kill("SIGTERM");
});
process.on("SIGINT", () => {
  child.kill("SIGTERM");
  process.exit(0);
});

child.on("exit", (code) => process.exit(code ?? 0));

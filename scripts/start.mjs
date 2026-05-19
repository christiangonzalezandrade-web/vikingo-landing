#!/usr/bin/env node
import { spawn } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { HOST, PORT, URL, URL_ALT } from "./port.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

console.log(`→ Servidor en puerto ${PORT}:`);
console.log(`  ${URL}`);
console.log(`  ${URL_ALT}\n`);

const child = spawn("npx", ["next", "start", "-H", HOST, "-p", PORT], {
  cwd: root,
  stdio: "inherit",
});

process.on("SIGINT", () => {
  child.kill("SIGTERM");
  process.exit(0);
});

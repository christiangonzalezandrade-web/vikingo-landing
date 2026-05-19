#!/usr/bin/env node
import { execSync } from "node:child_process";
import { PORT } from "./port.mjs";

console.log(`→ Deteniendo servidor en puerto ${PORT}...`);
try {
  const pids = execSync(`lsof -ti tcp:${PORT}`, { encoding: "utf8" }).trim();
  if (pids) {
    for (const pid of pids.split("\n").filter(Boolean)) {
      execSync(`kill -9 ${pid}`, { stdio: "inherit" });
      console.log(`  Proceso ${pid} terminado`);
    }
  } else {
    console.log("  No hay proceso en ese puerto.");
  }
} catch {
  console.log("  Puerto ya libre.");
}

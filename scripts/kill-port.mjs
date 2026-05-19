#!/usr/bin/env node
import { execSync } from "node:child_process";
import { PORT } from "./port.mjs";

function killPort() {
  try {
    const pids = execSync(`lsof -ti tcp:${PORT}`, { encoding: "utf8" }).trim();
    if (!pids) return;
    for (const pid of pids.split("\n").filter(Boolean)) {
      try {
        process.kill(Number(pid), "SIGKILL");
      } catch {
        execSync(`kill -9 ${pid}`, { stdio: "ignore", shell: true });
      }
    }
  } catch {
    /* puerto libre */
  }
}

killPort();
execSync("sleep 1", { shell: true });
killPort();

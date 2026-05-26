#!/usr/bin/env node
/**
 * Actualiza la app en DigitalOcean App Platform desde .do/app.yaml y lanza deploy.
 * Requiere: doctl auth init (token en https://cloud.digitalocean.com/account/api/tokens)
 */
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const specPath = join(root, ".do", "seal-app.yaml");

function run(cmd) {
  console.log(`→ ${cmd}`);
  execSync(cmd, { cwd: root, stdio: "inherit" });
}

try {
  execSync("doctl auth list", { stdio: "pipe" });
} catch {
  console.error("\n✗ doctl sin token. Ejecuta:\n  doctl auth init\n");
  process.exit(1);
}

const list = execSync('doctl apps list --format ID,Spec.Name --no-header', {
  encoding: "utf8",
});
const line = list
  .split("\n")
  .map((l) => l.trim())
  .find((l) => /vikingo-landing|seal-app/i.test(l));

if (!line) {
  console.error("✗ No encontré app vikingo-landing/seal-app en tu cuenta DO.");
  console.error(list || "(sin apps)");
  process.exit(1);
}

const appId = line.split(/\s+/)[0];
console.log(`\n→ App ID: ${appId}\n`);

run(`doctl apps update ${appId} --spec ${specPath}`);
run(`doctl apps create-deployment ${appId}`);

const info = execSync(`doctl apps get ${appId} --format DefaultIngress,ActiveDeployment.Phase`, {
  encoding: "utf8",
});
console.log(`\n✓ Deploy iniciado.\n${info}`);

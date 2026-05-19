#!/usr/bin/env node
import { execSync } from "node:child_process";
import { URL as landingUrl } from "./port.mjs";

execSync(`open "${landingUrl}"`, { stdio: "inherit" });

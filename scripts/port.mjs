/** Producción: escuchar en todas las interfaces (Docker, LAN, etc.) */
export const HOST = "0.0.0.0";

/**
 * Desarrollo: por defecto **0.0.0.0** para que respondan `localhost`, `127.0.0.1` y la IP de la red.
 * Si quieres solo local: `VIKINGO_DEV_HOST=127.0.0.1 npm run dev`
 */
export const DEV_BIND_HOST = process.env.VIKINGO_DEV_HOST ?? "0.0.0.0";

/**
 * Puerto del landing. Por defecto **3333** (3046 suele chocar con otros procesos).
 * Cambiar sin tocar código: `VIKINGO_LANDING_PORT=3047 npm run dev`
 */
export const PORT = String(process.env.VIKINGO_LANDING_PORT ?? "3333");

/** Preferir esta URL en el navegador (más fiable que `localhost` en macOS/Safari). */
export const URL = `http://127.0.0.1:${PORT}/es`;
export const URL_ALT = `http://localhost:${PORT}/es`;

import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

export default createMiddleware(routing);

/**
 * Debe coincidir con la guía de next-intl. Un matcher demasiado estrecho
 * (solo `/(locales)/:path*`) hace que el middleware no corra en algunas rutas y
 * Next devuelve 404 / “no carga” porque no se resuelve el locale.
 * @see https://next-intl.dev/docs/routing/middleware
 */
export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};

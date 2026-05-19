# Vikingo — Landing Page

Premium fintech + IoT landing page for **Vikingo**, the autonomous commerce operating system.

## Stack

- **Next.js 16** (App Router)
- **Tailwind CSS v4**
- **Framer Motion**
- **next-intl** (6 languages)
- **next-themes** (dark/light)
- **Recharts**

## Languages

- English (`/en`)
- Español (`/es`)
- Português (`/pt`)
- Deutsch (`/de`)
- Français (`/fr`)
- Italiano (`/it`)

Middleware auto-detects browser language and redirects to the matching locale. The configured **default locale is Spanish (`es`)** for redirects from `/` when no better match applies.

## Getting started

```bash
npm install
npm run dev
```

Runs on **http://127.0.0.1:3333** by default (see `scripts/port.mjs`). `npm run dev` listens on **0.0.0.0** so `localhost` and `127.0.0.1` both work; it sets **WATCHPACK_POLLING** by default to avoid macOS **EMFILE** watcher errors. Override port: `VIKINGO_LANDING_PORT=3555 npm run dev`. Turbopack-heavy setup: `VIKINGO_WEBPACK=1 npm run dev`.

Open **[http://127.0.0.1:3333/es](http://127.0.0.1:3333/es)** for Spanish (recommended on macOS/Safari), or [http://127.0.0.1:3333/en](http://127.0.0.1:3333/en) for English — the middleware may send you to `/en` if your browser language is English. If you see **“This page couldn’t load”**, the dev server is probably not running (`npm run dev`) or Safari is using `localhost` over IPv6: use **`127.0.0.1`** in the URL, not `https://` (dev is **http** only unless you enable experimental HTTPS).

### If you don’t see updated copy (e.g. hero title or testimonials)

1. **Use the right URL**: Spanish copy is at **`/es`**. **`/en`** uses English strings.
2. **`npm run build` must succeed**: after the build, `scripts/verify-landing-copy.mjs` checks that the generated `es.html` contains the current `hero.title` and `testimonials.items[0].author` from `messages/es.json`, and that old strings (old hero, Marco R., EuroVend) are gone. If that step fails, **do not deploy** — the artifact is wrong.
3. **Redeploy** the new build to your host; production won’t update until you do.
4. **Hard refresh** or a private window to avoid a cached HTML page.

## Build

```bash
npm run build
npm start
```

## Deploy (DigitalOcean App Platform)

Guía paso a paso (GitHub, spec YAML, dominio): [docs/DEPLOY-DIGITALOCEAN.md](docs/DEPLOY-DIGITALOCEAN.md). En la nube usa **`npm run start:platform`** (ver `package.json`); **`npm start`** es para tu máquina local.

## Project structure

```
messages/          # i18n JSON per locale
src/
  app/[locale]/    # Localized routes + SEO metadata
  components/      # Landing sections
  i18n/            # Routing & request config
middleware.ts      # next-intl (matcher según docs; evita 404 en /{locale})
```

## Sections

Hero · Trust · Global coverage (SumUp) · Solutions · Industries · Live dashboard · Benefits · How it works · Pricing · Testimonials · FAQ · CTA · Footer

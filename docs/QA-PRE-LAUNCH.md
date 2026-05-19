# QA pre-lanzamiento — Vikingo Landing

Auditoría hecha el día previo al deploy. **Build, lint e i18n están limpios.** Hay un puñado de cosas funcionales y SEO que conviene resolver antes de salir a internet.

## Resumen del estado

| Área | Estado |
|------|--------|
| Build Next.js (`npm run build`) | OK |
| `npm run lint` | OK (sin warnings) |
| Paridad i18n (6 idiomas, 220 claves) | OK |
| Verificación de copy (`verify-landing-copy.mjs`) | OK |
| Imágenes/`alt` | OK |
| Enlaces externos con `noopener noreferrer` | OK |
| `console.log` / TODO / lorem | Ninguno |

## Bloqueantes (resolver antes de subir)

### 1. Formularios no envían nada
`ContactForm.tsx` (`handleSubmit`) y `Careers.tsx` (`handleSubmit`) simulan con `setTimeout(800)` y muestran “Mensaje enviado”. Si el usuario rellena el form, nadie recibe nada y la pantalla finge éxito.

Opciones:
- **Mínimo:** abrir un `mailto:` o `https://wa.me/...?text=...` con los datos del form serializados en el cuerpo.
- **Correcto:** crear `app/api/contact/route.ts` que envíe el correo (Resend, SendGrid, AWS SES). Misma idea para `careers`.

### 2. Dominio del correo de contacto
`src/lib/config.ts` → `CONTACT_EMAIL = "contacto@vikingo-systems.com"` (con **s**), pero el dominio que mencionaste es **`vikingo-system.com`** (sin s). Verifica cuál es el real y alinea ambos (el del DNS y el del código).

### 3. Enlaces muertos en el Footer
`src/components/Footer.tsx` tiene 5 enlaces `href="#"`:
- Docs, About, Privacy, Terms, Support.

Para producción: **o** los apuntas a páginas reales (`/docs`, `/legal/privacy`, …), **o** los quitas, **o** los marcas como “próximamente” sin link. Los `<a href="#">` son malos para SEO/accesibilidad y al hacer clic regresan al top.

## Importantes (recomendado antes de salir)

### 4. SEO / discoverability
- **Falta `sitemap.ts`** en `src/app/`. Recomendado para indexación (incluir las 6 URLs `/{locale}` con `alternates`).
- **Falta `robots.ts`** en `src/app/`. Para apuntar al sitemap y permitir crawl.
- **Falta imagen Open Graph** (`opengraph-image.png`). Hoy las redes sociales no tienen previsualización rica. Lo ideal: 1200×630 PNG/JPG en `src/app/opengraph-image.*` o referenciada en `generateMetadata`.
- **`metadataBase`** no está fijado en el layout — Next emite warning en build y las URLs absolutas (OG, sitemap) salen relativas. Definir con `new URL("https://vikingo-system.com")` cuando confirmes dominio.
- **`hreflang`**: ya están las `alternates.languages` en el layout. Bien. Cuando definas `metadataBase`, validar que generan URLs absolutas.

### 5. Mock data visible en el dashboard
`src/components/LiveDashboard.tsx` contiene literales no traducidos y datos hardcoded: `"Vikingo OS"`, `"Live"`, `"Revenue (24h)"`, `"Machines online"`, `"9,847"`, `"98.4% uptime"`, `"Machine #2847 — Berlin"`, `"Revenue by country"`, `"USD · EUR · GBP · BRL"`. Como demo está bien, pero hay tres tickets pequeños:
- Traducir los `Revenue (24h)`, `Machines online`, `Revenue by country` (los más visibles).
- O reemplazar con un placeholder neutro (sin números fijos que se ven raros con el tiempo).

### 6. Dos secciones comparten `id="platform"`
- `app/[locale]/page.tsx` línea 26 (placeholder de carga del `LiveDashboard` dinámico).
- `components/LiveDashboard.tsx` línea 48.

Mientras carga el chunk hay duplicidad de ids; el navegador suele tolerarlo pero el ancla `#platform` puede saltar al placeholder y, al desmontarse, recolocar la página. Renombrar el id del placeholder (p. ej. `platform-loading`) o quitarlo, ya que sólo necesita el `aria-busy`.

### 7. Indicador de versión en el footer
`Footer.tsx` muestra `v {process.env.NEXT_PUBLIC_BUILD_ID}` en verde — útil para debugging pero llamativo para producción. Si quieres mantenerlo, ocultarlo a usuarios (`title` o tooltip) o degradarlo visualmente.

## Menores / cosméticos

- **Tamaño de la ilustración del hero**: `public/ilustracion-maestra-ecosistema-vikingo.png` pesa **1.5 MB**. Next genera variantes WebP/AVIF al servir, así que el cliente final recibirá menos, pero podrías reducir el archivo fuente a ~600 KB (WebP) sin pérdida visible.
- `public/.DS_Store` y `src/.DS_Store` no deberían viajar al repo. Añade `.DS_Store` al `.gitignore`.
- `public/{file,globe,next,vercel,window}.svg` son los placeholders por defecto de `create-next-app`. No se usan en la UI; puedes borrarlos para evitar 404 raros desde crawlers.
- `public/geo/` es una carpeta vacía. Borrar.
- `next.config.ts` añadió `devIndicators: false` para ocultar el badge "N" — sólo aplica a `next dev`, no afecta producción.
- Botones flotantes (`CareersButton`, `WhatsAppButton`) tienen `bottom-6` / `md:bottom-8`. En móviles con barra Safari abajo conviene `bottom-safe` o `bottom-[calc(env(safe-area-inset-bottom)+1.5rem)]` para no pisarse con el chrome del navegador.
- `Footer.tsx` y `Header.tsx` mezclan `<a href="#anchor">` con `<ScrollLink>`. Para consistencia: usar `<ScrollLink>` siempre (ya tiene `scrollIntoView` smooth controlado).

## Cosas verificadas y OK (no requieren acción)

- 220 claves de i18n alineadas en `es / en / pt / de / fr / it`.
- Todas las imágenes de `<Image src="…">` existen en `public/`.
- `alt` correcto en todas las `<Image>` (incluyendo `alt=""` decorativo donde corresponde).
- Enlaces a WhatsApp y formulario usan `target="_blank" rel="noopener noreferrer"`.
- Middleware de `next-intl` con matcher oficial.
- `next.config.ts` no aplica `no-store` a `/_next/static` ni a `public/` (CSS/JS/fuentes ok en CDN).
- Build genera 10 páginas estáticas (`/`, `/{en,es,pt,de,fr,it}` y `_not-found`).
- Verificación post-build comprueba que el hero ES y el testimonio Carlos Gonzalez están en el HTML emitido.

## Checklist final antes del push a DigitalOcean

- [ ] Decidir destino del **form de contacto** (mailto temporal o API real).
- [ ] Decidir destino del **form de careers** (idem).
- [ ] Confirmar **dominio canónico** (`vikingo-system.com` vs `vikingo-systems.com`) y `CONTACT_EMAIL`.
- [ ] Limpiar **links muertos** del footer (o crear páginas legales).
- [ ] Añadir **`sitemap.ts`**, **`robots.ts`** y **`metadataBase`** en `src/app/`.
- [ ] Añadir **OG image** (1200×630).
- [ ] Borrar `.DS_Store` y SVGs por defecto de `public/`.
- [ ] Repetir `npm run build` antes de hacer commit.

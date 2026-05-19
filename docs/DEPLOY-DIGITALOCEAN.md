# Desplegar el landing en DigitalOcean App Platform

Cursor / un agente **no** puede iniciar sesión en tu cuenta de DigitalOcean ni en GitHub por ti. Necesitas **subir el código a GitHub** (o GitLab/Bitbucket) y crear la app en DO enlazando ese repositorio.

## 1. Git + GitHub

En la raíz del proyecto (`vikingo-landing`):

```bash
git init
git add .
git commit -m "Landing Vikingo"
```

Crea un repositorio vacío en GitHub (por ejemplo `vikingo-landing`) y enlázalo:

```bash
git remote add origin https://github.com/TU_USUARIO/vikingo-landing.git
git branch -M main
git push -u origin main
```

(Si usas la CLI `gh`: `gh auth login` y luego `gh repo create`.)

## 2. Ajustar el spec de la app

Edita `.do/app.yaml` y cambia:

- `repo: OWNER/vikingo-landing` → `repo: TU_USUARIO/vikingo-landing`
- `branch: main` si usas otra rama.

El comando de arranque en producción para la nube es **`npm run start:platform`**: ejecuta `next start -H 0.0.0.0` y respeta la variable **`PORT`** que App Platform inyecta (coincide con `http_port: 8080` del spec). El `npm start` local sigue usando `scripts/stop.mjs` + `start.mjs` (solo tu máquina).

## 3. Crear la app en DigitalOcean

**Opción A — Panel web**

1. [DigitalOcean → Apps → Create App](https://cloud.digitalocean.com/apps/new).
2. Elige **GitHub**, autoriza la org/usuario, selecciona el repo y la rama.
3. App Platform detectará Node; configura:
   - **Build command:** `npm ci && npm run build`
   - **Run command:** `npm run start:platform`
   - **HTTP port:** `8080`
4. Crea la app y espera el primer deploy.

**Opción B — `doctl`**

```bash
brew install doctl   # macOS
doctl auth init      # token de DO: API → Tokens
# Edita .do/app.yaml (repo correcto), luego:
doctl apps create --spec .do/app.yaml
```

## 4. Dominio (vikingo-system.com)

En la app → **Settings → Domains** añade `www.tudominio.com` (o el host que quieras). DO te dará registros **CNAME** o instrucciones para el apex; configúralos en el DNS del dominio (DigitalOcean Networking o tu registrador).

## 5. Variables de entorno

Si más adelante usas `NEXT_PUBLIC_*` u otras variables, añádelas en la app → **Settings → App-Level Environment Variables**. No subas `.env.local` con secretos al repositorio.

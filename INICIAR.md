# Cómo ver la landing Vikingo

## URL correcta (puerto actual)

Por defecto el proyecto usa el puerto **3333** (menos choques que 3046).

- **http://127.0.0.1:3333/es** ← recomendado (Safari / macOS)
- **http://localhost:3333/es**

Otro puerto sin editar archivos:

```bash
VIKINGO_LANDING_PORT=3555 npm run dev
# → http://127.0.0.1:3555/es
```

Si el navegador dice «no se puede conectar», el servidor no está corriendo — ejecuta `npm run fresh` abajo.

**Importante:** el código que hemos ajustado suele estar en **`~/Documents/vikingo-landing`**. Si abres **`~/Desktop/vikingo`**, es otra carpeta: ahí no verás los mismos cambios ni el mismo `port.mjs`.

## Arrancar el servidor

En **Terminal.app** (no en Cursor si falla el permiso):

```bash
cd ~/Documents/vikingo-landing
npm run stop:all
npm run dev
```

Si ves errores **EMFILE** en la terminal, el `dev` ya fuerza **polling** de watchers; si sigue mal: `npm run dev:webpack` (Turbopack off).

```bash
cd ~/Documents/vikingo-landing
npm run stop:all
npm run fresh
```

Cerrar procesos en el rango **3020–3360** (scripts del repo):

```bash
npm run stop:all
```

Si no basta, en **Terminal.app**:

```bash
kill -9 $(for p in $(seq 3020 3360); do lsof -ti tcp:$p 2>/dev/null; done) 2>/dev/null
```

Luego abre en el navegador:

```bash
npm run open
```

(Abre la URL que indique la consola al hacer `npm run dev`, suele ser **http://127.0.0.1:3333/es**.) Recarga con **Cmd+Shift+R** si ves HTML viejo.

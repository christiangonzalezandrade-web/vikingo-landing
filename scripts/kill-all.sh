#!/bin/bash
# Cierra servidores Next en el rango usado por este repo (incl. 3333 por defecto).
set -e

PORT_MIN=3020
PORT_MAX=3360
PIDS=""

for ((p=PORT_MIN; p<=PORT_MAX; p++)); do
  for pid in $(lsof -ti tcp:"$p" 2>/dev/null); do
    PIDS="$PIDS $pid"
  done
done

# Quitar duplicados
PIDS=$(echo $PIDS | tr ' ' '\n' | sort -u | tr '\n' ' ')

if [ -z "$(echo $PIDS | tr -d ' ')" ]; then
  echo "✓ No hay servidores en puertos ${PORT_MIN}–${PORT_MAX}."
  exit 0
fi

echo "→ Cerrando PIDs:${PIDS}"
kill -9 $PIDS 2>/dev/null || true
sleep 1

# Verificar
STILL=0
for ((p=PORT_MIN; p<=PORT_MAX; p++)); do
  if lsof -ti tcp:"$p" >/dev/null 2>&1; then
    echo "  ✗ Puerto $p sigue ocupado"
    STILL=1
  fi
done

if [ "$STILL" -eq 0 ]; then
  echo "✓ Puertos ${PORT_MIN}–${PORT_MAX} libres."
else
  echo ""
  echo "Si falló, ejecuta en Terminal.app:"
  echo "  kill -9 \$(for p in \$(seq ${PORT_MIN} ${PORT_MAX}); do lsof -ti tcp:\$p 2>/dev/null; done)"
  exit 1
fi

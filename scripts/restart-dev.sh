#!/usr/bin/env bash
set -euo pipefail

PORT="${PORT:-4317}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

echo "Stopping anything on port ${PORT}..."

pids="$(lsof -t -nP -iTCP:"${PORT}" -sTCP:LISTEN 2>/dev/null || true)"

if [[ -n "${pids}" ]]; then
  echo "Killing: ${pids}"
  # shellcheck disable=SC2086
  kill ${pids} 2>/dev/null || true
  sleep 1

  still="$(lsof -t -nP -iTCP:"${PORT}" -sTCP:LISTEN 2>/dev/null || true)"
  if [[ -n "${still}" ]]; then
    echo "Force killing: ${still}"
    # shellcheck disable=SC2086
    kill -9 ${still} 2>/dev/null || true
    sleep 0.5
  fi
else
  echo "Port ${PORT} is already free."
fi

echo "Starting Next.js on http://localhost:${PORT}"
cd "${ROOT}"
exec npm run dev

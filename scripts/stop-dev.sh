#!/usr/bin/env bash
set -euo pipefail

PORT="${PORT:-4317}"
pids="$(lsof -t -nP -iTCP:"${PORT}" -sTCP:LISTEN 2>/dev/null || true)"

if [[ -z "${pids}" ]]; then
  echo "Nothing is listening on port ${PORT}."
  exit 0
fi

echo "Stopping process on port ${PORT}: ${pids}"
# shellcheck disable=SC2086
kill ${pids} 2>/dev/null || true
sleep 1

still="$(lsof -t -nP -iTCP:"${PORT}" -sTCP:LISTEN 2>/dev/null || true)"
if [[ -n "${still}" ]]; then
  echo "Force killing: ${still}"
  # shellcheck disable=SC2086
  kill -9 ${still} 2>/dev/null || true
fi

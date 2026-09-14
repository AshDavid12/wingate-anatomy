#!/usr/bin/env bash
set -euo pipefail

# macOS often has a tiny per-process file limit; Watchpack then 404s `/`.
ulimit -n 65536 2>/dev/null || true
export WATCHPACK_POLLING=true
export CHOKIDAR_USEPOLLING=true
export WATCHPACK_POLLING_INTERVAL=1000

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "${ROOT}"
exec npx next dev -H 0.0.0.0 -p "${PORT:-4317}"

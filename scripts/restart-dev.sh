#!/usr/bin/env bash
set -euo pipefail

PORT="${PORT:-4317}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

bash "${ROOT}/scripts/stop-dev.sh"

echo "Starting Next.js on http://localhost:${PORT}"
cd "${ROOT}"
exec npm run dev

#!/usr/bin/env zsh
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
PORT="${1:-8000}"

cd "$PROJECT_ROOT"

echo "Serving $PROJECT_ROOT"
echo "Open: http://localhost:$PORT"
python3 -m http.server "$PORT"


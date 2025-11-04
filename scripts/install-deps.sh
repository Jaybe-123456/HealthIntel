#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "Installing Node.js dependencies via npm workspaces..."
cd "$ROOT_DIR"
npm install

echo "Installing Python SDK in editable mode..."
if command -v pip >/dev/null 2>&1; then
  pip install -e packages/python-sdk || echo "Python dependency install skipped"
else
  echo "pip not found, skipping Python SDK install"
fi

echo "Dependencies installed."

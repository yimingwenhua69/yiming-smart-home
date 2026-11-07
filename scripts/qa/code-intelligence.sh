#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/../.."
# Optional local tools; never changes environment settings or agent configuration.
TOOLS_ROOT="${TOOLS_ROOT:-/workspace/.tools}"
export npm_config_cache="${npm_config_cache:-/workspace/.npm-cache}"
export UV_TOOL_DIR="$TOOLS_ROOT/uv"
export UV_TOOL_BIN_DIR="$TOOLS_ROOT/bin"
export UV_CACHE_DIR="${UV_CACHE_DIR:-/workspace/.cache/uv}"
mkdir -p "$UV_TOOL_BIN_DIR"
npm install --prefix "$TOOLS_ROOT/codegraph" --save-exact @colbymchenry/codegraph@1.6.2
# Official upstream distribution is graphifyy; its executable is graphify.
uv tool install graphifyy==0.9.103
export PATH="$TOOLS_ROOT/codegraph/node_modules/.bin:$UV_TOOL_BIN_DIR:$PATH"
codegraph init --yes .
graphify extract . --code-only --no-cluster --max-workers 2
npm exec --yes --package=@hongmaple0820/scale-engine@0.58.0 -- scale codegraph status --dir . --json

#!/usr/bin/env bash
# demo.sh — quick local demo script (no secrets printed)
# Usage: AUTH_TOKEN=sk_test_xxx BASE_URL=https://api.example.com/v1 ./demo.sh

set -euo pipefail

export AUTH_TOKEN=${AUTH_TOKEN:-}
export BASE_URL=${BASE_URL:-https://api.example.com/v1}

if [ -z "$AUTH_TOKEN" ]; then
  echo "Missing AUTH_TOKEN; set AUTH_TOKEN=sk_test_xxx" >&2
  exit 1
fi

echo "== Node example (dry-run/stub recommended) =="
# show command that would be run without printing token
echo "BASE_URL=$BASE_URL AUTH_TOKEN=**** node examples/js/index.js"
# run with sanitized env for demo — set a dummy token for local mock servers
BASE_URL="$BASE_URL" AUTH_TOKEN="demo-token" node examples/js/index.js 2>/tmp/node-demo.log || true
tail -n +1 /tmp/node-demo.log | sed -n '1,40p'

echo
echo "== Python example =="
echo "BASE_URL=$BASE_URL AUTH_TOKEN=**** python3 examples/python/example.py"
BASE_URL="$BASE_URL" AUTH_TOKEN="demo-token" python3 examples/python/example.py 2>/tmp/py-demo.log || true
tail -n +1 /tmp/py-demo.log | sed -n '1,40p'

echo
echo "Demo finished. For CI, set TEST_TOKEN as a repo secret and enable stubbing in tests."

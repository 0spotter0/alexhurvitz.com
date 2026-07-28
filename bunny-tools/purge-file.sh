#!/usr/bin/env bash
set -euo pipefail

# Purge a single file from the Bunny CDN edge cache by its path.
#
# Uses the Bunny purge endpoint (https://api.bunny.net/purge), which takes the
# public CDN URL of the file and drops it from every edge node. Use this after
# re-uploading a file so the old cached copy is not served.
#
# Usage:
#   ./purge-file.sh <remote-path> [-n]
#
#   <remote-path>  Path of the file on the pull zone. e.g. "portraits/foo_thumb.webp"
#   -n             Dry run — print the URL that would be purged without purging.
#
# Examples:
#   ./purge-file.sh foo_thumb.webp
#   ./purge-file.sh portraits/foo_full.webp

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/.env"

: "${BUNNY_CDN_URL:?BUNNY_CDN_URL (pull zone base URL, e.g. https://your-zone.b-cdn.net) is not set in .env}"
: "${BUNNY_API_KEY:?BUNNY_API_KEY (account API key) is not set in .env}"

DRY_RUN=false
POSITIONAL=()
for arg in "$@"; do
  case "$arg" in
    -n) DRY_RUN=true ;;
    -*) echo "Unknown flag: $arg" >&2; exit 1 ;;
    *)  POSITIONAL+=("$arg") ;;
  esac
done

REMOTE_PATH="${POSITIONAL[0]:-}"

if [[ -z "$REMOTE_PATH" ]]; then
  echo "Usage: $0 <remote-path> [-n]" >&2
  exit 1
fi

# Build the public CDN URL: <cdn-base>/<remote-path>, with a single slash join.
REMOTE_PATH="${REMOTE_PATH#/}"
CDN_URL="${BUNNY_CDN_URL%/}/${REMOTE_PATH}"

if $DRY_RUN; then
  echo "would purge  $CDN_URL"
  exit 0
fi

# URL-encode the target url for the ?url= query parameter.
ENCODED_URL=$(python3 -c 'import sys, urllib.parse; print(urllib.parse.quote(sys.argv[1], safe=""))' "$CDN_URL")

http_code=$(curl -s -o /dev/null -w '%{http_code}' \
  --request POST \
  -H "AccessKey: ${BUNNY_API_KEY}" \
  "https://api.bunny.net/purge?url=${ENCODED_URL}&async=false")

if [[ "$http_code" == "200" ]]; then
  echo "✓ Purged: $CDN_URL"
else
  echo "✗ Failed to purge: $CDN_URL (HTTP $http_code)" >&2
  exit 1
fi

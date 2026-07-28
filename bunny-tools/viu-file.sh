#!/usr/bin/env bash
set -euo pipefail

# Download an image from the Bunny storage zone into memory and pipe it into viu.
# No temp file is written — the bytes stream straight from curl into viu.
#
# Usage:
#   ./viu-file.sh <remote-path> [viu args...]
#
#   <remote-path>  Path of the file in the bucket. e.g. "portraits/foo_thumb.webp"
#   [viu args...]  Any extra args are passed through to viu (e.g. -w 80, -h 40).
#
# Examples:
#   ./viu-file.sh foo_thumb.webp
#   ./viu-file.sh portraits/foo_full.webp -w 80

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/.env"

: "${BUNNY_STORAGE_ZONE:?BUNNY_STORAGE_ZONE is not set in .env}"
: "${BUNNY_REGION:?BUNNY_REGION is not set in .env}"
: "${BUNNY_READONLY_KEY:?BUNNY_READONLY_KEY is not set in .env}"

if [[ $# -lt 1 || "$1" == "-h" || "$1" == "--help" ]]; then
  echo "Usage: $(basename "$0") <remote-path> [viu args...]" >&2
  exit 1
fi

command -v viu >/dev/null 2>&1 || { echo "viu is not installed (brew install viu)" >&2; exit 1; }

REMOTE_PATH="$1"
shift
REMOTE_PATH="${REMOTE_PATH#/}"   # strip leading slash for URL

# Region hostname: storage.bunnycdn.com for default, or <region>.storage.bunnycdn.com
if [[ "$BUNNY_REGION" == "de" || "$BUNNY_REGION" == "default" ]]; then
  HOST="storage.bunnycdn.com"
else
  HOST="${BUNNY_REGION}.storage.bunnycdn.com"
fi

URL="https://${HOST}/${BUNNY_STORAGE_ZONE}/${REMOTE_PATH}"

# -fsSL: fail on HTTP errors, silent, show errors, follow redirects.
# Stream the bytes straight into viu, which reads the image from stdin ("-").
curl -fsSL \
  -H "AccessKey: ${BUNNY_READONLY_KEY}" \
  "$URL" \
| viu "$@" -

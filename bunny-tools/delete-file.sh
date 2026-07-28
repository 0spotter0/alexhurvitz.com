#!/usr/bin/env bash
set -euo pipefail

# Delete a single file from the Bunny storage zone by name.
#
# Usage:
#   ./delete-file.sh <remote-path> [-y] [-n]
#
#   <remote-path>  Path of the file in the bucket. e.g. "portraits/foo_thumb.webp"
#   -y             Skip the confirmation prompt.
#   -n             Dry run — print what would be deleted without deleting.
#
# Examples:
#   ./delete-file.sh foo_thumb.webp
#   ./delete-file.sh portraits/foo_full.webp -y

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/.env"

: "${BUNNY_STORAGE_ZONE:?BUNNY_STORAGE_ZONE is not set in .env}"
: "${BUNNY_REGION:?BUNNY_REGION is not set in .env}"
: "${BUNNY_ACCESS_KEY:?BUNNY_ACCESS_KEY (read-write) is not set in .env}"

ASSUME_YES=false
DRY_RUN=false
POSITIONAL=()
for arg in "$@"; do
  case "$arg" in
    -y) ASSUME_YES=true ;;
    -n) DRY_RUN=true ;;
    -*) echo "Unknown flag: $arg" >&2; exit 1 ;;
    *)  POSITIONAL+=("$arg") ;;
  esac
done

REMOTE_PATH="${POSITIONAL[0]:-}"

if [[ -z "$REMOTE_PATH" ]]; then
  echo "Usage: $0 <remote-path> [-y] [-n]" >&2
  exit 1
fi

# Strip leading slash for the URL.
REMOTE_PATH="${REMOTE_PATH#/}"

# Region hostname: storage.bunnycdn.com for default, or <region>.storage.bunnycdn.com
if [[ "$BUNNY_REGION" == "de" || "$BUNNY_REGION" == "default" ]]; then
  HOST="storage.bunnycdn.com"
else
  HOST="${BUNNY_REGION}.storage.bunnycdn.com"
fi

URL="https://${HOST}/${BUNNY_STORAGE_ZONE}/${REMOTE_PATH}"

if $DRY_RUN; then
  echo "would delete  $URL"
  exit 0
fi

if ! $ASSUME_YES; then
  read -r -p "Delete '$REMOTE_PATH' from ${BUNNY_STORAGE_ZONE}? [y/N] " reply
  case "$reply" in
    y|Y|yes|YES) ;;
    *) echo "Aborted."; exit 0 ;;
  esac
fi

http_code=$(curl -s -o /dev/null -w '%{http_code}' \
  --request DELETE \
  -H "AccessKey: ${BUNNY_ACCESS_KEY}" \
  "$URL")

if [[ "$http_code" == "200" ]]; then
  echo "✓ Deleted: $REMOTE_PATH"
elif [[ "$http_code" == "404" ]]; then
  echo "✗ Not found: $REMOTE_PATH (HTTP 404)" >&2
  exit 1
else
  echo "✗ Failed to delete: $REMOTE_PATH (HTTP $http_code)" >&2
  exit 1
fi

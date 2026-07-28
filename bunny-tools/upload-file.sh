#!/usr/bin/env bash
set -euo pipefail

# Upload a single local file to a Bunny storage zone path.
#
# Usage:
#   ./upload-file.sh <local-file> [remote-path] [-n]
#
#   <local-file>   File to upload (required).
#   [remote-path]  Destination path in the bucket. If it ends with "/" (or is
#                  omitted), the local filename is appended. Otherwise it is used
#                  as the full destination path (allowing a rename).
#   -n             Dry run — print what would be uploaded without uploading.
#
# Examples:
#   ./upload-file.sh ./foo_thumb.webp
#   ./upload-file.sh ./foo_thumb.webp portraits/
#   ./upload-file.sh ./foo_thumb.webp portraits/renamed_thumb.webp

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/.env"

: "${BUNNY_STORAGE_ZONE:?BUNNY_STORAGE_ZONE is not set in .env}"
: "${BUNNY_REGION:?BUNNY_REGION is not set in .env}"
: "${BUNNY_ACCESS_KEY:?BUNNY_ACCESS_KEY (read-write) is not set in .env}"

DRY_RUN=false
POSITIONAL=()
for arg in "$@"; do
  case "$arg" in
    -n) DRY_RUN=true ;;
    -*) echo "Unknown flag: $arg" >&2; exit 1 ;;
    *)  POSITIONAL+=("$arg") ;;
  esac
done

LOCAL_FILE="${POSITIONAL[0]:-}"
REMOTE_PATH="${POSITIONAL[1]:-}"

if [[ -z "$LOCAL_FILE" ]]; then
  echo "Usage: $0 <local-file> [remote-path] [-n]" >&2
  exit 1
fi
if [[ ! -f "$LOCAL_FILE" ]]; then
  echo "Not a file: $LOCAL_FILE" >&2
  exit 1
fi

# Resolve the remote destination path.
# - empty            -> just the filename at the bucket root
# - ends with "/"    -> treat as a folder; append the filename
# - otherwise        -> use as the full destination path
if [[ -z "$REMOTE_PATH" ]]; then
  REMOTE_PATH="$(basename "$LOCAL_FILE")"
elif [[ "$REMOTE_PATH" == */ ]]; then
  REMOTE_PATH="${REMOTE_PATH}$(basename "$LOCAL_FILE")"
fi
REMOTE_PATH="${REMOTE_PATH#/}"   # strip leading slash for URL

# Region hostname: storage.bunnycdn.com for default, or <region>.storage.bunnycdn.com
if [[ "$BUNNY_REGION" == "de" || "$BUNNY_REGION" == "default" ]]; then
  HOST="storage.bunnycdn.com"
else
  HOST="${BUNNY_REGION}.storage.bunnycdn.com"
fi

URL="https://${HOST}/${BUNNY_STORAGE_ZONE}/${REMOTE_PATH}"

if $DRY_RUN; then
  echo "would upload  $LOCAL_FILE -> $URL"
  exit 0
fi

http_code=$(curl -s -o /dev/null -w '%{http_code}' \
  --request PUT \
  -H "AccessKey: ${BUNNY_ACCESS_KEY}" \
  -H "Content-Type: application/octet-stream" \
  --data-binary @"$LOCAL_FILE" \
  "$URL")

if [[ "$http_code" == "201" || "$http_code" == "200" ]]; then
  echo "✓ Uploaded: $REMOTE_PATH"
else
  echo "✗ Failed to upload: $REMOTE_PATH (HTTP $http_code)" >&2
  exit 1
fi

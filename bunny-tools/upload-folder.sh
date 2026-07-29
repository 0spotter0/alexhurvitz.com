#!/usr/bin/env bash
set -euo pipefail

# Upload all files in a local folder to a Bunny storage zone path.
#
# Usage:
#   ./upload-folder.sh <local-folder> [remote-path] [-r] [-n]
#
#   <local-folder>  Folder whose files will be uploaded (required).
#   [remote-path]   Destination prefix in the bucket (default: /). e.g. "portraits"
#   -r              Recurse into subdirectories (preserves relative paths).
#   -n              Dry run — print what would be uploaded without uploading.
#
# Examples:
#   ./upload-folder.sh ./new-photos
#   ./upload-folder.sh ./new-photos portraits
#   ./upload-folder.sh ./new-photos portraits -r

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/.env"

: "${BUNNY_STORAGE_ZONE:?BUNNY_STORAGE_ZONE is not set in .env}"
: "${BUNNY_REGION:?BUNNY_REGION is not set in .env}"
: "${BUNNY_ACCESS_KEY:?BUNNY_ACCESS_KEY (read-write) is not set in .env}"

RECURSE=false
DRY_RUN=false
POSITIONAL=()
for arg in "$@"; do
  case "$arg" in
    -r) RECURSE=true ;;
    -n) DRY_RUN=true ;;
    -*) echo "Unknown flag: $arg" >&2; exit 1 ;;
    *)  POSITIONAL+=("$arg") ;;
  esac
done

LOCAL_DIR="${POSITIONAL[0]:-}"
REMOTE_PREFIX="${POSITIONAL[1]:-}"

if [[ -z "$LOCAL_DIR" ]]; then
  echo "Usage: $0 <local-folder> [remote-path] [-r] [-n]" >&2
  exit 1
fi
if [[ ! -d "$LOCAL_DIR" ]]; then
  echo "Not a directory: $LOCAL_DIR" >&2
  exit 1
fi

# Normalize remote prefix: strip leading/trailing slashes.
REMOTE_PREFIX="${REMOTE_PREFIX#/}"
REMOTE_PREFIX="${REMOTE_PREFIX%/}"

# Region hostname: storage.bunnycdn.com for default, or <region>.storage.bunnycdn.com
if [[ "$BUNNY_REGION" == "de" || "$BUNNY_REGION" == "default" ]]; then
  HOST="storage.bunnycdn.com"
else
  HOST="${BUNNY_REGION}.storage.bunnycdn.com"
fi

BASE_URL="https://${HOST}/${BUNNY_STORAGE_ZONE}"
[[ -n "$REMOTE_PREFIX" ]] && BASE_URL="${BASE_URL}/${REMOTE_PREFIX}"

# Collect files (relative paths from LOCAL_DIR).
# Read into an array via a while-loop instead of `mapfile` so this works on
# the Bash 3.2 that ships with macOS (mapfile is a Bash 4+ builtin).
FILES=()
if $RECURSE; then
  find_cmd=(find . -type f ! -name '.*')
else
  find_cmd=(find . -maxdepth 1 -type f ! -name '.*')
fi
while IFS= read -r rel; do
  FILES+=("$rel")
done < <(cd "$LOCAL_DIR" && "${find_cmd[@]}" | sed 's|^\./||' | sort)

if [[ ${#FILES[@]} -eq 0 ]]; then
  echo "No files found in $LOCAL_DIR"
  exit 0
fi

echo "Uploading ${#FILES[@]} file(s) from '$LOCAL_DIR' to ${BASE_URL}/"
$DRY_RUN && echo "(dry run — nothing will be uploaded)"
echo

UPLOADED=0
FAILED=0
for rel in "${FILES[@]}"; do
  local_path="$LOCAL_DIR/$rel"
  remote_url="$BASE_URL/$rel"

  if $DRY_RUN; then
    printf '  would upload  %s\n' "$rel"
    continue
  fi

  http_code=$(curl -s -o /dev/null -w '%{http_code}' \
    --request PUT \
    -H "AccessKey: ${BUNNY_ACCESS_KEY}" \
    -H "Content-Type: application/octet-stream" \
    --data-binary @"$local_path" \
    "$remote_url")

  if [[ "$http_code" == "201" || "$http_code" == "200" ]]; then
    printf '  ✓ %s\n' "$rel"
    ((UPLOADED++)) || true
  else
    printf '  ✗ %s  (HTTP %s)\n' "$rel" "$http_code" >&2
    ((FAILED++)) || true
  fi
done

echo
if $DRY_RUN; then
  echo "Dry run complete — ${#FILES[@]} file(s) would be uploaded."
else
  echo "Done: $UPLOADED uploaded, $FAILED failed."
  [[ $FAILED -gt 0 ]] && exit 1
fi

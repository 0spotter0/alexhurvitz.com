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
#   -f              Force overwrite. By default the whole batch is refused if any
#                   file already exists remotely; -f uploads anyway (overwriting).
#   -n              Dry run — print what would be uploaded without uploading.
#
# Examples:
#   ./upload-folder.sh ./new-photos
#   ./upload-folder.sh ./new-photos portraits
#   ./upload-folder.sh ./new-photos portraits -r
#   ./upload-folder.sh ./new-photos portraits -f

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/.env"

: "${BUNNY_STORAGE_ZONE:?BUNNY_STORAGE_ZONE is not set in .env}"
: "${BUNNY_REGION:?BUNNY_REGION is not set in .env}"
: "${BUNNY_ACCESS_KEY:?BUNNY_ACCESS_KEY (read-write) is not set in .env}"

RECURSE=false
DRY_RUN=false
FORCE=false
POSITIONAL=()
for arg in "$@"; do
  case "$arg" in
    -r) RECURSE=true ;;
    -f) FORCE=true ;;
    -n) DRY_RUN=true ;;
    -*) echo "Unknown flag: $arg" >&2; exit 1 ;;
    *)  POSITIONAL+=("$arg") ;;
  esac
done

LOCAL_DIR="${POSITIONAL[0]:-}"
REMOTE_PREFIX="${POSITIONAL[1]:-}"

if [[ -z "$LOCAL_DIR" ]]; then
  echo "Usage: $0 <local-folder> [remote-path] [-r] [-f] [-n]" >&2
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

# Collision pre-flight: refuse the whole batch if any destination already exists.
# List each unique destination directory once (Storage LIST endpoint) and collect
# the full URLs that already exist, then compare the batch against that set.
# Uses only indexed arrays + grep so it runs on macOS Bash 3.2 (no associative
# arrays). Skipped entirely with -f/--force.
if ! $FORCE; then
  # Unique destination directories for this batch (one LIST call each).
  dirs=()
  for rel in "${FILES[@]}"; do
    remote_url="$BASE_URL/$rel"
    dirs+=("${remote_url%/*}")
  done
  unique_dirs="$(printf '%s\n' "${dirs[@]}" | sort -u)"

  existing=""   # newline-separated full URLs that already exist remotely
  while IFS= read -r dir_url; do
    [[ -z "$dir_url" ]] && continue
    names="$(curl -s -H "AccessKey: ${BUNNY_ACCESS_KEY}" -H "Accept: application/json" "${dir_url}/" \
      | python3 -c "import json,sys
try:
    items = json.load(sys.stdin)
except Exception:
    items = []
for i in items:
    if not i.get('IsDirectory'):
        print(i.get('ObjectName', ''))")"
    while IFS= read -r n; do
      [[ -z "$n" ]] && continue
      existing+="${dir_url}/${n}"$'\n'
    done <<< "$names"
  done <<< "$unique_dirs"

  collisions=()
  for rel in "${FILES[@]}"; do
    if grep -Fxq "$BASE_URL/$rel" <<< "$existing"; then
      collisions+=("$rel")
    fi
  done

  if [[ ${#collisions[@]} -gt 0 ]]; then
    echo "✗ Refusing to upload — ${#collisions[@]} file(s) already exist in the bucket:" >&2
    for c in "${collisions[@]}"; do
      echo "    $c" >&2
    done
    echo >&2
    echo "Re-run with -f to overwrite them." >&2
    exit 1
  fi
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

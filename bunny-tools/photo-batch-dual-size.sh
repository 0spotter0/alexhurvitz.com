#!/usr/bin/env bash
set -euo pipefail

# Batch-convert a folder of images into two WebP variants each, matching the
# naming the site expects: <imagename>_thumb.webp and <imagename>_full.webp.
#
#   _thumb.webp  1000px longest edge, ~100-200KB (used in the masonry grid)
#   _full.webp   2560px longest edge, ~300-600KB (used in the fullscreen overlay)
#
# Usage:
#   ./photo-batch-dual-size.sh <input-folder> [output-folder]
#
#   <input-folder>   Folder of source images (jpg/jpeg/png/tif/webp) (required).
#   [output-folder]  Where to write the .webp files (default: <input-folder>/web).
#
# Examples:
#   ./photo-batch-dual-size.sh ./raw-photos
#   ./photo-batch-dual-size.sh ./raw-photos ./ready-to-upload

THUMB_EDGE=1000
THUMB_TARGET_KB=150   # midpoint of the 100-200KB range
FULL_EDGE=2560
FULL_TARGET_KB=450    # midpoint of the 300-600KB range

for bin in magick cwebp; do
  command -v "$bin" >/dev/null 2>&1 || { echo "Required tool not found: $bin" >&2; exit 1; }
done

INPUT_DIR="${1:-}"
if [[ -z "$INPUT_DIR" ]]; then
  echo "Usage: $0 <input-folder> [output-folder]" >&2
  exit 1
fi
if [[ ! -d "$INPUT_DIR" ]]; then
  echo "Not a directory: $INPUT_DIR" >&2
  exit 1
fi
OUTPUT_DIR="${2:-$INPUT_DIR/web}"
mkdir -p "$OUTPUT_DIR"

encode() {
  # encode <src> <edge> <target-kb> <dst>
  local src="$1" edge="$2" target_kb="$3" dst="$4" w h resize=()
  read -r w h < <(magick identify -format '%w %h\n' "$src[0]")
  if (( w >= h )); then
    (( w > edge )) && resize=(-resize "$edge" 0)
  else
    (( h > edge )) && resize=(-resize 0 "$edge")
  fi
  cwebp -quiet -mt -m 6 -metadata none \
    -size $(( target_kb * 1024 )) \
    ${resize[@]+"${resize[@]}"} \
    "$src" -o "$dst"
}

shopt -s nullglob nocaseglob
FILES=()
for f in "$INPUT_DIR"/*.{jpg,jpeg,png,tif,tiff,webp}; do
  FILES+=("$f")
done
shopt -u nullglob nocaseglob

if [[ ${#FILES[@]} -eq 0 ]]; then
  echo "No images found in $INPUT_DIR"
  exit 0
fi

echo "Processing ${#FILES[@]} image(s) -> $OUTPUT_DIR"
echo

human_kb() { awk -v b="$1" 'BEGIN { printf "%dKB", int(b/1024 + 0.5) }'; }

for src in "${FILES[@]}"; do
  base="$(basename "$src")"
  name="${base%.*}"

  thumb="$OUTPUT_DIR/${name}_thumb.webp"
  full="$OUTPUT_DIR/${name}_full.webp"

  encode "$src" "$THUMB_EDGE" "$THUMB_TARGET_KB" "$thumb"
  encode "$src" "$FULL_EDGE"  "$FULL_TARGET_KB"  "$full"

  printf '  ✓ %s  (thumb %s, full %s)\n' "$name" \
    "$(human_kb "$(stat -f%z "$thumb")")" \
    "$(human_kb "$(stat -f%z "$full")")"
done

echo
echo "Done: ${#FILES[@]} image(s), $(( ${#FILES[@]} * 2 )) files written to $OUTPUT_DIR"

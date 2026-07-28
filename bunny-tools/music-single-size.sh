#!/usr/bin/env bash
set -euo pipefail

# Convert a single image to a web-ready WebP: 2560px longest edge, ~200-500KB.
# Output is named <imagename>.webp (no _thumb/_full suffix).
#
# Usage:
#   ./music-single-size.sh <image> [output-folder]
#
#   <image>          Source image (jpg/jpeg/png/tif/webp) (required).
#   [output-folder]  Where to write the .webp file (default: alongside the source).
#
# Examples:
#   ./music-single-size.sh ./cover.jpg
#   ./music-single-size.sh ./cover.jpg ./ready-to-upload

EDGE=2560
TARGET_KB=350   # midpoint of the 200-500KB range

for bin in magick cwebp; do
  command -v "$bin" >/dev/null 2>&1 || { echo "Required tool not found: $bin" >&2; exit 1; }
done

SRC="${1:-}"
if [[ -z "$SRC" ]]; then
  echo "Usage: $0 <image> [output-folder]" >&2
  exit 1
fi
if [[ ! -f "$SRC" ]]; then
  echo "Not a file: $SRC" >&2
  exit 1
fi

base="$(basename "$SRC")"
name="${base%.*}"
OUTPUT_DIR="${2:-$(dirname "$SRC")}"
mkdir -p "$OUTPUT_DIR"
DST="$OUTPUT_DIR/${name}.webp"

# Scale the longest edge down to $EDGE (never upscale).
read -r w h < <(magick identify -format '%w %h\n' "$SRC[0]")
resize=()
if (( w >= h )); then
  (( w > EDGE )) && resize=(-resize "$EDGE" 0)
else
  (( h > EDGE )) && resize=(-resize 0 "$EDGE")
fi

cwebp -quiet -mt -m 6 -metadata none \
  -size $(( TARGET_KB * 1024 )) \
  ${resize[@]+"${resize[@]}"} \
  "$SRC" -o "$DST"

size_kb=$(awk -v b="$(stat -f%z "$DST")" 'BEGIN { printf "%d", int(b/1024 + 0.5) }')
printf '  ✓ %s  (%dKB)\n' "$(basename "$DST")" "$size_kb"

#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/.env"

: "${BUNNY_STORAGE_ZONE:?BUNNY_STORAGE_ZONE is not set in .env}"
: "${BUNNY_REGION:?BUNNY_REGION is not set in .env}"
: "${BUNNY_READONLY_KEY:?BUNNY_READONLY_KEY is not set in .env}"

# Region hostname: storage.bunnycdn.com for default, or <region>.storage.bunnycdn.com
if [[ "$BUNNY_REGION" == "de" || "$BUNNY_REGION" == "default" ]]; then
  HOST="storage.bunnycdn.com"
else
  HOST="${BUNNY_REGION}.storage.bunnycdn.com"
fi

PATH_PREFIX="${1:-/}"
PATH_PREFIX="${PATH_PREFIX#/}"   # strip leading slash for URL
URL="https://${HOST}/${BUNNY_STORAGE_ZONE}/${PATH_PREFIX}"

echo "Listing: $URL"
echo

curl -s \
  -H "AccessKey: ${BUNNY_READONLY_KEY}" \
  -H "Accept: application/json" \
  "$URL" \
| python3 -c "
import json, sys
from datetime import datetime

def human_size(n):
    for unit in ('B', 'KB', 'MB', 'GB'):
        if n < 1024:
            return f'{n:.1f} {unit}' if unit != 'B' else f'{n} B'
        n /= 1024
    return f'{n:.1f} TB'

def fmt_date(s):
    if not s:
        return '—'
    try:
        dt = datetime.fromisoformat(s)
        return dt.strftime('%Y-%m-%d %H:%M')
    except ValueError:
        return s

items = json.load(sys.stdin)
items.sort(key=lambda x: (x.get('IsDirectory', False), x.get('ObjectName', '')))

col = '{:<6}  {:>10}  {:>16}  {}'
print(col.format('TYPE', 'SIZE', 'UPLOADED', 'NAME'))
print('-' * 60)
for item in items:
    name     = item.get('ObjectName', '')
    is_dir   = item.get('IsDirectory', False)
    size     = item.get('Length', 0)
    uploaded = fmt_date(item.get('LastChanged') or item.get('DateCreated'))
    kind     = 'DIR' if is_dir else 'FILE'
    size_str = '—' if is_dir else human_size(size)
    print(col.format(kind, size_str, uploaded, name))

total_files = sum(1 for i in items if not i.get('IsDirectory'))
total_size  = sum(i.get('Length', 0) for i in items if not i.get('IsDirectory'))
print(f'\n{len(items)} items  ({total_files} files, {human_size(total_size)} total)')
"

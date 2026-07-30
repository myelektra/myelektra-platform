#!/bin/bash
# Upload all client logos to imgur, save map, update index.html
set -e

THEME_DIR="/home/adelia/Documents/GitHub/glm-weebly-theme-for-myelektra-v4/weebly-theme"
MAP_FILE="$THEME_DIR/imgur-map.txt"

# Imgur anonymous Client-ID (public, for dev use)
CLIENT_ID="0e79b8d893cba3a"

cd "$THEME_DIR"

echo "=== Uploading logos to imgur ==="
rm -f "$MAP_FILE"

for f in client_*; do
  echo -n "  $f ... "
  resp=$(curl -s -H "Authorization: Client-ID $CLIENT_ID" -F "image=@$f" https://api.imgur.com/3/image)
  url=$(echo "$resp" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('data',{}).get('link','FAIL'))" 2>/dev/null)
  if [ -z "$url" ] || [ "$url" = "FAIL" ]; then
    echo "FAIL"
    echo "  response: $resp" >&2
    exit 1
  fi
  # Strip extension for link
  base="${f%.*}"
  echo "$base|$url" >> "$MAP_FILE"
  echo "$url"
  sleep 1
done

echo "=== Done uploading $(wc -l < "$MAP_FILE") logos ==="

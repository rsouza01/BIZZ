#!/usr/bin/env bash
set -euo pipefail

DATA_DIR="${1:-./data}"

echo "Flattening inner folders..."

for dir in "$DATA_DIR"/*/; do
    # Skip if it's not a directory
    [ -d "$dir" ] || continue 
    
    echo "Processing: $dir"
    
    # 1. Find all files that are inside subdirectories (depth 2+) and move them to the root of $dir
    find "$dir" -mindepth 2 -type f -exec mv -n "{}" "$dir" \;
    
    # 2. Find and delete any directories inside $dir (since they should now be empty)
    find "$dir" -mindepth 1 -type d -empty -delete
done

echo "Done! All images are now at the root of their respective magazine folders."
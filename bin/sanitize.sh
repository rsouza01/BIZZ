#!/usr/bin/env bash
set -euo pipefail

DATA_DIR="${1:-../data}"

echo "Sanitizing folder names in $DATA_DIR..."

for dir_path in "$DATA_DIR"/*/; do
    # Skip if not a directory
    [ -d "$dir_path" ] || continue 
    
    parent_dir=$(dirname "$dir_path")
    orig_name=$(basename "$dir_path")
    
    # 1. Convert to lowercase
    # 2. Replace all non-alphanumeric characters with hyphens
    # 3. Squeeze multiple sequential hyphens into a single hyphen
    # 4. Strip leading and trailing hyphens
    safe_name=$(echo "$orig_name" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | tr -s '-' | sed 's/^-//;s/-$//')
    
    if [ "$orig_name" != "$safe_name" ]; then
        echo "Renaming: $orig_name -> $safe_name"
        git mv "$parent_dir/$orig_name" "$parent_dir/$safe_name"
    fi
done

echo "Sanitization complete."
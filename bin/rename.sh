#!/usr/bin/env bash
set -euo pipefail

# Point to your data folder
DATA_DIR="${1:-../data}"

# Enable nullglob so the loop doesn't fail if no folders match
shopt -s nullglob

echo "Scanning for folders starting with 'bizz-0'..."

# Target only directories starting with bizz-0
for dir_path in "$DATA_DIR"/bizz-*/; do
    # Strip the trailing slash
    dir_path="${dir_path%/}"
    
    parent_dir=$(dirname "$dir_path")
    orig_name=$(basename "$dir_path")
    
    # Replace the first occurrence of 'bizz-' with '0'
    new_name="${orig_name/bizz-/0}"
    
    echo "Renaming: $orig_name -> $new_name"
    mv "$parent_dir/$orig_name" "$parent_dir/$new_name"
done

shopt -u nullglob
echo "Renaming complete!"
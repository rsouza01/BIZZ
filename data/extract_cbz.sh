#!/bin/bash

# Define the password
PASS="https://revistabizz.blogspot.com"

# Loop through all .cbz files
for file in *.cbz; do
    # Skip if no .cbz files are found
    [ -e "$file" ] || continue

    # Strip the .cbz extension for the folder name
    dir_name="${file%.cbz}"

    echo "Processing: $file"

    # Create the target directory
     mkdir -p "$dir_name"

    # Extract using unzip
    # -P: specify password
    # -d: target directory
    # -q: quiet mode
    unzip -P "$PASS" -q "$file" -d "$dir_name"

    if [ $? -eq 0 ]; then
        echo "Successfully extracted to $dir_name"
    else
        echo "Error: Extraction failed for $file. Check the password or file integrity."
        # Optional: remove the empty directory if extraction failed
        rmdir "$dir_name" 2>/dev/null
    fi

    echo "--------------------------"
done

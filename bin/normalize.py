#!/usr/bin/python3


import re
from pathlib import Path

def natural_sort_key(s):
    """Splits strings into text and integers for natural alphanumeric sorting."""
    return [int(text) if text.isdigit() else text.lower()
            for text in re.split(r'(\d+)', str(s))]

def normalize_page_numbers(base_directory):
    data_dir = Path(base_directory)

    # Iterate through all subdirectories
    for folder in filter(Path.is_dir, data_dir.iterdir()):
        images = sorted(folder.glob('*.jpg'), key=natural_sort_key)
        
        if not images:
            continue

        temp_paths = []
        
        # First pass: Rename to temporary names to avoid collision overwrites
        for i, img_path in enumerate(images, start=1):
            temp_path = img_path.with_name(f"temp_rn_{i:03d}.jpg")
            img_path.rename(temp_path)
            temp_paths.append((temp_path, i))

        # Second pass: Rename to the final zero-padded format
        for temp_path, i in temp_paths:
            final_path = temp_path.with_name(f"{i:03d}.jpg")
            temp_path.rename(final_path)
            
    print("Renaming complete.")

if __name__ == "__main__":
    normalize_page_numbers('../data')
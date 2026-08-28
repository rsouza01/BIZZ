#!/usr/bin/python3

import re
from pathlib import Path

def generate_gallery_metadata(data_directory):
    data_dir = Path(data_directory)
    
    # Matches: 3 digits (issue), hyphen, string (month), hyphen, 4 digits (year)
    # Example: 158-setembro-1998-bob-marley -> Group 1: 158, Group 2: setembro, Group 3: 1998
    pattern = re.compile(r'^(\d{3})-([^-]+)-(\d{4})')
    
    for folder in filter(Path.is_dir, data_dir.iterdir()):
        match = pattern.match(folder.name)
        
        if match:
            issue_raw = match.group(1)
            month_raw = match.group(2)
            year = match.group(3)
            
            # Format issue number (e.g., '000' -> '00', '032' -> '32', '158' -> '158')
            issue_num = int(issue_raw)
            formatted_issue = f"{issue_num:02d}"
            
            # Capitalize month (junho -> Junho, março -> Março)
            month = month_raw.capitalize()
            
            # Construct title matching your mock-up
            title = f"#{formatted_issue} ({month} {year})"
            
            # Construct front matter
            front_matter = f"---\ntitle: \"{title}\"\n---\n"
            
            index_path = folder / "index.md"
            
            # Write only if it doesn't already exist to prevent accidental overwrites
            if not index_path.exists():
                index_path.write_text(front_matter, encoding='utf-8')
                print(f"Created: {index_path} with title '{title}'")
            else:
                print(f"Skipped (already exists): {index_path}")
        else:
            print(f"Skipped (unrecognized format): {folder.name}")

if __name__ == "__main__":
    # Adjust this path if running from a different working directory
    generate_gallery_metadata("../data")
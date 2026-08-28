for dir in ../data/*/; do
    [ -d "$dir" ] || continue 
    mag_name=$(basename "$dir")
    
    cat <<EOF > "$dir/index.md"
---
title: "$mag_name"
type: "magazines"
layout: "single"
---
EOF
done
#!/bin/bash

topic=$1

if [ -z "$topic" ]; then
    echo "Usage: $0 <topic>"
    exit 1
fi

echo -e "Received topic: $topic"

OUTPUT=$(./fetch.sh "$topic")
echo -e "Generated output:\n$OUTPUT"

echo "Enriching markdown file..." 
source bin/activate
python3 enrich.py $OUTPUT
deactivate

git add ../../**/*.md

# get the new .md filename from the git staged
NEW_FILE=$(git diff --cached --name-only | grep -E "^_posts/.*\.md$" | head -n 1)
NEW_FILE=$(basename $NEW_FILE)

git commit -m "feat(poem): Added $NEW_FILE"

# git push origin main

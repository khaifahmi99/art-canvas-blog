#!/bin/bash

topic=$1

# exit if no topic specified
if [ -z "$topic" ]; then
  echo "Usage: $0 '<topic>'"
  exit 1
fi

# create a temp folder
WORKDIR=$(mktemp -d)
TOPIC_SAFE=$(echo $topic | sed 's/ /-/g')

OUTPUT_PATH="$WORKDIR/$TOPIC_SAFE.md"

POST_DATA="{\"model\":\"poet-llama\",\"stream\":false,\"prompt\":\"$topic\"}"

curl -s -X POST "http://dev.jeffcott:11434/api/generate" \
  -H "Content-Type: application/json" \
  -d "$POST_DATA" | \
  jq -r .response > \
  $OUTPUT_PATH

echo -e $OUTPUT_PATH

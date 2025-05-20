#!/bin/bash

#get actual directory of the folder
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# Start the first project (admin - localhost:3000)
osascript <<EOF
tell application "Terminal"
    do script "cd \"$SCRIPT_DIR/../admin\" && npm run dev"
end tell
EOF

# Start the second project (nextrf2 - localhost:3001)
osascript <<EOF
tell application "Terminal"
    do script "cd \"$SCRIPT_DIR/../nextrf2\" && npm run dev"
end tell
EOF
#!/bin/bash

# Start the first project in another new Terminal window localhost:3000
osascript <<EOF
tell application "Terminal"
    do script "cd /Users/os/Documents/ntry555/ntry/admin && npm run dev"
end tell
EOF

# Start the second project in a new Terminal window localhost:3001
osascript <<EOF
tell application "Terminal"
    do script "cd /Users/os/Documents/ntry555/ntry/nextrf2 && npm run dev"
end tell
EOF

# Start the third project in a new Terminal window - Community Backend - localhost: 14000
osascript <<EOF
tell application "Terminal"
    do script "cd /Users/os/Documents/betwinner777/betwinner/backends/src/community && pnpm run dev:community"
end tell
EOF

# Start the fourth project in a new Terminal window - Admin Community Backend - localhost: 4000
osascript <<EOF
tell application "Terminal"
    do script "cd /Users/os/Documents/betwinner777/betwinner/backends/src/admin && pnpm run dev:agentcommunity"
end tell
EOF


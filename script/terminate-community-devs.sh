#!/bin/bash
PORTS=(3000 3001 14000 4000)


for PORT in "${PORTS[@]}"; do

    PID=$(lsof -t -i :$PORT)
    
    if [ -n "$PID" ]; then
        echo "Killing process $PID on port $PORT"
        kill -9 $PID  
    else
        echo "No process found on port $PORT"
    fi
done

echo "All specified processes have been terminated."

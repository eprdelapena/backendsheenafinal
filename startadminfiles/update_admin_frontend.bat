@echo off
:: Start sheenaadmin in a new terminal and run git pull
start "sheenaadmin" cmd /k "cd /d C:\codebase\adminsheenamain\sheenaadmin && git pull && npm install && npm run build"


echo === Both processes started in separate terminals ===

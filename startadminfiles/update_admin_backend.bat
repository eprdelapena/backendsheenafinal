@echo off
:: Start backendsheenamain in another terminal and run only git pull
start "backendsheenamain" cmd /k "cd /d "C:\codebase\backendsheena2main" && git pull && npm install"


echo === Both processes started in separate terminals ===

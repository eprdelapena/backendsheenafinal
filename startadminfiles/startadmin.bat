@echo off

:: Run updateipbackend.bat in separate windows
start "" "C:\Users\deanaurelius\OneDrive\Desktop\startadminfiles\UpdateIP\updateipbackend.bat"
start "" "C:\Users\deanaurelius\OneDrive\Desktop\startadminfiles\UpdateIP\updateipfrontend.bat"

:: Start sheenaadmin in a new terminal
start "sheenaadmin" cmd /k "cd /d "C:\codebase\adminsheenamain\sheenaadmin" && npm run dev:local"

:: Start backendsheenamain in another terminal
start "backendsheenamain" cmd /k "cd /d "C:\codebase\backendsheena2main" && npm run esbuilder"

echo === Both processes started in separate terminals ===

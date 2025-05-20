# Path to your TypeScript constant file
$tsFile = "C:\codebase\backendsheena2main\src\constant\constant_main.ts"

Write-Host "`n--- Starting Script ---"

# Check if the file exists
if (!(Test-Path $tsFile)) {
    Write-Host "❌ File not found: $tsFile"
    Pause
    exit
}

Write-Host "✅ File found: $tsFile"

# Get IPv4 address (excluding loopback and 169.x addresses)
$ip = (Get-NetIPAddress -AddressFamily IPv4 `
       | Where-Object { $_.IPAddress -notlike '169.*' -and $_.IPAddress -ne '127.0.0.1' } `
       | Select-Object -First 1 -ExpandProperty IPAddress)

Write-Host "🧠 Detected IP: $ip"

# Create the replacement line
$newLine = "  IPAddress=`"http://$ip`""
Write-Host "🔄 Replacement line: $newLine"

# Read the content of the TypeScript file
$content = Get-Content $tsFile

# Replace the line containing IPAddress
$content = $content -replace 'IPAddress\s*=\s*"http:\/\/[0-9\.]+\"', $newLine

# Save the modified content back to the TypeScript file
Set-Content -Path $tsFile -Value $content

Write-Host "✅ Replacement complete. Check the file for changes."


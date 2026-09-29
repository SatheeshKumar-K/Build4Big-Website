# Automated Sync Script: D:\B2B001-unique_constructions\dist -> Build4Big -> Live Deploy
param(
  [string]$SourceDist = "D:\B2B001-unique_constructions\dist\uniq-construction\browser",
  [string]$TargetDir = "public\client\uniqconstruction"
)

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host " Syncing Uniq Construction to Build4Big   " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

if (-not (Test-Path $SourceDist)) {
  Write-Error "Source directory not found: $SourceDist"
  exit 1
}

Write-Host "1. Copying files from $SourceDist to $TargetDir..." -ForegroundColor Yellow
if (-not (Test-Path $TargetDir)) {
  New-Item -ItemType Directory -Path $TargetDir -Force | Out-Null
}

Remove-Item -Path "$TargetDir\*" -Recurse -Force -ErrorAction SilentlyContinue
Copy-Item -Path "$SourceDist\*" -Destination $TargetDir -Recurse -Force
Remove-Item -Path "$TargetDir\assets\videos\hero-house.mp4.part" -Force -ErrorAction SilentlyContinue

Write-Host "2. Updating base href in index.html..." -ForegroundColor Yellow
$indexPath = "$TargetDir\index.html"
if (Test-Path $indexPath) {
  $content = Get-Content -Path $indexPath -Raw
  $updated = $content -replace '<base href="[^"]*">', '<base href="/client/uniqconstruction/">'
  Set-Content -Path $indexPath -Value $updated -NoNewline
  Write-Host "   Base href set to /client/uniqconstruction/" -ForegroundColor Green
}

Write-Host "3. Committing to git..." -ForegroundColor Yellow
git add -A
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
git commit -m "feat: auto-sync uniqconstruction build ($timestamp)"
git push origin main

Write-Host "4. Deploying to GitHub Pages (build4big.com)..." -ForegroundColor Yellow
npm run deploy

Write-Host "==========================================" -ForegroundColor Green
Write-Host " Successfully deployed to:                " -ForegroundColor Green
Write-Host " https://build4big.com/client/uniqconstruction/ " -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green

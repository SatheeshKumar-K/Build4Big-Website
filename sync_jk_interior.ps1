# Automated Sync Script: D:\B4B003_Jk_construction\jk-interior-angular\dist\jk-interior-angular\browser -> Build4Big -> Live Deploy
param(
  [string]$SourceDist = "D:\B4B003_Jk_construction\jk-interior-angular\dist\jk-interior-angular\browser",
  [string]$TargetDir = "public\client\jk_interior"
)

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host " Syncing JK Interior to Build4Big         " -ForegroundColor Cyan
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

Write-Host "2. Updating base href in index.html..." -ForegroundColor Yellow
$indexPath = "$TargetDir\index.html"
if (Test-Path $indexPath) {
  $content = Get-Content -Path $indexPath -Raw
  $updated = $content -replace '<base href="[^"]*"/?>', '<base href="/client/jk_interior/">'
  Set-Content -Path $indexPath -Value $updated -NoNewline
  Write-Host "   Base href set to /client/jk_interior/" -ForegroundColor Green
}

Write-Host "3. Committing to git..." -ForegroundColor Yellow
git add -A
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
git commit -m "feat: auto-sync jk_interior build ($timestamp)"
git push origin main

Write-Host "4. Deploying to GitHub Pages (build4big.com)..." -ForegroundColor Yellow
npm run deploy

Write-Host "==========================================" -ForegroundColor Green
Write-Host " Successfully deployed to:                " -ForegroundColor Green
Write-Host " https://build4big.com/client/jk_interior/ " -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green

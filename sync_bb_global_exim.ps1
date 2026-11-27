# Automated Sync Script: C:\Users\91967\Downloads\bb-exim-deploy / dist -> Build4Big -> Live Deploy
param(
  [string]$SourceDist = "C:\Users\91967\Downloads\bb-exim-deploy (1)",
  [string]$TargetDir = "public\client\BB_Global_Exim"
)

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host " Syncing BB Global Exim to Build4Big     " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# Fallback paths if user unzips to different location
if (-not (Test-Path $SourceDist)) {
  if (Test-Path "C:\Users\91967\Downloads\bb-exim-deploy") {
    $SourceDist = "C:\Users\91967\Downloads\bb-exim-deploy"
  } elseif (Test-Path "C:\Users\91967\Downloads\dist\dist\bb-exim-web\browser") {
    $SourceDist = "C:\Users\91967\Downloads\dist\dist\bb-exim-web\browser"
  } elseif (Test-Path "C:\Users\91967\Downloads\dist\dist\bb-global\browser") {
    $SourceDist = "C:\Users\91967\Downloads\dist\dist\bb-global\browser"
  } elseif (Test-Path "C:\Users\91967\Downloads\dist\browser") {
    $SourceDist = "C:\Users\91967\Downloads\dist\browser"
  } elseif (Test-Path "C:\Users\91967\Downloads\dist\index.html") {
    $SourceDist = "C:\Users\91967\Downloads\dist"
  } else {
    Write-Error "Source directory not found: $SourceDist"
    exit 1
  }
}

Write-Host "1. Copying files from $SourceDist to $TargetDir..." -ForegroundColor Yellow
if (-not (Test-Path $TargetDir)) {
  New-Item -ItemType Directory -Path $TargetDir -Force | Out-Null
}

Remove-Item -Path "$TargetDir\*" -Recurse -Force -ErrorAction SilentlyContinue
Copy-Item -Path "$SourceDist\*" -Destination $TargetDir -Recurse -Force

Write-Host "2. Updating base href in HTML files..." -ForegroundColor Yellow
$htmlFiles = Get-ChildItem -Path $TargetDir -Filter "*.html"
foreach ($file in $htmlFiles) {
  $content = [System.IO.File]::ReadAllText($file.FullName)
  $updated = $content -replace '<base href="[^"]*"/?>', '<base href="/client/BB_Global_Exim/">'
  [System.IO.File]::WriteAllText($file.FullName, $updated)
  Write-Host "   Base href set to /client/BB_Global_Exim/ in $($file.Name)" -ForegroundColor Green
}

Write-Host "2.1. Fixing relative asset & video paths in JavaScript bundle..." -ForegroundColor Yellow
Get-ChildItem -Path "$TargetDir" -Filter "main-*.js" | ForEach-Object {
  $jsContent = [System.IO.File]::ReadAllText($_.FullName)
  $fixedJs = $jsContent.Replace('"/assets/', '"assets/').Replace("'/assets/", "'assets/").Replace('"/videos/', '"videos/').Replace("'/videos/", "'videos/")
  [System.IO.File]::WriteAllText($_.FullName, $fixedJs)
  Write-Host "   Fixed asset paths in $($_.Name)" -ForegroundColor Green
}

Write-Host "3. Committing to git..." -ForegroundColor Yellow
Get-ChildItem -Path ".git" -Filter "*.lock" -Recurse -Force | Remove-Item -Force -ErrorAction SilentlyContinue
git add -A
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
git commit -m "feat: auto-sync BB_Global_Exim build ($timestamp)"
git push origin main

Write-Host "4. Deploying to GitHub Pages (build4big.com)..." -ForegroundColor Yellow
npm run deploy

Write-Host "==========================================" -ForegroundColor Green
Write-Host " Successfully deployed to:                " -ForegroundColor Green
Write-Host " https://build4big.com/client/BB_Global_Exim/ " -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green

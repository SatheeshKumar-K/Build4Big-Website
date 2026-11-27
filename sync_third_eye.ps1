# Automated Sync Script: D:\B4B004_third_eye_web\dist -> Build4Big -> Live Deploy
param(
  [string]$SourceDist = "D:\B4B004_third_eye_web\dist\third-eye-app\browser",
  [string]$TargetDir = "public\client\third_eye"
)

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host " Syncing Third Eye to Build4Big           " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# Fallback paths
if (-not (Test-Path $SourceDist)) {
  if (Test-Path "D:\B4B004_third_eye_web\dist\browser") {
    $SourceDist = "D:\B4B004_third_eye_web\dist\browser"
  } elseif (Test-Path "D:\B4B004_third_eye_web\dist\index.html") {
    $SourceDist = "D:\B4B004_third_eye_web\dist"
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
Copy-Item -Path "$SourceDist\*" -Destination $TargetDir -Recurse -Force -ErrorAction SilentlyContinue

# Fallback from zip for any locked video files
$zipPath = "D:\B4B004_third_eye_web\dist\third-eye-dist.zip"
if (Test-Path $zipPath) {
  try {
    Add-Type -AssemblyName System.IO.Compression.FileSystem -ErrorAction SilentlyContinue
    $zip = [System.IO.Compression.ZipFile]::OpenRead($zipPath)
    $heroEntry = $zip.Entries | Where-Object { $_.FullName -like "*hero-bg.mp4" -and $_.FullName -notlike "*perfect*" } | Select-Object -First 1
    if ($heroEntry -and (-not (Test-Path "$TargetDir\assets\video\hero-bg.mp4"))) {
      if (-not (Test-Path "$TargetDir\assets\video")) { New-Item -ItemType Directory -Path "$TargetDir\assets\video" -Force | Out-Null }
      [System.IO.Compression.ZipFileExtensions]::ExtractToFile($heroEntry, "$TargetDir\assets\video\hero-bg.mp4", $true)
      Write-Host "   Extracted hero-bg.mp4 from zip fallback" -ForegroundColor Green
    }
    $zip.Dispose()
  } catch {
    Write-Warning "Could not extract fallback from zip: $_"
  }
}

Write-Host "2. Updating base href in HTML files..." -ForegroundColor Yellow
$htmlFiles = Get-ChildItem -Path $TargetDir -Filter "*.html"
foreach ($file in $htmlFiles) {
  $content = [System.IO.File]::ReadAllText($file.FullName)
  $updated = $content -replace '<base href="[^"]*"/?>', '<base href="/client/third_eye/">'
  [System.IO.File]::WriteAllText($file.FullName, $updated)
  Write-Host "   Base href set to /client/third_eye/ in $($file.Name)" -ForegroundColor Green
}

Write-Host "2.1. Fixing relative asset & video paths in JavaScript and CSS bundles..." -ForegroundColor Yellow
Get-ChildItem -Path "$TargetDir" -Include "*.js", "*.css" -Recurse | ForEach-Object {
  $content = [System.IO.File]::ReadAllText($_.FullName)
  $fixed = $content.Replace('"/assets/', '"assets/').Replace("'/assets/", "'assets/").Replace('"/video/', '"video/').Replace("'/video/", "'video/")
  if ($fixed -ne $content) {
    [System.IO.File]::WriteAllText($_.FullName, $fixed)
    Write-Host "   Fixed asset paths in $($_.Name)" -ForegroundColor Green
  }
}

Write-Host "3. Committing to git..." -ForegroundColor Yellow
Get-ChildItem -Path ".git" -Filter "*.lock" -Recurse -Force | Remove-Item -Force -ErrorAction SilentlyContinue
git add -A
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
git commit -m "feat: auto-sync third_eye build ($timestamp)"
git push origin main

Write-Host "4. Deploying to GitHub Pages (build4big.com)..." -ForegroundColor Yellow
npm run deploy

Write-Host "==========================================" -ForegroundColor Green
Write-Host " Successfully deployed to:                " -ForegroundColor Green
Write-Host " https://build4big.com/client/third_eye/  " -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green

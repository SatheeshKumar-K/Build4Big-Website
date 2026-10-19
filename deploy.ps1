Write-Host "==========================================" -ForegroundColor Cyan
Write-Host " Building & Deploying to GitHub Pages     " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

Write-Host "1. Building Angular app..." -ForegroundColor Yellow
& npx ng build --base-href /
if ($LASTEXITCODE -ne 0) {
  Write-Error "Angular build failed."
  exit 1
}

$browserDir = "dist\build4big\browser"
if (-not (Test-Path $browserDir)) {
  Write-Error "Build output directory not found: $browserDir"
  exit 1
}

Write-Host "2. Adding CNAME and .nojekyll..." -ForegroundColor Yellow
Set-Content -Path "$browserDir\CNAME" -Value "build4big.com`n" -NoNewline
New-Item -ItemType File -Force -Path "$browserDir\.nojekyll" | Out-Null

# Also copy index.html to 404.html for SPA routing on GitHub Pages
Copy-Item -Path "$browserDir\index.html" -Destination "$browserDir\404.html" -Force

Write-Host "3. Creating deployment commit for gh-pages..." -ForegroundColor Yellow
$tempIndex = "$PWD\.git\deploy_index"
if (Test-Path $tempIndex) { Remove-Item $tempIndex -Force }

$env:GIT_INDEX_FILE = $tempIndex
git --work-tree=$browserDir add --all
$tree = (git write-tree).Trim()
git fetch origin gh-pages
$parent = (git rev-parse origin/gh-pages).Trim()
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$commit = (git commit-tree $tree -p $parent -m "Deploy to GitHub Pages ($timestamp)").Trim()

Write-Host "4. Pushing to origin/gh-pages..." -ForegroundColor Yellow
git push origin "$($commit):refs/heads/gh-pages"

Remove-Item $tempIndex -Force -ErrorAction SilentlyContinue
$env:GIT_INDEX_FILE = $null

Write-Host "==========================================" -ForegroundColor Green
Write-Host " Successfully deployed to build4big.com!  " -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green

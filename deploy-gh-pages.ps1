# Deploy the static build to GitHub Pages (gh-pages branch).
# Use this because GitHub Actions is unavailable on the current plan/billing.
#
# Usage (from repo root):
#   powershell -ExecutionPolicy Bypass -File .\deploy-gh-pages.ps1
#
# If github.com is unreachable directly, set a proxy first, e.g.:
#   $env:HTTP_PROXY="http://127.0.0.1:7897"; $env:HTTPS_PROXY="http://127.0.0.1:7897"

$ErrorActionPreference = "Stop"
$repo = "https://github.com/sjc-tommy/memofigura.git"
$root = $PSScriptRoot
$dist = Join-Path $root "dist"
$tmp  = Join-Path $root "_deploy"

Write-Host "==> Building static site (vite)..."
Push-Location $root
try { npx vite build } finally { Pop-Location }
if ($LASTEXITCODE -ne 0) { throw "vite build failed" }

Write-Host "==> Adding SPA 404 fallback..."
Copy-Item (Join-Path $dist "index.html") (Join-Path $dist "404.html") -Force

if (-not (Test-Path $tmp)) {
    Write-Host "==> Cloning into _deploy..."
    git clone $repo $tmp | Out-Null
    Push-Location $tmp
    try {
        git checkout --orphan gh-pages | Out-Null
        git rm -rf . | Out-Null
    } finally { Pop-Location }
} else {
    Write-Host "==> Reusing existing clone in _deploy..."
    Push-Location $tmp
    try {
        git fetch origin --quiet
        git checkout -B gh-pages --quiet
    } finally { Pop-Location }
}

Write-Host "==> Mirroring dist/ into _deploy/ (keeps .git)..."
robocopy $dist $tmp /MIR /XD (Join-Path $tmp ".git") /NFL /NDL /NJH /NJS | Out-Null
if ($LASTEXITCODE -ge 8) { throw "robocopy failed with code $LASTEXITCODE" }

Push-Location $tmp
try {
    git add -A
    git -c user.name="sjc-tommy" -c user.email="sjc-tommy@users.noreply.github.com" commit -m "Deploy static build to GitHub Pages" | Out-Null
    if ($LASTEXITCODE -ne 0) { Write-Host "==> Nothing changed; skipping push." }
    else { git push --force origin gh-pages }
} finally {
    Pop-Location
}

Write-Host "==> Done. Site: https://sjc-tommy.github.io/memofigura/"

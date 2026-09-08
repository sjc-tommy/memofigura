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
$tmp  = Join-Path $PSScriptRoot "_deploy"

Write-Host "==> Building static site (vite)..."
npx vite build

Write-Host "==> Adding SPA 404 fallback..."
Copy-Item (Join-Path $PSScriptRoot "dist\index.html") (Join-Path $PSScriptRoot "dist\404.html") -Force

if (Test-Path $tmp) { Remove-Item -Recurse -Force -LiteralPath $tmp }

Write-Host "==> Cloning into temp dir..."
git clone $repo $tmp | Out-Null

Push-Location $tmp
try {
    git checkout --orphan gh-pages | Out-Null
    git rm -rf . | Out-Null
    Copy-Item -Recurse (Join-Path $PSScriptRoot "dist\*") .
    git add -A
    git -c user.name="sjc-tommy" -c user.email="sjc-tommy@users.noreply.github.com" commit -m "Deploy static build to GitHub Pages" | Out-Null
    git push --force origin gh-pages
} finally {
    Pop-Location
}

Write-Host "==> Done. Site: https://sjc-tommy.github.io/memofigura/"

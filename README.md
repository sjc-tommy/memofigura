# MemoFigura

Custom 3D figurine storefront built from customer photos. React 19 + Vite + Tailwind,
with an optional Express backend for currency and translation proxying.

**Live (GitHub Pages):** https://sjc-tommy.github.io/memofigura/

## Quick start

```bash
npm install
npm run dev      # Express + Vite on http://localhost:3000
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Runs `server.ts` (Express + Vite middleware) on port 3000 |
| `npm run build` | Vite client build into `dist/` plus `server.ts` bundled to `dist/server.cjs` |
| `npm start` | Serves the production build via `dist/server.cjs` |
| `npm run lint` | `tsc --noEmit` type check |

## Configuration

All site config lives in `.env` (committed - it contains no secrets):

```
VITE_SITE_URL=https://sjc-tommy.github.io/memofigura
```

`VITE_SITE_URL` drives canonical URLs, Open Graph tags, JSON-LD, `sitemap.xml` and
`robots.txt`. **When you get a real domain, change this one line** to
`https://yourdomain.com` and set `BASE_PATH = '/'` in `vite.config.ts`.

`vite.config.ts` also holds `BASE_PATH`, which must match the sub-path the site is
served from (`/memofigura/` for GitHub Pages project sites, `/` for a custom domain).

## Currency and translation APIs

Both features use the free apihz.cn endpoints.

- `src/services/currencyApi.ts` - live FX rates. Tries `/api/rates` first, then falls
  back to calling apihz.cn directly from the browser.
- `src/services/translateApi.ts` - UI translation. Tries `/api/translate` first, then
  falls back to a direct browser call, with results cached in `.translate-cache.json`.

apihz.cn sends `Access-Control-Allow-Origin: *`, so the direct fallback works on a
purely static host. **This means GitHub Pages needs no backend** - live rates and
multi-language switching both work there without `server.ts`.

The Express server and the Vite dev plugin exist only to proxy these calls
server-side when running locally, which keeps the API key out of the browser bundle.

Translation can feel slow on first use: every visible string is sent to apihz.cn one
request at a time, and the free tier is rate-limited. Results are cached afterwards,
so repeat visits are fast.

## Deployment (GitHub Pages)

GitHub Actions is not available on this account, so deployment pushes a static build
to the orphan `gh-pages` branch directly:

```powershell
# if github.com is unreachable directly, set a proxy first
$env:HTTP_PROXY  = "http://127.0.0.1:7897"
$env:HTTPS_PROXY = "http://127.0.0.1:7897"

powershell -ExecutionPolicy Bypass -File .\deploy-gh-pages.ps1
```

The script builds, copies `dist/index.html` to `dist/404.html` (SPA deep-link
fallback - Pages has no rewrite rules), then commits and force-pushes `gh-pages`.

`.github/workflows/deploy.yml` is present for when Actions becomes available; it is
not currently used.

### Using a custom domain later

1. Set `VITE_SITE_URL` in `.env` and `BASE_PATH = '/'` in `vite.config.ts`.
2. Add a `CNAME` file containing your domain to the `gh-pages` branch.
3. Point DNS at GitHub: a `CNAME` to `sjc-tommy.github.io`, or `A` records to
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
4. Redeploy.

## Project layout

```
src/
  components/     Navbar, Footer, reviews, FAQ, sitemap modal, translator
  context/        Locale + currency providers
  pages/          Route-level pages (product, gallery, reviews, policies, refer)
  services/       seo.ts, currencyApi.ts, translateApi.ts
  types/          Shared TypeScript types
public/           sitemap.xml + robots.txt templates (domain rewritten at build time)
server.ts         Optional Express backend (dev + self-hosted production)
```

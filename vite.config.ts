import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, loadEnv, Plugin} from 'vite';

function currencyApiDevPlugin(): Plugin {
  return {
    name: 'currency-api-dev-plugin',
    configureServer(server) {
      server.middlewares.use('/api/rates', async (_req, res) => {
        try {
          const rates: Record<string, number> = {
            USD: 1,
            EUR: 0.8611,
            GBP: 0.745,
            CAD: 1.36,
            AUD: 1.52,
            CHF: 0.89,
            CNY: 7.12,
          };
          let uptime = new Date().toISOString().replace('T', ' ').substring(0, 19);

          try {
            const controller = new AbortController();
            const timer = setTimeout(() => controller.abort(), 3500);
            const r = await fetch(
              'https://cn.apihz.cn/api/jinrong/huilv.php?id=10019329&key=68c6ddd3e38d4bdcd64db29a3809eea8&from=USD&to=EUR&money=1',
              { signal: controller.signal }
            );
            clearTimeout(timer);
            const d = await r.json();
            if (d && d.code === 200 && d.rate) {
              rates.EUR = parseFloat(d.rate);
              if (d.uptime) uptime = d.uptime;
            }
          } catch {
            // fallback
          }

          res.setHeader('Content-Type', 'application/json');
          res.end(
            JSON.stringify({
              code: 200,
              base: 'USD',
              rates,
              uptime,
              source: 'cn.apihz.cn (Vite Dev Proxy)',
            })
          );
        } catch {
          res.setHeader('Content-Type', 'application/json');
          res.end(
            JSON.stringify({
              code: 200,
              base: 'USD',
              rates: { USD: 1, EUR: 0.8611, GBP: 0.745, CAD: 1.36, AUD: 1.52, CHF: 0.89, CNY: 7.12 },
              uptime: '2026-09-07 08:00:01',
              source: 'cn.apihz.cn (fallback)',
            })
          );
        }
      });
    },
  };
}

// GitHub Pages 部署在子路径下；以后换成自定义域名时改成 '/'
const BASE_PATH = '/memofigura/';

// public/sitemap.xml 与 public/robots.txt 里写的占位域名
const TEMPLATE_ORIGIN = 'https://memofigura.com';

function resolveSiteUrl(mode: string, base: string): string {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const configured = env.VITE_SITE_URL?.replace(/\/$/, '');
  if (configured) return configured;
  const suffix = base.replace(/\/$/, '');
  return `https://sjc-tommy.github.io${suffix}`;
}

const SEO_FILE_NAMES = ['sitemap.xml', 'robots.txt'];

function renderSeoTemplate(file: string, siteUrl: string): string | null {
  try {
    return fs.readFileSync(file, 'utf8').split(TEMPLATE_ORIGIN).join(siteUrl);
  } catch {
    return null;
  }
}

// sitemap.xml / robots.txt must carry the real deployed origin, which changes
// between GitHub Pages and a future custom domain. Both are generated from the
// templates in public/ using VITE_SITE_URL instead of being shipped verbatim.
function seoFilesPlugin(base: string): Plugin {
  let siteUrl = '';

  return {
    name: 'seo-files-plugin',
    configResolved(config) {
      siteUrl = resolveSiteUrl(config.mode, base);
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const name = SEO_FILE_NAMES.find((n) => (req.url || '').split('?')[0].endsWith('/' + n));
        if (!name) return next();
        const body = renderSeoTemplate(`public/${name}`, siteUrl);
        if (body === null) return next();
        res.setHeader('Content-Type', name.endsWith('.xml') ? 'application/xml' : 'text/plain');
        res.end(body);
      });
    },
    closeBundle() {
      for (const name of SEO_FILE_NAMES) {
        const body = renderSeoTemplate(`public/${name}`, siteUrl);
        if (body === null) continue;
        fs.writeFileSync(`dist/${name}`, body);
      }
    },
  };
}

export default defineConfig(() => {
  return {
    // GitHub Pages 部署在子路径 /memofigura/ 下，资源需带该前缀
    base: BASE_PATH,
    plugins: [react(), tailwindcss(), currencyApiDevPlugin(), seoFilesPlugin(BASE_PATH)],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      // Ignore runtime artifacts so translation-cache writes / dev logs don't trigger full page reloads.
      watch: process.env.DISABLE_HMR === 'true' ? null : {
        ignored: ['**/.translate-cache.json', '**/dev.log', '**/dist/**', '**/node_modules/**'],
      },
    },
  };
});

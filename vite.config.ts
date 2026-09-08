import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

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

export default defineConfig(() => {
  return {
    // GitHub Pages 部署在子路径 /memofigura/ 下，资源需带该前缀
    base: '/memofigura/',
    plugins: [react(), tailwindcss(), currencyApiDevPlugin()],
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

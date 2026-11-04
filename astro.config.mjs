import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

const noindexPaths = new Set(['/sign-in/', '/delete-account/']);

export default defineConfig({
  site: 'https://proworker.co',
  output: 'static',
  integrations: [
    react(),
    sitemap({
      filter: (page) => {
        try {
          const path = new URL(page).pathname;
          return !noindexPaths.has(path);
        } catch {
          return true;
        }
      },
      serialize(item) {
        const path = new URL(item.url).pathname;
        const priorityByPath = {
          '/': 1.0,
          '/workers-in-india/': 0.95,
          '/store/': 0.9,
          '/search/': 0.9,
          '/partner/': 0.7,
          '/partner/guide/': 0.55,
          '/privacy/': 0.3,
          '/child-safety/': 0.3,
        };

        return {
          ...item,
          changefreq: path === '/' ? 'weekly' : 'monthly',
          priority: priorityByPath[path] ?? 0.5,
          lastmod: new Date().toISOString(),
        };
      },
    }),
  ],
});

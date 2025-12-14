import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from "@astrojs/cloudflare";

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es-ES',
          en: 'en-US'
        }
      },
      filter: (page) => !page.includes('/construction'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date()
    })
  ],
  site: 'https://blog.wanetty.com',
  output: "server",
  adapter: cloudflare({
    imageService: 'compile',
  }),
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
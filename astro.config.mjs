import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from "@astrojs/cloudflare";

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), sitemap()],
  site: 'https://blog.wanetty.com',
  output: "server",
  adapter: cloudflare({
    routes: {
      extend: {
        exclude: [{ pattern: '/pages/blog/*' }], 
      }
    },
  }),
});
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  site: 'https://wanetty.github.io',
  output: "server",
  adapter: cloudflare({
    routes: {
      extend: {
        exclude: [{ pattern: '/pages/blog/*' }], 
      }
    },
  }),
});
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface Window {
    Alpine: import('alpinejs').Alpine;
  }

  type Runtime = import('@astrojs/cloudflare').Runtime<Env>;

  declare namespace App {
    interface Locals extends Runtime {
      otherLocals: {
        test: string;
      };
    }
  }
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import AutoImport from "astro-auto-import";
import mdx from "@astrojs/mdx";
import { AppConfig } from "./src/lib/utils";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: AppConfig.site,
  prefetch: {
    prefetchAll: true,
  },
  experimental: {
    contentCollectionCache: true,
    actions: true,
  },
  integrations: [
    tailwind(),
    AutoImport({
      imports: ["./src/components/Code.astro"],
    }),
    mdx(),
    sitemap(),
  ],
  markdown: {
    shikiConfig: {
      theme: "catppuccin-mocha",
      wrap: true,
    },
  },
});

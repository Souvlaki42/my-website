import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import AutoImport from "astro-auto-import";
import mdx from "@astrojs/mdx";
import { AppConfig } from "./src/lib/utils";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  site: AppConfig.site,
  prefetch: {
    prefetchAll: true
  },
  experimental: {
    actions: true
  },
  integrations: [tailwind(), AutoImport({
    imports: ["./src/components/Code.astro"]
  }), mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: "catppuccin-mocha",
      wrap: true
    }
  },
  devToolbar: {
    enabled: false
  }
});
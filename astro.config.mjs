import { defineConfig, envField } from "astro/config";
import tailwind from "@astrojs/tailwind";
import AutoImport from "astro-auto-import";
import mdx from "@astrojs/mdx";
import { AppConfig } from "./src/lib/utils";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel/serverless";

import swup from "@swup/astro";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  site: AppConfig.site,
  prefetch: {
    prefetchAll: true
  },
  experimental: {
    actions: true,
    env: {
      schema: {
        GITHUB_TOKEN: envField.string({
          context: "server",
          access: "secret"
        })
      }
    }
  },
  integrations: [
    tailwind(),
    AutoImport({
      imports: ["./src/components/Code.astro"]
    }),
    mdx(),
    sitemap(),
    swup()
  ],
  markdown: {
    shikiConfig: {
      theme: "catppuccin-mocha",
      wrap: true
    }
  }
});

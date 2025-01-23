import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel";
import swup from "@swup/astro";
import AutoImport from "astro-auto-import";
import { defineConfig, envField } from "astro/config";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel(),
  site: "https://souvlaki.me",
  prefetch: {
    prefetchAll: true
  },
  env: {
    schema: {
      GITHUB_TOKEN: envField.string({ context: "server", access: "secret" }),
      SHOW_DRAFTS: envField.boolean({
        context: "server",
        access: "public",
        default: process.env.NODE_ENV !== "production"
      })
    }
  },
  integrations: [
    tailwind(),
    AutoImport({
      imports: ["./src/components/Code.astro"]
    }),
    mdx(),
    sitemap({
      xslURL: "/sitemap.xsl"
    }),
    swup({
      progress: true,
      accessibility: true,
      forms: true,
      cache: false,
      preload: {
        hover: true,
        visible: false
      },
      smoothScrolling: true
    })
  ],
  markdown: {
    syntaxHighlight: "shiki",
    gfm: true,
    smartypants: true,
    shikiConfig: {
      theme: "catppuccin-mocha",
      wrap: true
    }
  }
});

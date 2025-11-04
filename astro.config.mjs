// @ts-check

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";
import rehypeExternalLinks from "rehype-external-links";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  env: {
    schema: {
      SITE_NAME: envField.string({ context: "server", access: "public" }),
      SITE_DESCRIPTION: envField.string({
        context: "server",
        access: "public",
      }),
    },
  },
  site: "https://moulas.dev",
  redirects: {
    "/github": "https://github.com/Souvlaki42",
    "/twitter": "https://x.com/souvlaki42",
    "/bluesky": "https://bsky.app/profile/moulas.dev",
  },
  adapter: vercel(),
  integrations: [react(), sitemap()],
  devToolbar: { enabled: false },
  markdown: {
    syntaxHighlight: "shiki",
    gfm: true,
    smartypants: true,
    shikiConfig: {
      theme: "catppuccin-mocha",
      wrap: true,
    },
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: "_blank",
          rel: ["noopener", "noreferrer"],
        },
      ],
    ],
  },
});

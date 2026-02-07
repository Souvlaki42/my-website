// @ts-check

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";
import rehypeExternalLinks from "rehype-external-links";
import { objectKeys, TOP_BANNER_OPTIONS } from "./src/lib/utils";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  env: {
    schema: {
      SITE_NAME: envField.string({
        context: "server",
        access: "public",
        optional: false,
      }),
      SITE_DESCRIPTION: envField.string({
        context: "server",
        access: "public",
        optional: false,
      }),
      TOP_BANNER: envField.enum({
        context: "server",
        access: "public",
        values: objectKeys(TOP_BANNER_OPTIONS),
        optional: true,
        default: "DISABLED",
      }),
      GITHUB_TOKEN: envField.string({
        context: "server",
        access: "secret",
        optional: false,
      }),
    },
  },
  site: "https://moulas.dev",
  redirects: {
    "/github": "https://github.com/Souvlaki42",
    "/twitter": "https://x.com/souvlaki42",
    "/bluesky": "https://bsky.app/profile/moulas.dev",
    "/discord": "https://discord.gg/gjkj3gMBB7",
    "/linkedin": "https://www.linkedin.com/in/ilias-moulas-736902220/",
  },
  output: "server",
  adapter: vercel({
    devImageService: "sharp",
  }),
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

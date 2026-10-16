// @ts-check

import { satteri } from "@astrojs/markdown-satteri";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";

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
        values: ["DISABLED", "MAINTENANCE", "CONSTRUCTION"],
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
    // social media
    "/github": "https://github.com/Souvlaki42",
    "/twitter": "https://x.com/souvlaki42",
    "/bluesky": "https://bsky.app/profile/moulas.dev",
    "/discord": "https://discord.gg/gjkj3gMBB7",
    "/linkedin": "https://linkedin.com/in/ilias-moulas-736902220/",
    // referrals
    "/sponsor": "https://github.com/sponsors/Souvlaki42",
    "/codecrafters": "https://app.codecrafters.io/r/curious-reindeer-704519",
  },
  output: "static",
  adapter: vercel({
    imageService: true,
    devImageService: "sharp",
  }),
  integrations: [react({ compiler: true }), sitemap(), mdx()],
  devToolbar: { enabled: true },
  markdown: {
    syntaxHighlight: "shiki",
    processor: satteri({
      features: { gfm: true, smartPunctuation: true },
    }),
    shikiConfig: {
      themes: {
        dark: "catppuccin-mocha",
        light: "catppuccin-latte",
      },
      wrap: true,
    },
  },
});

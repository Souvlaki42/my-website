// @ts-check

import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";

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
  integrations: [react()],
});

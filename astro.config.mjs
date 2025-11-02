// @ts-check

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
  redirects: {
    "/github": "https://github.com/Souvlaki42",
    "/twitter": "https://x.com/souvlaki42",
    "/bluesky": "https://bsky.app/profile/moulas.dev",
  },
});

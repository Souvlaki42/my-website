// @ts-check
import { defineConfig, envField } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
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
});

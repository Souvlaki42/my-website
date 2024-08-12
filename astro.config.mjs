import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

export default defineConfig({
  integrations: [tailwind()],
  markdown: {
    shikiConfig: {
      wrap: true,
      themes: ["catppuccin-mocha", "dark-plus"],
    },
  },
});

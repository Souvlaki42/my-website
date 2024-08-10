import type { Config } from "tailwindcss";

const config = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      keyframes: {
        wave: {
          "0%": { "background-position-x": "1000px" },
          "100%": { "background-position-x": "0px" },
        },
        wave2: {
          "0%": { "background-position-x": "0px" },
          "100%": { "background-position-x": "1000px" },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;

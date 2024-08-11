/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        mocha: "#1e1e2e",
        "sky-blue": "#6CB4FF",
        "light-blue": "#94D0FF",
      },
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
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        mocha: "#1e1e2e",
        "sky-blue": "#6CB4FF",
        "light-blue": "#94D0FF"
      }
    }
  },
  plugins: []
};

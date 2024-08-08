import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
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
};
export default config;

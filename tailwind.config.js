/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        roman: ["Times New Roman", "serif"],
        outfit: ["Outfit", "sans-serif"],
      },
      colors: {
        "primary-bg": "#1d1e4e",
        "primary-text": "#13a3b0",
        "hover-text": "#f0d362",
        gray: {
          900: "#202225",
          800: "#2f3136",
          700: "#36393f",
          600: "#4f545c",
          400: "#d4d7dc",
          300: "#e3e5e8",
          200: "#ebedef",
          100: "#f2f3f5",
        },
      },
      spacing: {
        88: "22rem",
      },
    },
  },
  plugins: [],
};

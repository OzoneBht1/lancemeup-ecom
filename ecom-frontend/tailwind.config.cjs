/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        mono: ["Roboto Mono", "monospace"],
      },
      height: {
        "screen-minus-navbar": "calc(100vh - 80px)",
        navbar: "80px",
      },
      colors: {
        "purple-light": "#b291ff",
        "purple-dark": "#6b3bff",
        "purple-md": "#8b66ff",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Fredoka"', "cursive", "sans-serif"],
        sans: ['"Space Grotesk"', "sans-serif"],
      },
      colors: {
        fluxRed: "#E11D2E",
        fluxBlue: "#1218A6",
        fluxYellow: "#FFD60A",
        fluxCream: "#FAF8F5",
      },
      boxShadow: {
        brutal: "6px 6px 0px 0px #1218A6",
        "brutal-red": "6px 6px 0px 0px #E11D2E",
        "brutal-sm": "4px 4px 0px 0px #1218A6",
      },
    },
  },
  plugins: [],
};

const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "460px",
      btwnMdAndLg: "850px",
      btwnXlAnd2xl: "1400px",
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        primary: "#C9872B",
        secondary: {
          DEFAULT: "#B69575",
          opacity: "#161616",
          15: "rgba(182, 149, 117, 0.15)",
        },
        tertiary: "#0F0F0F",
        inputFieldColor: "rgba(0, 0, 0, 0.06)",
      },
      gridTemplateColumns: {
        contactSection: "1fr 2fr",
        mockrbiSidebar: "20% 80%",
      },
      fontFamily: {
        Lato: ["Lato", "sans-serif"],
        Bebas: ["Bebas Neue", "sans-serif"],
        Yeseva: ["Yeseva One", "sans-serif"],
        Abel: ["Abel", "sans-serif"],
      },
      animation: {
        moveShapes: "moveShapes 10s linear infinite",
      },
      keyframes: {
        moveShapes: {
          "0%": { transform: "translate3d(0, 0, 0)" },
          "100%": { transform: "translate3d(100vw, 100vh, 0)" },
        },
      },
    },
  },
  plugins: [],
};
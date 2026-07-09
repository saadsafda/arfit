/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  corePlugins: {
    preflight: false,
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  important: "#root",
  theme: {
    screens: {
      xs: "300px",
      xsm: "420px",
      mui_sm: "600px",
      mui_md: "900px",
      mui_lg: "1200px",
      ...defaultTheme.screens,
    },
    extend: {
      colors: {
        primarySaturated: "#648789",
        primaryLight: "#41B4BA",
        primary: "#408589",
        primaryDark: "#07545A",
        contrastText: "#fff",
        white: "#fff",
        pink: "#D66F75",
        purple: "#7F84C2",
        link: "#503ADA",
        "gray-100": "#ECECEC",
        "gray-200": "#DBDBDB",
        "gray-300": "#646464",
        "gray-400": "#646262",
        "green-300": "#08555A",
      },
      fontFamily: {
        Montserrat: ["Montserrat", "sans-serif"],
        Bungee: ["Bungee", "sans-serif"],
        Dhurjati: ["Dhurjati", "sans-serif"],
      },
    },
  },
  plugins: [],
};

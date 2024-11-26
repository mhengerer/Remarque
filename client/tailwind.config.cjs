/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{html,js,jsx}",
    "./src/components/**/*.{html,js,jsx}",
  ],
  // ...
  mode: "jit",
  // theme: {
  //   extend: {
  //     colors: {
  //       primary: "#E5DAB0",
  //       secondary: "#9ACEB4",
  //       tertiary: "#FB9390",
  //       quaternary: "#7E7356",
  //       "black-100": "#100d25",
  //       "black-200": "#090325",
  //       "white-100": "#f3f3f3",
  //     },
  //   },
  // },
  daisyui: {
    themes: ["pastel"],
  },
  plugins: [require("daisyui")],
};

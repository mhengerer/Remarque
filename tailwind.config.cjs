/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{jsx,js}"],
  mode:"jit",
  theme: {
    extend: {
      fontFamily: {
        dmSans: ["DM Sans", "sans-serif"]
      },
      display: ["group-hover"],
      background: ["bg-sky-100"]
    },
  },
  plugins: [],
}
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        kanit: ["Kanit", "sans-serif"],
        poppins :["Poppins", "sans-serif"],
        Nunito:["Nunito", "sans-serif"],
        Inter:[ "Inter", "sans-serif"],
        DMSans:["DM Sans", "sans-serif"],
        Poetsen:["Poetsen One", "sans-serif"]
        
      },
      fontWeight: {
        thin: 100,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900,
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
    screens: {
      sm: '480px',
      md: '760px',
      lg: '1400px',
      xl: '1600px'
    },
  },
  plugins: [],
}


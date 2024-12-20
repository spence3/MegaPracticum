/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './public/**/*.js'],
  theme: {
    extend: {
      colors: {
        uvuPrimary: '#275D38',
        uvuDarkGreen: '#00843D',
        uvuMediumGreen: '#4BA23F',
        uvuLightGreen: '#78BE1F'
      }
    },
  },
  plugins: [],
}


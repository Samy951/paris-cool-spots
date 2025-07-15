/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5f259f',
        'primary-light': '#7c3aed',
        'primary-dark': '#4c1d95',
      },
      fontFamily: {
        'nexa': ['Nexa', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 
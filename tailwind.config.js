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
        'sans': ['Nexa', 'Inter', 'sans-serif'], // Police par défaut
        'nexa': ['Nexa', 'Inter', 'sans-serif'], // Alias si besoin
      },
      fontWeight: {
        'thin': '100',      // Nexa Thin
        'light': '300',     // Nexa Light  
        'normal': '400',    // Nexa Book
        'medium': '500',    // Nexa Regular
        'bold': '700',      // Nexa Bold
        'heavy': '800',     // Nexa Heavy
        'black': '900',     // Nexa Black
      },
    },
  },
  plugins: [],
} 
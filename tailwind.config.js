/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#141416',
          800: '#222326',
          700: '#35373d',
          500: '#646875',
          300: '#a2a7b5',
          100: '#e5e7eb',
        },
        paper: {
          50: '#fbfbf9',
          100: '#f7f6f0',
          200: '#eeece0',
          300: '#ded9c7',
        },
        accent: {
          gold: '#eab308',
          crimson: '#e11d48',
          sky: '#0284c7',
          emerald: '#059669',
          violet: '#7c3aed',
        }
      },
      fontFamily: {
        doodle: ['"Patrick Hand"', '"Comic Neue"', 'cursive', 'sans-serif'],
        display: ['"Architects Daughter"', '"Kalam"', 'cursive', 'sans-serif'],
      },
      boxShadow: {
        'doodle': '3px 3px 0px #141416',
        'doodle-lg': '5px 5px 0px #141416',
        'doodle-xl': '8px 8px 0px #141416',
        'doodle-active': '1px 1px 0px #141416',
      }
    },
  },
  plugins: [],
}

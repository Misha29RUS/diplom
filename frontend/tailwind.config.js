/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        's-black': '#000000',
        's-white': '#ffffff',
        's-red': '#ef3124',
        's-light-red': '#ff6161',
        's-dark-red': '#b72a2a',
        's-light-grey': '#d9d9d6',
        's-dark-grey': '#505759',
        's-green': '#048622',
        's-violet': '#490486',
        's-yellow': '#d39e00',
      }
    },
  },
  plugins: [],
}


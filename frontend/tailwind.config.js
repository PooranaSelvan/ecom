/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      display: ['dark'],
      opacity: ['dark'],
    },
  },
  plugins: [
    require('daisyui')
  ],
}
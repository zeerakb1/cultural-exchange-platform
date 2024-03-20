/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      'primary': '#081F62',
      'secondary': '#E7E9F0',
      'tertiary': '#535F80',
      'txt': '#FEFEFE',
      'btn': '#051747'
    },
    extend: {},
  },
  plugins: [],
}


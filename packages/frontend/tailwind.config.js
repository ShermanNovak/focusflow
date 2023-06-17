/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'bluish-grey': '#e6eaee',
        'dark-grey': '#616161',
        'hover-blue': '#d9e0e7'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
  corePlugins: {
    preflight: false
  },
}


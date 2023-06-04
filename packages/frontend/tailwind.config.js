/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'bluish-gray': '#e6eaee',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}


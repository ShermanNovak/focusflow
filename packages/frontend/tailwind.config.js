// @type {import('tailwindcss').Config}
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'bluish-grey': '#e6eaee',
        'dark-grey': `#616161`,
        'navbar-green': '#BEE2B5',
        'hover-blue': '#d9e0e7',
        'pale-yellow': '#f9f2e4',
        'pale-purple': '#e9e7f5',
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


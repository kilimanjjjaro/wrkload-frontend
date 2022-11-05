/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    fontFamily: {
      primaryFont: ['Syne', 'sans-serif'],
      secondaryFont: ['Inter', 'serif']
    },
    extend: {
      colors: {
        primary: '#0500FF',
        alternative: '#0D0D0D'
      }
    }
  },
  plugins: [],
  darkMode: 'media'
}

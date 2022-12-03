/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    fontFamily: {
      primaryFont: 'var(--syne-font), sans-serif',
      secondaryFont: 'var(--inter-font), sans-serif'
    },
    extend: {
      screens: {
        '2xl': '1740px'
      },
      colors: {
        primary: '#0500ff',
        alternative: '#0d0d0d',
        'custom-red': '#d0000c',
        'custom-yellow': '#e0ca00',
        'custom-green': '#34a400'
      }
    }
  },
  plugins: [],
  darkMode: 'class'
}

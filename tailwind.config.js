/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    fontFamily: {
      primaryFont: 'var(--space-grotesk-font), sans-serif',
      secondaryFont: 'var(--inter-font), sans-serif'
    },
    container: {
      center: true
    },
    extend: {
      colors: {
        primary: '#0500ff',
        alternative: '#0d0d0d',
        'light-gray': '#919191',
        'dark-gray': '#4f4f4f',
        'custom-red': '#ff0000',
        'custom-yellow': '#e0ca00',
        'custom-green': '#34a400'
      },
      transitionDuration: {
        400: '400ms'
      }
    }
  },
  plugins: [],
  darkMode: 'class'
}

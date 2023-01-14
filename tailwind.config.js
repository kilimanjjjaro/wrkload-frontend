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
        'dark-gray': '#454545',
        'custom-red': '#e32626',
        'custom-yellow': '#e3d126',
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

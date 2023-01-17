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
        'dark-gray': '#404040',
        'custom-red': '#e32626',
        'custom-yellow': '#dfcd24',
        'custom-green': '#34a400'
      },
      transitionDuration: {
        400: '400ms'
      },
      animation: {
        'loading-square': 'strokeSpacing 2s ease-in-out infinite'
      },
      keyframes: {
        strokeSpacing: {
          '0%': {
            strokeDasharray: '0 200',
            strokeDashoffset: '0'
          },
          '45%': {
            strokeDasharray: '200 200',
            strokeDashoffset: '0'
          },
          '90%': {
            strokeDasharray: '200 200',
            strokeDashoffset: '-200'
          },
          '100%': {
            strokeDasharray: '200 200',
            strokeDashoffset: '-200'
          }
        }
      }
    }
  },
  plugins: [],
  darkMode: 'class'
}

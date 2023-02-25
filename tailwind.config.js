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
        blue: '#abb5d3',
        'light-blue': '#cdd4e5',
        black: '#0a0a0a',
        white: '#efefef',
        red: '#e32626',
        yellow: '#dfcd24',
        green: '#34a400'
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
      },
      strokeWidth: {
        3: '3px',
        3.5: '3.5px',
        4: '4px'
      }
    }
  },
  plugins: [],
  darkMode: 'class'
}

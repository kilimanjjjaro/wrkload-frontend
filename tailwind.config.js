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
        blue: '#7686b7',
        'light-blue': '#d2d7e3',
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
        skeleton: 'shine 2.5s ease-in-out infinite',
        loading: 'loading 2s ease-out infinite'
      },
      keyframes: {
        shine: {
          to: {
            backgroundPositionX: '-200%'
          }
        },
        loading: {
          '0%': {
            transform: 'translateY(100%)'
          },
          '25%': {
            transform: 'translateY(150%)'
          },
          '50%': {
            transform: 'translateY(0%)'
          },
          '100%': {
            transform: 'translateY(-100%)'
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

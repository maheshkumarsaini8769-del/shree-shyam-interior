/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FAF8F5',
          100: '#F5F1E8',
          200: '#ECE7DC',
          300: '#E0D8C8',
          400: '#C8BEAA',
          500: '#A99D87',
        },
        forest: {
          950: '#0B0F15',
          900: '#121720',
          800: '#1A212C',
          700: '#252F3F',
          600: '#344155',
        },
        copper: {
          300: '#E3B277',
          400: '#D49B55',
          500: '#C68A43',
          600: '#B57731',
          700: '#945E23',
        },
        wood: {
          900: '#2A1A14',
          800: '#3E2720',
          700: '#5A3A2E',
          600: '#754C3D',
        },
        charcoal: {
          900: '#11151A',
          800: '#1B2026',
          700: '#2B313A',
          500: '#545E6B',
          400: '#798391',
          300: '#9EA7B5',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        script: ['"Caveat"', '"Playfair Display"', 'cursive'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(11, 15, 21, 0.08), 0 2px 6px -1px rgba(11, 15, 21, 0.04)',
        'card': '0 10px 30px -4px rgba(11, 15, 21, 0.12), 0 4px 10px -2px rgba(11, 15, 21, 0.06)',
        'elevated': '0 20px 40px -8px rgba(11, 15, 21, 0.25)',
        'glow-copper': '0 0 25px -4px rgba(198, 138, 67, 0.35)',
        'inner-light': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.15)',
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'shimmer': 'shimmer 2s infinite linear',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}

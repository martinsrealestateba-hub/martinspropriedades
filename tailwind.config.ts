import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        crema: '#FDFCFA',
        carbon: '#2B2A28',
        dorado: { DEFAULT: '#B08D5B', light: '#D9C4A3' },
        gris: '#9B9B95',
        surface: '#F5F0E8',
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Montserrat', 'Arial', 'sans-serif'],
      },
      maxWidth: {
        container: '1280px',
      },
    },
  },
  plugins: [],
}

export default config

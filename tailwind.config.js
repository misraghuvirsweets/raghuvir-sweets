/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        saffron: { DEFAULT: '#D97706', dark: '#B45309', light: '#FCD34D' },
        maroon: { DEFAULT: '#7F1D1D', dark: '#5B1414', light: '#991B1B' },
        cream: '#FFFBEB',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        gold: '0 10px 30px -10px rgba(180, 83, 9, 0.35)',
      },
    },
  },
  plugins: [],
};

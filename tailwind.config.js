/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#00BFA5',
          600: '#00a38a',
          700: '#008770',
          800: '#006b56',
          900: '#004f3d',
        },
      },
    },
  },
  plugins: [],
};

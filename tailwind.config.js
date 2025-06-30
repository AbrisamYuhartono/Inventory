/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0f9e8',
          100: '#ddf2c7',
          200: '#c8e892',
          300: '#aedd53',
          400: '#7ac043',
          500: '#7ac043',
          600: '#5a8f32',
          700: '#456f27',
          800: '#385821',
          900: '#2f4a1e',
        },
        danger: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ee4035',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        cream: {
          50: '#ffffee',
          100: '#ffffee',
          200: '#fffde7',
          300: '#fffbde',
          400: '#fff8d1',
          500: '#fff4c4',
          600: '#f4e8b8',
          700: '#e8dcac',
          800: '#dcd0a0',
          900: '#d0c494',
        }
      }
    },
  },
  plugins: [],
};
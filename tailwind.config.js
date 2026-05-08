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
        space: {
          900: '#0a0a12',
          800: '#12121f',
          700: '#1a1a2e',
          600: '#252545',
        },
        nasa: {
          red: '#FC3D21',
          blue: '#0B3D91',
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}

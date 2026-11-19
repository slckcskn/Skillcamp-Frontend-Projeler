/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {
    fontFamily: { sans: ['Inter', 'sans-serif'], display: ['Plus Jakarta Sans', 'sans-serif'] },
    colors: { ink: '#191821', muted: '#777583', paper: '#f8f7fc', lilac: '#eeebfa', accent: '#5d4c9c' },
    boxShadow: { soft: '0 12px 35px rgba(31, 24, 56, .06)' }
  }},
  plugins: []
}
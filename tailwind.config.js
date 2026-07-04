/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#0a0a0a',
        gold: '#C9A84C',
        'gold-light': '#E4C76B',
        'gold-dark': '#9E7A2A',
        'off-white': '#F5F0E8',
        'cream': '#EDE8DF',
        'charcoal': '#1a1a1a',
        'dark-card': '#111111',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'ultra': '0.25em',
        'widest': '0.4em',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
      },
    },
  },
  plugins: [],
}

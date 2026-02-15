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
        primary: '#c9a86c',
        secondary: '#8b7355',
        dark: '#1a1814',
        charcoal: '#232019',
        warmCream: '#f5f2ed',
        mutedGold: '#b8935f'
      },
    },
  },
  plugins: [],
}

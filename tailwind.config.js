/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'ferremat-orange': '#FF7F27',
        'ferremat-blue': '#4A6FA5',
      },
      backgroundColor: {
        'dark-bg-primary': '#1a1f2e',
        'dark-bg-secondary': '#232d3d',
        'dark-bg-tertiary': '#2c3647',
      },
      textColor: {
        'dark-text-primary': '#e8eaed',
        'dark-text-secondary': '#b0b4b8',
        'dark-text-tertiary': '#80848a',
      }
    },
  },
  plugins: [],
}

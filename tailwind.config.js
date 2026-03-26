/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        sans: ['Manrope', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      boxShadow: {
        paper: '0 24px 60px rgba(16, 32, 51, 0.08)',
        hover: '0 28px 72px rgba(16, 32, 51, 0.14)',
      },
    },
  },
  plugins: [],
};

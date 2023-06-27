/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./templates/**/*.html'],
  daisyui: {
    themes: ['business', 'retro'],
  },
  theme: {
    extend: {
      fontFamily: {
        spacemono: ['Space Mono', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
};

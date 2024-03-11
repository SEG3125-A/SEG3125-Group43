/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const daisyui = require('daisyui');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}', './index.html'],
  theme: {
    extend: {
        // Add all extra colors, fonts, spacings, etc. here
    },
  },
  plugins: [
    daisyui, 
    {"name" : "typescript-plugin-css-modules"}
  ]
};

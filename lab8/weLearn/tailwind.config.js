/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const daisyui = require('daisyui');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}', './index.html'],
  darkMode : 'class',
  theme: {
    extend: {
        // Add all extra colors, fonts, spacings, etc. here
        colors: {
          primary: {
            'marine-blue': 'hsl(213, 96%, 18%)',
            'purplish-blue': 'hsl(243, 100%, 62%)',
            'transparent-purplish-blue1': 'hsla(243, 100%, 62%, 0.02)',
            'transparent-purplish-blue2': 'hsla(243, 100%, 62%, 10)',
            'pastel-blue': 'hsl(228, 100%, 84%)',
            'light-blue': 'hsl(206, 94%, 87%)',
            'strawberry-red': 'hsl(354, 84%, 57%)',
            'link-purp' : '#6E41E2', 
            'link-blue' : '#3443D1',
            'faded-text' : '#a7a7a781', 
          }, 
          neutral: {
            'cool-gray': 'hsl(231, 11%, 63%, 0.6)',
            'light-gray': 'hsl(229, 24%, 87%)',
            'magnolia': 'hsl(217, 100%, 97%)',
            'alabaster': 'hsl(231, 100%, 99%)',
            'white': 'hsl(0, 0%, 100%)',
          },
          'dark-card-bg' : '#3C3C3C',
          'dark-page-bg' : '#1F1E1E',
          'dark-banner-bg': '#181A1B',
          'landing-bg' : '#101010'
        },
        fontFamily: {
          ubuntu: ['Ubuntu', 'sans-serif'],
          montserrat: ['Montserrat', 'sans-serif'],
        },
        fontSize: {
          'body': '16px', 
        },
        spacing: {
          'mobile': 375,
          'desktop': 1440,
          'card-w': 'calc(100% / 1.10)',
          'card-h': 'calc(100% / 1.25 )',
          'card-sm-h' : '300px',
          'card-sm-w' : '180px',
          'btn-bottom': '50px',
          'btn-right': '110px',
          'btn-left': '470px',
          'profile-sm': '40px',
          'profile-sm-2': '60px',
          'profile-md': '80px',
          'profile-lg': '120px',
          'banner-h': '470px',
          'large-banner-h': '1400px'

        },
        backgroundImage: {
          'sidebar-desktop' : 'url(./src/assets/images/bg-sidebar-desktop.svg)',
          'sidebar-mobile' : 'url(./src/assets/images/bg-sidebar-mobile.svg)',
          'logo-bg' : 'url(/logo.svg)',
          'landing-bg' : 'url(./src/assets/images/blacktexture.png)',
        },
        backgroundPosition: {
          'right-bg-100': 'center right 100px',
          'right-bg-50': 'center right 50px',
        }
    },
  },
  plugins: [
    daisyui, 
    {"name" : "typescript-plugin-css-modules"}
  ]
};

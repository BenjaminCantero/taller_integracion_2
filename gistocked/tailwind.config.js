const { Racing_Sans_One } = require('next/font/google');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      width:{
        13: "3.75rem"
      },

      screens: {
        "ss": "375px"
      },

      colors: {
        Colores_Login: {
          1: "#DEE2E6", // Background 1
          2: "#343A40", // Background 2
          3: "#E9ECEF", // Background 3
          4: "#F8F9FA"  // Font-Family
        }
      },

      fontFamily: {
        racing_sans_one: ["Racing Sans One"]
      },

      transitionDuration: {
        '2000': '2000ms',
      }
    },
  },
  plugins: [],
};

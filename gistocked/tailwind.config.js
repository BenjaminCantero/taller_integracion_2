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
      /*
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
        "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      }, 
      */
      
      colors: {
        PaletaLogin: {
          1: "#DEE2E6", // Background 1
          2: "#343A40", // Background 2
          3: "#E9ECEF", // Background 3
          4: "#F8F9FA"  // Font-Family
        }
      },

      fontFamily: {
        racing_sans_one: ["Racing Sans One"]
      }
    },
  },
  plugins: [],
};

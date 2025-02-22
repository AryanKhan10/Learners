/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        xssm:"320px",
        xsm:"410px"
      }
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        'xl-custom': '1.5rem', // Custom rounding size
        '2xl-custom': '3rem',  // Larger custom rounding size
      },
      colors: {
        'custom-purple': '#4B164C',
      },
    },
  },
  plugins: []
  ,
}
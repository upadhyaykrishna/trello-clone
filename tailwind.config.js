/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#172b4d',
        secondary: "#f1f2f4",
        lightblack: '#172b4d',
        lightblack2: '#44546f',
        blueBorder: '#388bff',
      },
    },
  },
  plugins: [],
}


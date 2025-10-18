/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#d66b58",
          light: "#f6dcd7"
        },
      },
      boxShadow: {
        'card-sm': '0 6px 18px rgba(0,0,0,0.06)'
      }
    },
  },
  plugins: [],
}


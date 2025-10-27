/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gskOrange: "#E86E2F",
        gskDark: "#1F2937",
      },
    },
  },
  plugins: [],
};

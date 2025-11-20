/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2044AF",
        secondary: "#98A9DA",
        base: "#4E4E4E",
      },
    },
  },
  plugins: [],
};

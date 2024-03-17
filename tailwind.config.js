/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        blueviolet: {
          DEFAULT: "#8278dc",
          50: "#f1f2fc",
          100: "#e5e7fa",
          200: "#cfd2f6",
          300: "#b2b6ef",
          400: "#9593e6",
          500: "#8278dc",
          600: "#725ecd",
          700: "#6450b5",
          800: "#504192",
          900: "#443a75",
          950: "#282244",
        },
        gallery: {
          DEFAULT: "#f8f8f8",
          50: "#f8f8f8",
          100: "#ebeaea",
          200: "#e5e3e3",
          300: "#d2cfcf",
          400: "#b6b3b3",
          500: "#9c9797",
          600: "#837f7f",
          700: "#6d6868",
          800: "#5c5858",
          900: "#4f4d4d",
          950: "#282727",
        },
      },
    },
  },
  plugins: [],
};

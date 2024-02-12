/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: "tranparent",
        current: "currentColor",
        calm: {
          DEFAULT: "#21a038",
          50: "#f1fcf2",
          100: "#defae3",
          200: "#bff3c7",
          300: "#8de89d",
          400: "#54d46b",
          500: "#2dba47",
          600: "#21a038",
          700: "#1a802d",
          800: "#156624",
          900: "#184f24",
          950: "#082b0f",
        },
        haze: {
          DEFAULT: "#21a038",
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#156624",
          900: "#1e293b",
          950: "#0f172a",
        },
      },
    },
  },
  plugins: [],
};

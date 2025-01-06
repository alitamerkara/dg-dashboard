/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Next.js 13 App Router için
    "./pages/**/*.{js,ts,jsx,tsx}", // Pages Router için
    "./components/**/*.{js,ts,jsx,tsx}", // Bileşenler için
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
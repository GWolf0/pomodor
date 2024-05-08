/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        light:"#E2E8F0",
        lighter:"#F1F5F9",
        lightest:"#F8FAFC",
        dark:"#1E293B",
        darker:"#0F172A",
        darkest:"#020617",
        primary1:"#F43F5E",
        primary2:"#3B82F6",
        primary3:"#8B5CF6",
        semitrans:"rgba(1,1,1,0.25)",
      }
    },
  },
  plugins: [],
}


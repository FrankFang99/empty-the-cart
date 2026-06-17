/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        // 淘宝配色
        taobao: {
          orange: '#FF5000',
          'orange-dark': '#FF6600',
          gray: '#F5F5F5',
          'text-primary': '#3C3C3C',
          'text-secondary': '#6C6C6C',
          border: '#E8E8E8',
          success: '#33AA00',
          warning: '#FF6600',
          error: '#FF0033',
        }
      }
    },
  },
  plugins: [],
};
/** @type {import('tailwindcss').Config} */
import tailwindScrollbar from "tailwind-scrollbar";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { 
    extend: {
      zIndex: {
        '50': '50',
      },
      animation: {
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      }
    },
    darkMode: 'class',
     themes: ["light", "dark", "cupcake"],
    extend: {
      colors: {
        'primary': '#3B82F6',
        'secondary': '#F97316',
        'accent': '#16A34A',
        'danger': '#DC2626',
        'info': '#0D75FF',
        'success': '#16A34A',
        'warning': '#F59E0B',
        'light': '#F3F4F6',
        'dark': '#111827',
      }
    },
  },
  plugins: [tailwindScrollbar, require("daisyui")],
};

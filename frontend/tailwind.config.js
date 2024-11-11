/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'text-fade': 'fade 3s ease-in-out infinite',
      },
      animation: {
        'fade-slide': 'fadeSlide 0.4s ease-in-out',
      },
      keyframes: {
        fade: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        fadeSlide: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
      },
    },
  },
  plugins: [],
}


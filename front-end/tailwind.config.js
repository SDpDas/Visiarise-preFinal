/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundAttachment: {
        fixed: 'fixed',
      },
      backgroundPosition: {
        center: 'center',
      },
      backgroundSize: {
        cover: 'cover',
      },
      backgroundImage: {
        'custom-gradient-1': 'linear-gradient(to right, #000000, #8302b5)',
        'button-gradient': 'linear-gradient(to right, #000000 2%, #7702a5 50%)',
        'custom-gradient': 'linear-gradient(to bottom, #8302B6 10%, #000000 50%)',
        'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
        'left-theme': "url('/src/assets/bgImage-login.png')",
      },
      animation: {
        fadeIn: 'fadeIn 1s ease-in-out forwards',
        breath: 'breath 6s ease-in-out infinite',
        'breath-slow': 'breath 8s ease-in-out infinite',
        'breath-fast': 'breath 7s ease-in-out infinite',
        'reveal-baseline': 'revealBaseline 0.6s ease-out forwards',
        'reveal-left': 'revealLeft 0.6s ease-out forwards',
        'reveal-right': 'revealRight 0.6s ease-out forwards',
        'pulse-slow': 'pulse 3s infinite',
        'bounce-slow': 'bounce 3s infinite',
        'star-movement-bottom': 'star-movement-bottom linear infinite alternate',
        'star-movement-top': 'star-movement-top linear infinite alternate',
      },
      keyframes: {
        'star-movement-bottom': {
          '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
          '100%': { transform: 'translate(-100%, 0%)', opacity: '0' },
        },
        'star-movement-top': {
          '0%': { transform: 'translate(0%, 0%)', opacity: '1' },
          '100%': { transform: 'translate(100%, 0%)', opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        breath: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
        },
        revealBaseline: {
          '0%': { transform: 'translateY(50px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        revealLeft: {
          '0%': { transform: 'translateX(-50px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        revealRight: {
          '0%': { transform: 'translateX(50px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      fontFamily: {
        arimo: ['Arimo', 'sans-serif'],
        opensans: ['"Open Sans"', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        helvetica: ['"Helvetica World"', 'sans-serif'],
        meow: ['"Meow Script"', ...defaultTheme.fontFamily.sans],
        sans: ['"Helvetica World"', ...defaultTheme.fontFamily.sans],
        condensed: ['"Roboto Condensed"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        neonPurple: '#9D00FF',
        neonBlue: '#00D1FF',
      },
    },
  },
  plugins: [],
};

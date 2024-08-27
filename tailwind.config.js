/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        preBold: ['preBold'],
        preExtraBold: ['preExtraBold'],
        preExtraLight: ['preExtraLight'],
        preLight: ['preExtraLight'],
        preMedium: ['preMedium'],
        preRegular: ['preRegular'],
        preSemiBold: ['preSemiBold'],
        preThin: ['preThin'],
      },
      spacing: {
        17: '4.25rem',
        p: '480px',
      },
      animation: {
        'fade-in': 'fadeIn 2s ease-in-out',
        shake: 'shake 1s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-4px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(4px)' },
        },
      },
    },
  },
  plugins: [],
};

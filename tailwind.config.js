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
    },
  },
  plugins: [],
};

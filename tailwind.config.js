module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxHeight: {
        'calendar-home': 'calc(100vh - 160px)',
      },
      fontFamily: {
        mulish: ['Mulish', 'sans-serif', 'Helvetica', 'Arial'],
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/forms')],
};

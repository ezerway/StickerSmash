module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      minHeight: {
        '1/2': '50%',
        '1/4': '25%',
      },
    },
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
};

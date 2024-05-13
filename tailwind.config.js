/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      'colors': {
        'primary': '#2051D6',
        'secondary': '#D66853',
      },
    },
  },
  plugins: [],
};


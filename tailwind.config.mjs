/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/slices/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#20408D',
        'secondary': '#97C8E7',
        'tertiary': '#FFEC00',
        'quaternary': '#F5F5F5',
      },
      fontFamily: {
        'fm-font': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default tailwindConfig;
/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
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
  safelist: [
    'text-[#FFEC00]',
    'text-tertiary',
  ],
  plugins: [],
};

export default tailwindConfig;
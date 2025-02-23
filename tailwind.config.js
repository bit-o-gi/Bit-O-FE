/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Note the addition of the `app` directory.
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      colors: {
        pink: '#FFA4AA',
        brown: '#C5B697',
        black: '#252525',
        gray: {
          DEFAULT: '#61697F',
          50: '#EBEFF0',
          100: '#D1D5DB',
          200: '#A0A8B4',
          300: '#7A828E',
          600: '#3A434F',
          700: '#2A333E',
          800: '#1A242B',
          900: '#0C1518',
        },
      },
    },
  },
  plugins: [],
}

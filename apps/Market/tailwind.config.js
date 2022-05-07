module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./_hooks/**/*.{js,ts,jsx,tsx}",
    "./_includes/**/*.{js,ts,jsx,tsx}",
    "./_layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
    },
    screens: {
      'sm': '650px',
      // => @media (min-width: 650px) { ... }

      'md': '1450px',
      // => @media (min-width: 1450px) { ... }

      'lg': '2100px',
      // => @media (min-width: 2050px) { ... }

      'xl': '2800px',
      // => @media (min-width: 2650px) { ... }
      
    }
  },
  plugins: [],
}

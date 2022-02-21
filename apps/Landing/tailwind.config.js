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
      animation: {
        'gradient-slide': 'slidex 1s ease infinite',
      },
      keyframes: {
        'slide-x': {
          '0%, 100%': {
              'background-size':'200% 200%',
              'background-position': 'left center'
          },
          '50%': {
              'background-size':'200% 200%',
              'background-position': 'right center'
          }
        }
      },
      backgroundImage: {
        "tokenfallingpreview": "url('/landingassets/banners/fallingpreview.png')",
        "tokenfalling": "url('/landingassets/banners/tokenfalling.gif')",
      },
      boxShadow: {
        'pink-glow-md': '0px 0px 30px #E66EE9',
        'pink-glow-lg': '0px 0px 60px #E66EE9',
        'blue-glow-md': '0px 0px 30px #59A6F4',
        'blue-glow-lg': '0px 0px 60px #59A6F4',
      },
    },
  },
}

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
      backgroundImage: {
        "tokenbg": "url('/landingassets/landingpage/bg/tokens.png')",
      },
      boxShadow: {
        'pink-glow-md': '0px 0px 20px #E66EE9',
        'pink-glow-lg': '0px 0px 40px #E66EE9',
        'blue-glow-md': '0px 0px 20px #59A6F4',
        'blue-glow-lg': '0px 0px 40px #59A6F4',
      },
    },
  },
}

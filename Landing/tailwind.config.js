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
    },
  },
}

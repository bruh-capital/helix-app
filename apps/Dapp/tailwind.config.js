module.exports = {
  content: [
  "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./_hooks/**/*.{js,ts,jsx,tsx}",
    "./_includes/**/*.{js,ts,jsx,tsx}",
    "./_layouts/**/*.{js,ts,jsx,tsx}",
    "./_context/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    backgroundImage: {
      "lightDesktopBg": "url('/dapp-assets/backgrounds/lightdesktop.png')",
      "darkDesktopBg": "url('/dapp-assets/backgrounds/darkdesktop.png')",
      "lightMobileBg": "url('/dapp-assets/backgrounds/lightmobile.png')",
      "darkMobilepBg": "url('/dapp-assets/backgrounds/darkmobile.png')",
    },
  },
  variants: {}
}

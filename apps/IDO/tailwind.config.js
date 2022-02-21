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
      "darkMobileBg": "url('/dapp-assets/backgrounds/darkmobile.png')",
      "card1Bg": "url('/dapp-assets/Card/1/bg.png')",
      "mesh-1-bg": "url('/dapp-assets/Card/1/mesh.png')",
      "mesh-2-bg": "url('/dapp-assets/Card/2/mesh.png')",
      "mesh-3-bg": "url('/dapp-assets/Card/3/mesh.png')",
    },
  },
  variants: {}
}

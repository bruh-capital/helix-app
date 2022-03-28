module.exports = {
  content: [
  "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./_hooks/**/*.{js,ts,jsx,tsx}",
    "./_includes/**/*.{js,ts,jsx,tsx}",
    "./_layouts/**/*.{js,ts,jsx,tsx}",
    "./_context/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // backgroundImage: {
    //   "lightDesktopBg": "url('/threejs-bg/tempbg.png')",
    //   "lightMobileBg": "url('/threejs-bg/tempbgpng')",
    //   "card1Bg": "url('/dapp-assets/Card/1/bg.png')",
    //   "mesh-1-bg": "url('/dapp-assets/Card/1/mesh.png')",
    //   "mesh-2-bg": "url('/dapp-assets/Card/2/mesh.png')",
    //   "mesh-3-bg": "url('/dapp-assets/Card/3/mesh.png')",
    // },
    boxShadow: {
      'pink-glow-md': '0px 0px 30px #E66EE9',
      'pink-glow-lg': '0px 0px 60px #E66EE9',
      'blue-glow-md': '0px 0px 30px #59A6F4',
      'blue-glow-lg': '0px 0px 60px #59A6F4',
      'silver-glow-sm': '0px 0px 15px #bababa',
      'silver-glow-md': '0px 0px 30px #bababa',
      'gray-glow-md': '0px 0px 30px #6c7278',
      'gray-glow-lg': '0px 0px 60px #6c7278',
      'purple-glow-md': '0px 0px 30px #38156b',
      'purple-glow-lg': '0px 0px 60px #38156b',
    },
    extend:{
      height:{
        "screen-1/2":"50vh",
        "screen-3/4":"75vh",
        "screen-5/4":"125vh",
        "screen-2":"200vh"
      }
    }
  },
  variants: {},
  
}

module.exports = {
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      colors: {
        gray1: "#FFFFFF",
        gray2: "#FAFAFA",
        gray3: "#F5F5F5",
        gray4: "#F0F0F0",
        gray5: "#D9D9D9",
        gray6: "#BFBFBF",
        gray7: "#8C8C8C",
        gray8: "#595959",
        gray9: "#434343",
        gray10: "#2D2D2D",
        gray11: "#1F1F1F",
        gray12: "#141414"
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    styled: false,
  },
}

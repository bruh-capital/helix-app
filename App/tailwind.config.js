module.exports = {
  purge: false,
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'hero-gradient': "url('/pageassets/DappBg.png')",
      },
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
        gray12: "#141414",
        primBlue: "#58B9FF",
        secPink: "#FF61DB"
      },
    },
  },
  variants: {},
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    styled: false,
  },
}

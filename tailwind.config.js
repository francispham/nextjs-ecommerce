module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#ff0000",
        black: "#393939",
      },
      fontSize: {
        '4.5xl': '2.5rem',
      },
      skew: {
        '-7': '-7deg',
        '-20': '-20deg',
      },
      borderWidth: {
        10: '10px',
      },
      TransitionTimingFunction: {
        'bloop': 'cubic-bezier(1,-0.65,0,2.31',
      },
    },
  },
  variants: {
    extend: {
      scale: ["group-hover"],
    },
  },
  plugins: [],
}

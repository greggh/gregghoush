module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ["src/**/*.html"],
  theme: {
    extend: {
      colors: {
        twitch: "#6441a5",
        facebook: "#39569c",
        twitter: "#26a7de",
        instagram: "#F7FAFC",
        youtube: "#ff0100",
        picton: "#49aaf1",
      },
    },
  },
  variants: {},
  plugins: [],
};

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
      boxShadow: {
        blue: "0 4px 14px 0 rgba(19, 51, 81, 0.39)",
      },
    },
  },
  variants: {},
  plugins: [],
};

const colors = require("../../node_modules/tailwindcss/colors");

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },
  content: ["_site/**/*.html"],
  theme: {
    extend: {
      colors: {
        teal: colors.teal,
        twitch: "#6441a5",
        facebook: "#39569c",
        twitter: "#000000",
        instagram: "#F7FAFC",
        youtube: "#ff0100",
        picton: "#49aaf1",
        neonpink: "#cf3775",
        darkneonpink: "#A42A5C",
        neonblue: "#5fc5e9",
        darkneonblue: "#4597B4",
        bluesky: "#0560ff",
        mastodon: "#4d8fd3",
        flamingo: "#e6584f",
        nero: "#252525",
      },
      gradientColorStops: (theme) => ({
        neonpink: "#cf3775",
        neonblue: "#5fc5e9",
      }),
      boxShadow: {
        blue: "0 4px 14px 0 rgba(19, 51, 81, 0.39)",
      },
    },
  },
  plugins: [require("postcss-import"), require("@tailwindcss/forms")],
};

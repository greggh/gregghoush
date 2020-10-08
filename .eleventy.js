const htmlmin = require("html-minifier");
const sitemap = require("@quasibit/eleventy-plugin-sitemap");

module.exports = function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.addPlugin(sitemap, {
    sitemap: {
      hostname: "https://gregghoush.com",
    },
  });

  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.setTemplateFormats(["md", "njk"]);

  eleventyConfig.addWatchTarget("./_tmp/style.css");

  eleventyConfig.addPassthroughCopy({ "./_tmp/style.css": "./style.css" });

  eleventyConfig.addTransform("minify", require("./transforms/minify"));

  // eleventyConfig.addPassthroughCopy({
  //   "./node_modules/alpinejs/dist/alpine.js": "./js/alpine.js",
  // });

  eleventyConfig.addPassthroughCopy("src/images");

  eleventyConfig.addPassthroughCopy({
    "src/assets/*": ".",
  });

  eleventyConfig.addShortcode("version", function () {
    return String(Date.now());
  });

  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (
      process.env.ELEVENTY_PRODUCTION &&
      outputPath &&
      outputPath.endsWith(".html")
    ) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }

    return content;
  });

  return {
    dir: {
      input: "src",
    },
  };
};

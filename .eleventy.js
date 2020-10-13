const htmlmin = require("html-minifier");
const sitemap = require("@quasibit/eleventy-plugin-sitemap");
const embedYouTube = require("eleventy-plugin-youtube-embed");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const luxon = require("luxon");

let DateTime = luxon.DateTime;

module.exports = function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addFilter("episodeLongDate", (airDate) => {
    return DateTime.fromISO(airDate).toLocaleString(DateTime.DATE_FULL);
  });

  eleventyConfig.addFilter("episodeShortDate", (airDate) => {
    return DateTime.fromISO(airDate).toFormat("LLL dd");
  });

  eleventyConfig.addFilter("episodeYearDate", (airDate) => {
    return DateTime.fromISO(airDate).toFormat("yyyy");
  });

  eleventyConfig.addPlugin(sitemap, {
    sitemap: {
      hostname: "https://gregghoush.com",
    },
  });

  eleventyConfig.addPlugin(embedYouTube, {
    // just an example, see default values below:
    lite: false,
    noCookie: false,
  });

  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.setTemplateFormats(["md", "njk"]);

  eleventyConfig.addWatchTarget("./_tmp/style.css");

  eleventyConfig.addPassthroughCopy({ "./_tmp/style.css": "./style.css" });

  eleventyConfig.addPassthroughCopy("src/_redirects");

  eleventyConfig.addTransform("minify", require("./transforms/minify"));

  eleventyConfig.addCollection("episodes", (collection) => {
    const episodes = collection
      .getFilteredByGlob("src/episode/*.md")
      .sort((a, b) => {
        return Number(b.data.number) - Number(a.data.number);
      });
    return episodes;
  });

  eleventyConfig.addCollection("tagList", function (collection) {
    let tagSet = new Set();
    collection.getAll().forEach(function (item) {
      if ("tags" in item.data) {
        let tags = item.data.tags;

        tags = tags.filter(function (item) {
          switch (item) {
            // this list should match the `filter` list in tags.njk
            case "all":
            case "post":
            case "episode":
            case "episodes":
            case "posts":
              return false;
          }

          return true;
        });

        for (const tag of tags) {
          tagSet.add(tag);
        }
      }
    });

    // returning an array in addCollection works in Eleventy 0.5.3
    return [...tagSet];
  });

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

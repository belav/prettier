"use strict";

// We need to list the parsers and getters so we can load them only when necessary.
module.exports = [
  // JS
  require("./language-js"),
  // CSS
  require("./language-css"),
  // Handlebars
  require("./language-handlebars"),
  // GraphQL
  require("./language-graphql"),
  // Markdown
  require("./language-markdown"),
  // HTML
  require("./language-html"),
  // YAML
  require("./language-yaml"),
  // this requires prettier and prettier-java to be cloned into the same directory
  // and also that you've run the setup
  // commands that are in the contributing.md from prettier-java
  // I'm not sure yet if you can debug into prettier-java from here
  require("../../prettier-java/packages/prettier-plugin-java/src/index"),
];

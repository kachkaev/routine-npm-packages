/** @type {import("prettier").Config} */
const config = {
  plugins: [
    require("prettier-plugin-packagejson"),
    require("prettier-plugin-sh"),
  ],
};

module.exports = config;

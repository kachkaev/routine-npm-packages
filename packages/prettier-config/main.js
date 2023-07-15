/** @type {import("prettier").Config} */
const config = {
  plugins: ["prettier-plugin-packagejson", "prettier-plugin-sh"],
};

// eslint-disable-next-line import/no-default-export -- required for Prettier
export default config;

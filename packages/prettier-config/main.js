import * as prettierPluginPackageJson from "prettier-plugin-packagejson";
import * as prettierPluginSh from "prettier-plugin-sh";

/** @type {import("prettier").Config} */
const config = {
  plugins: [prettierPluginPackageJson, prettierPluginSh],
};

// eslint-disable-next-line import/no-default-export -- required for Prettier
export default config;

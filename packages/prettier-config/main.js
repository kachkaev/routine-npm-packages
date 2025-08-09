// https://github.com/prettier/prettier-vscode/issues/3641#issuecomment-2743486275
import url from "node:url";

/** @type {import("prettier").Config} */
const config = {
  plugins: [
    url.fileURLToPath(import.meta.resolve("prettier-plugin-packagejson")),
    url.fileURLToPath(import.meta.resolve("prettier-plugin-sh")),
  ],
};

// eslint-disable-next-line import/no-default-export -- required for Prettier
export default config;

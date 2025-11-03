import { defineConfig } from "eslint/config";

import { baseConfigObjects, configureLanguageOptions } from "./main.ts";

export default defineConfig([
  ...baseConfigObjects,
  configureLanguageOptions(import.meta.dirname),
]);

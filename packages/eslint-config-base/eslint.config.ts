import { defineConfig } from "eslint/config";

import {
  generateBaseConfigs,
  generateConfigsForLanguageOptions,
} from "./main.ts";

export default defineConfig([
  ...generateBaseConfigs(),
  ...generateConfigsForLanguageOptions(import.meta.dirname),
]);

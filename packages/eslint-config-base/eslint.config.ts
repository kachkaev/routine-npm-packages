import { defineConfig } from "eslint/config";

import { baseConfigs, generateConfigsForLanguageOptions } from "./main.ts";

export default defineConfig([
  ...baseConfigs,
  ...generateConfigsForLanguageOptions(import.meta.dirname),
]);

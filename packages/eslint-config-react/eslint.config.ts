import { defineConfig } from "eslint/config";

import {
  baseConfigs,
  configsForNext,
  configsForReact,
  generateConfigsForLanguageOptions,
  generateConfigsForTailwindcss,
} from "./main.ts";

export default defineConfig([
  ...baseConfigs,
  ...configsForNext,
  ...configsForReact,
  ...generateConfigsForTailwindcss(undefined),
  ...generateConfigsForLanguageOptions(import.meta.dirname),
]);

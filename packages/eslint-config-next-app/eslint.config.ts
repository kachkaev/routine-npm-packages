import { defineConfig } from "eslint/config";

import {
  generateBaseConfigs,
  generateConfigsForLanguageOptions,
  generateConfigsForNext,
  generateConfigsForReact,
  generateConfigsForTailwindcss,
} from "./main.ts";

export default defineConfig([
  ...generateBaseConfigs(),

  ...generateConfigsForNext(),
  ...generateConfigsForReact(),
  ...generateConfigsForTailwindcss(undefined),

  ...generateConfigsForLanguageOptions(import.meta.dirname),
]);

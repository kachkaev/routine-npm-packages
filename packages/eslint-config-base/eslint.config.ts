import { baseConfigObjects, configureLanguageOptions } from "./main.ts";

export default [
  ...baseConfigObjects,
  configureLanguageOptions(import.meta.dirname),
];

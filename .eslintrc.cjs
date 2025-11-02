module.exports = {
  extends: [
    "@kachkaev/eslint-config-react",
    "@kachkaev/eslint-config-react/extra-type-checking",
  ],

  rules: {
    "@typescript-eslint/no-parameter-properties": "off",
  },

  overrides: [
    {
      files: ["*.cjs"],
      rules: {
        "@typescript-eslint/no-require-imports": "off",
        "unicorn/no-empty-file": "off",
      },
    },
  ],
};

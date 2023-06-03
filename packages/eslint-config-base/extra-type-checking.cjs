/* eslint-disable @typescript-eslint/naming-convention -- needed due to third-party object shapes */
module.exports = {
  overrides: [
    {
      files: ["*.{ts,tsx}"],
      extends: [
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      parserOptions: {
        project: "./tsconfig.json",
      },
      rules: {
        "@typescript-eslint/no-confusing-void-expression": "error",
        "@typescript-eslint/no-unnecessary-condition": "error",
        "@typescript-eslint/restrict-plus-operands": [
          "error",
          { allowAny: true },
        ],
        "@typescript-eslint/switch-exhaustiveness-check": "error",
      },
    },
  ],
};

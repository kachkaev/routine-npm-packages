module.exports = {
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "prettier",
    "prettier/@typescript-eslint",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "import", "json", "simple-import-sort"],
  rules: {
    "@typescript-eslint/array-type": ["error", { default: "array-simple" }],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { ignoreRestSiblings: true },
    ],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unused-expressions": [
      "error",
      { allowTaggedTemplates: true },
    ],

    "import/default": "off",
    "import/export": "off",
    "import/order": "off",
    "import/no-duplicates": "error",
    "import/no-named-as-default": "off",
    "import/no-named-as-default-member": "error",
    "import/no-unresolved": "error",
    "import/named": "off", // https://github.com/benmosher/eslint-plugin-import/issues/1341
    "import/namespace": "error",

    "no-console": "error",
    "no-shadow": "error",
    "no-unused-vars": "off",
    "object-shorthand": ["error", "always"],
    "simple-import-sort/sort": "error",
    "sort-imports": "off",
  },
  overrides: [
    {
      files: ["*.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
    {
      files: ["*.test.ts", "*.test.tsx"],
      rules: {
        "@typescript-eslint/no-non-null-assertion": "off",
      },
    },
  ],
};

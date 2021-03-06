module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    "plugin:json/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "prettier",
    "prettier/@typescript-eslint",
  ],
  parser: require.resolve("@typescript-eslint/parser"),
  plugins: [
    "@typescript-eslint/eslint-plugin",
    "eslint-plugin-import",
    "eslint-plugin-jest",
    "eslint-plugin-json",
    "eslint-plugin-simple-import-sort",
  ],
  reportUnusedDisableDirectives: true,
  rules: {
    "@typescript-eslint/array-type": ["error", { default: "array-simple" }],
    "@typescript-eslint/ban-ts-comment": [
      "error",
      {
        "ts-expect-error": "allow-with-description",
        "ts-ignore": "allow-with-description",
        minimumDescriptionLength: 10,
      },
    ],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-member-accessibility": [
      "error",
      { accessibility: "no-public" },
    ],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/naming-convention": [
      "error",
      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md
      {
        selector: "class",
        format: ["StrictPascalCase"],
      },
      {
        selector: "typeLike",
        format: ["PascalCase"],
      },
      {
        selector: ["variableLike"],
        format: ["strictCamelCase", "StrictPascalCase"],
        filter: {
          regex: "^(_|.*[XYZ][A-Z].*)$",
          match: false,
        },
      },
      {
        selector: ["memberLike"],
        leadingUnderscore: "allow",
        filter: {
          regex: "^(__ANT_.*|_|__html|.*(--|__).*)$",
          match: false,
        },
        format: ["strictCamelCase", "StrictPascalCase", "UPPER_CASE"],
      },
    ],
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-parameter-properties": "error",
    "@typescript-eslint/no-shadow": ["error"],
    "@typescript-eslint/no-unused-expressions": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { ignoreRestSiblings: true },
    ],
    // "@typescript-eslint/restrict-plus-operands": "error", // https://github.com/typescript-eslint/typescript-eslint/issues/386
    curly: "error",
    eqeqeq: "error",
    "func-style": "error",
    "import/default": "off", // Covered by TSC
    "import/export": "off", // Covered by TSC
    "import/first": "error",
    "import/named": "off", // https://github.com/benmosher/eslint-plugin-import/issues/1341
    "import/namespace": "off", // Covered by TSC + drops performance significantly
    "import/newline-after-import": "error",
    "import/no-duplicates": "error", // warning by default
    "import/no-named-as-default-member": "off", // Too opinionated
    "import/no-named-as-default": "off", // Too opinionated
    "import/no-unresolved": ["error", { ignore: [".svg$"] }],
    "import/no-useless-path-segments": ["error", { noUselessIndex: true }],
    "import/order": "off", // See simple-import-sort/sort
    // "import/order": ["error", { "newlines-between": "never" }], // Also see https://github.com/benmosher/eslint-plugin-import/pull/1105
    "jest/no-deprecated-functions": "off", // Unable to detect Jest version - please ensure jest package is installed, or otherwise set version explicitly
    "jest/no-test-callback": "off", // not compatible with testing Task.fork() etc.
    "lines-between-class-members": [
      "error",
      "always",
      { exceptAfterSingleLine: true },
    ],
    "no-alert": "error",
    "no-console": "error",
    "no-eval": "error",
    "no-restricted-imports": [
      "error",
      {
        // Generate list of not allowed imports: ".", "..", "../..", "../../..", "../../../..", and so on
        paths: Array.from({ length: 10 }).map((_, depth) => ({
          name: "../".repeat(depth).slice(0, -1) || ".",
          message:
            "Please don not import from parent index files as this may cause crashes due to cyclic dependencies. Use something like ../../path/to/stuff instead.",
        })),
      },
    ],
    "newline-before-return": "error",
    "no-restricted-syntax": [
      "error",
      {
        selector: "TSEnumDeclaration",
        message:
          'Use TypeScript unions instead of enums (e.g type Foo = "a" | "b" | "c")', // https://github.com/typescript-eslint/typescript-eslint/issues/561
      },
    ],
    "object-shorthand": "error",
    "prefer-arrow-callback": "error",
    "prefer-template": "error",
    "simple-import-sort/sort": "error",
    "sort-imports": "off", // See simple-import-sort/sort
    "spaced-comment": ["error", "always", { block: { balanced: true } }],
  },
  overrides: [
    {
      // Avoid "'module'|'console' is not defined" (caused by no-undef)
      files: ["*.js"],
      env: { node: true },
    },
    {
      // Allow tool configurations to require("module-name")
      files: ["*.config.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
    {
      // Avoid replacing "///" with "// /" in the autogenerated next-env.d.ts without having to maintain this path in .eslintignore
      files: ["next-env.d.ts"],
      rules: {
        "spaced-comment": "off",
      },
    },
  ],
};

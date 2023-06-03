/* eslint-disable @typescript-eslint/naming-convention -- needed due to third-party object shapes */
const baseRestrictedSyntax = [
  {
    selector: "TSEnumDeclaration",
    message:
      'Use TypeScript unions instead of enums (e.g type Foo = "a" | "b" | "c")', // https://github.com/typescript-eslint/typescript-eslint/issues/561
  },
];

const baseNamingConvention =
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md
  [
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
        // _ is for lodash
        // [^_]*[XYZ][A-Z][a-z][^_]* is for variables referring to Cartesian coordinates (e.g. myXRange / someYAxis). The regex contains [^_]* and [A-Z][a-z] to not match MYVAR / MYVar_OOPS.
        regex: "^(_|[^_]*[XYZ][A-Z][a-z][^_]*)$",
        match: false,
      },
    },
    {
      selector: ["memberLike"],
      leadingUnderscore: "allow",
      filter: {
        // __ANT_.* is for components shadowing things like https://github.com/ant-design/ant-design/blob/ea02c93c448879c7bf8c3e7acb35095882f2e10d/components/tooltip/index.tsx#L86-L89
        // __html is for https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
        // StrictPascalCase, -- and __ are for http://getbem.com/naming/ + https://www.npmjs.com/package/classnames
        // UPPER_CASE is for https://www.npmjs.com/package/envalid
        regex: "^(__ANT_.*|_|.*[XYZ][A-Z].*|__html|.*(--|__).*)$",
        match: false,
      },
      format: ["strictCamelCase", "StrictPascalCase", "UPPER_CASE"],
    },
  ];

const restrictedParentImportPaths = Array.from({ length: 10 }).map(
  (value, depth) => ({
    name: "../".repeat(depth + 1).slice(0, -1) || ".",
    message:
      "Please don not import from parent index files as this may cause crashes due to cyclic dependencies. Use something like ../../path/to/stuff instead.",
  }),
);

/** @type{import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:jest/recommended",
    "plugin:json/recommended",
    "plugin:unicorn/recommended",
    "prettier",
  ],
  parser: require.resolve("@typescript-eslint/parser"),
  plugins: [
    "@typescript-eslint/eslint-plugin",
    "eslint-plugin-import",
    "eslint-plugin-jest",
    "eslint-plugin-json",
    "eslint-plugin-simple-import-sort",
    "unicorn",
  ],
  reportUnusedDisableDirectives: true,
  rules: {
    "@typescript-eslint/array-type": ["error", { default: "array-simple" }],
    "@typescript-eslint/ban-ts-comment": [
      "error",
      {
        "ts-expect-error": "allow-with-description",
        "ts-ignore": "allow-with-description", // autofixed via @typescript-eslint/prefer-ts-expect-error
        minimumDescriptionLength: 10,
      },
    ],
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-member-accessibility": [
      "error",
      { accessibility: "no-public" },
    ],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/naming-convention": ["error", ...baseNamingConvention],
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-parameter-properties": "error",
    "@typescript-eslint/no-shadow": "error",
    "@typescript-eslint/no-unused-expressions": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { ignoreRestSiblings: true, caughtErrors: "all" },
    ],
    "@typescript-eslint/no-use-before-define": "error",
    "@typescript-eslint/prefer-ts-expect-error": "error",
    curly: "error",
    eqeqeq: "error",
    "func-style": "error",
    "import/default": "off", // Covered by TSC
    "import/export": "off", // Covered by TSC
    "import/first": "error",
    "import/named": "off", // https://github.com/benmosher/eslint-plugin-import/issues/1341
    "import/namespace": "off", // Covered by TSC + drops performance significantly
    "import/newline-after-import": "error",
    "import/no-anonymous-default-export": "error",
    "import/no-default-export": "error",
    "import/no-duplicates": "error", // warning by default
    "import/no-named-as-default-member": "off", // Too opinionated
    "import/no-named-as-default": "off", // Too opinionated
    "import/no-unresolved": ["error", { ignore: [".svg$"] }],
    "import/no-useless-path-segments": ["error", { noUselessIndex: true }],
    "import/order": "off", // See simple-import-sort/sort
    // "import/order": ["error", { "newlines-between": "never" }], // Also see https://github.com/benmosher/eslint-plugin-import/pull/1105
    "jest/no-deprecated-functions": "off", // Unable to detect Jest version - please ensure jest package is installed, or otherwise set version explicitly
    "jest/no-test-callback": "off", // not compatible with testing Task.fork() etc.
    "jest/prefer-to-be": "error",
    "id-length": [
      "error",
      {
        min: 2,
        exceptions: [
          "_", // lodash
          "x", // cartesian coordinates
          "y",
          "z",

          "t", // time coordinate / translation function

          "a", // arguments of comparison functions
          "b",

          "A", // styled components
          "P",
        ],
        properties: "never",
      },
    ],
    "lines-between-class-members": [
      "error",
      "always",
      { exceptAfterSingleLine: true },
    ],
    "no-alert": "error",
    "no-console": "error",
    "no-eval": "error",
    "no-param-reassign": [
      "error",
      {
        props: true,
        ignorePropertyModificationsForRegex: ["^draft"],
        ignorePropertyModificationsFor: ["req", "request", "res", "response"],
      },
    ],
    "no-restricted-imports": [
      "error",
      {
        paths: [
          ...restrictedParentImportPaths,
          {
            name: ".",
            message:
              "Please don not import parent index files as this may cause crashes due to cyclic dependencies. Use something like ./sibling instead.",
          },
        ],
      },
    ],
    "newline-before-return": "error",
    "no-restricted-syntax": ["error", ...baseRestrictedSyntax],
    "object-shorthand": "error",
    "prefer-arrow-callback": "error",
    "prefer-template": "error",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "sort-imports": "off", // See simple-import-sort/sort
    "spaced-comment": ["error", "always", { block: { balanced: true } }],
    "unicorn/import-style": [
      "error",
      {
        styles: {
          lodash: { default: true },
        },
      },
    ],
    "unicorn/prevent-abbreviations": "off",
  },
  overrides: [
    {
      // Avoid "'module'|'console' is not defined" (caused by no-undef)
      files: ["**/*.{cjs,js,mjs}"],
      env: { node: true },
    },
    {
      // Allow default exports in configs and Next.js pages
      files: ["**/*.config.{cjs,js,mjs}", "**/pages/**"],
      rules: {
        "import/no-default-export": "off",
      },
    },
    {
      files: ["*rc.{c,m,}js"],
      rules: {
        "@typescript-eslint/naming-convention": [
          "error",
          ...baseNamingConvention.filter(
            ({ selector }) => !selector.includes("memberLike"),
          ),
        ],
      },
    },
    {
      // Allow CommonJS modules to use "require"
      files: ["*.cjs"],
      env: {
        node: true,
      },
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
    {
      // Disallow exports from scripts
      files: ["**/scripts/**"],
      rules: {
        "no-restricted-syntax": [
          "error",
          ...baseRestrictedSyntax,
          {
            selector: "ExportNamedDeclaration,ExportDefaultDeclaration",
            message:
              "A script cannot have exports. Reusable logic should be stored outside /scripts/.",
          },
        ],
      },
    },
    {
      // Allow imports from index in `*.test.ts` files
      files: ["**/*.test.{cjs,js,mts,ts,tsx}"],
      rules: {
        "no-restricted-imports": [
          "error",
          { paths: restrictedParentImportPaths },
        ],
      },
    },
  ],
};

import eslintJs from "@eslint/js";
// @ts-expect-error -- pending https://github.com/eslint-community/eslint-plugin-eslint-comments/pull/246
import eslintPluginEslintCommentsConfigs from "@eslint-community/eslint-plugin-eslint-comments/configs";
import stylisticEslintPlugin from "@stylistic/eslint-plugin";
import type { Linter } from "eslint";
import eslintPluginCheckFile from "eslint-plugin-check-file";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginRegexp from "eslint-plugin-regexp";
import eslintPluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import tseslint from "typescript-eslint";

/**
 * Replaces "error" with "warn" for all rules in one or more config objects
 *
 * Useful for stylistic rule sets (the ones that are not likely to prevent runtime errors)
 */
export function replaceErrorWithWarn(
  configObject: Linter.Config,
): Linter.Config;
export function replaceErrorWithWarn(
  configObjects: Linter.Config[],
): Linter.Config[];
export function replaceErrorWithWarn(
  oneOrMoreConfigObjects: Linter.Config | Linter.Config[],
): Linter.Config | Linter.Config[] {
  if (Array.isArray(oneOrMoreConfigObjects)) {
    return oneOrMoreConfigObjects.map((configObject: Linter.Config) =>
      replaceErrorWithWarn(configObject),
    );
  }

  const configObject = oneOrMoreConfigObjects;

  return {
    ...configObject,
    rules: Object.fromEntries(
      Object.entries(configObject.rules ?? {}).map(([rule, value]) => [
        rule,
        value === "error"
          ? "warn"
          : Array.isArray(value) && value[0] === "error"
            ? ["warn", ...value.slice(1)]
            : value,
      ]),
    ),
  };
}

export const ruleArgsForIdLength = [
  "error",
  {
    min: 2,
    exceptions: [
      "a", // arguments of comparison functions
      "b",
      "d", // datum in visualizations

      "t", // time coordinate / translation function

      "x", // Cartesian coordinates
      "y",
      "z",
    ],
    properties: "never",
  },
] as const;

export const ruleArgsForNoRestrictedImports = [
  "warn",
  {
    paths: [
      {
        name: "zod/v3",
        message: "Import from zod instead",
      },
      {
        name: "zod/v4",
        message: "Import from zod instead",
      },
    ],
    patterns: [
      {
        // Context: https://hash.dev/blog/file-structuring
        group: ["**/shared/@*/*/", "**./@*/*/"],
        message:
          "You've added a dependency on an internal resource of a shared mini-library. Please re-export your import from `shared/@namespace/mini-lib` or pull it out into a separate mini-lib.",
      },
      {
        group: ["**/shared/[a-z]*/"],
        message:
          "You've added a dependency on an internal resource of a shared mini-library. Please re-export your import from `shared/mini-lib` or pull it out into a separate mini-lib.",
      },

      {
        group: ["**/../@local/**"],
        message:
          "This import refers to another monorepo workspace but uses relative path. Please replace it with a workspace import (e.g. `@local/xyz`).",
      },
      {
        group: ["**/../@repo/**"],
        message:
          "This import refers to another monorepo workspace but uses relative path. Please replace it with a workspace import (e.g. `@repo/xyz`).",
      },
    ],
  },
] as const;

export const ruleArgsForNoRestrictedSyntax = [
  "warn",
  {
    selector: "Literal[value=/#[0-9a-fA-F]{0,7}[A-F][0-9a-fA-F]{0,7}/]",
    message:
      // eslint-disable-next-line no-restricted-syntax -- the rule is barking on itself
      "Please define color HEX codes in lower case for consistency (e.g. #ABCD12 → #abcd12)",
  },
  {
    selector:
      "TemplateElement[value.raw=/#[0-9a-fA-F]{0,7}[A-F][0-9a-fA-F]{0,7}/]",
    message:
      // eslint-disable-next-line no-restricted-syntax -- the rule is barking on itself
      "Please define color HEX codes in lower case for consistency (e.g. #ABCD12 → #abcd12)",
  },
  {
    selector: "TSIntersectionType > TSStringKeyword",
    message:
      "If you want to mix a union type with `string` but retain auto-completion, please use `LiteralUnion<YourUnion, string>` from `type-fest`",
  },
] as const;

export const ruleArgsForNamingConvention = [
  "error",
  {
    selector: "typeLike",
    format: ["PascalCase"],
  },
  {
    selector: "variable",
    format: ["camelCase", "PascalCase"],
  },
] as const;

export const ruleArgsForUnicornImportStyle = [
  "warn",
  {
    styles: {
      "date-fns": { namespace: true },
    },
  },
] as const;

export const baseConfigs: Linter.Config[] = [
  {
    files: ["**/*.{ts,tsx}"],
  },

  {
    ignores: ["dist/", "node_modules/"],
  },

  eslintJs.configs.recommended,
  {
    rules: {
      curly: "warn",
      eqeqeq: "error",
      "func-style": ["error", "declaration"],
      "id-length": ruleArgsForIdLength,
      "no-alert": "warn",
      "no-console": "warn",
      "no-debugger": "error",
      "no-empty": "warn",
      "no-empty-pattern": "warn",
      "no-implicit-coercion": "error",
      "no-param-reassign": "error",
      "no-restricted-imports": ruleArgsForNoRestrictedImports,
      "no-restricted-syntax": ruleArgsForNoRestrictedSyntax,
      "no-undef": "off", // Handled by TypeScript
      "no-useless-rename": "warn",
      "object-shorthand": "warn",
      "prefer-const": "warn",
    },
  },

  replaceErrorWithWarn(
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions, @typescript-eslint/no-unsafe-member-access -- pending https://github.com/eslint-community/eslint-plugin-eslint-comments/pull/246
    eslintPluginEslintCommentsConfigs.recommended as Linter.Config,
  ),
  {
    rules: {
      "@eslint-community/eslint-comments/no-unused-disable": "warn",
      "@eslint-community/eslint-comments/require-description": [
        "warn",
        { ignore: ["eslint-enable"] },
      ],
    },
  },

  {
    plugins: {
      "check-file": eslintPluginCheckFile,
    },
    rules: {
      "check-file/no-index": "warn",
      "check-file/filename-blocklist": [
        "error",
        {
          "**/*util*": "",
          "**/*util*/**": "",
        },
        {
          errorMessage:
            "Avoid `util` / `utils` in file and folder names for consistency. Rename `xyz-util` / `xyz-utils` to `xyz-helpers`",
        },
      ],
    },
  },

  {
    plugins: {
      "@stylistic": stylisticEslintPlugin,
    },
    rules: {
      "@stylistic/quotes": [
        "warn",
        "double",
        {
          avoidEscape: true,
          ignoreStringLiterals: true,
        },
      ],
      "@stylistic/spaced-comment": [
        "warn",
        "always",
        {
          markers: ["/", "!"],
          block: { balanced: true },
        },
      ],
    },
  },

  ...tseslint.configs.strictTypeChecked,
  ...replaceErrorWithWarn(tseslint.configs.stylisticTypeChecked),
  {
    rules: {
      // Included in `plugin:@typescript-eslint/*` presets; listed here because of custom config
      "@typescript-eslint/array-type": ["warn", { default: "array-simple" }],
      "@typescript-eslint/ban-ts-comment": [
        "warn",
        {
          "ts-expect-error": { descriptionFormat: String.raw`^ -- [\S]` },
          "ts-ignore": "allow-with-description", // autofixed via @typescript-eslint/prefer-ts-expect-error
          minimumDescriptionLength: 10,
        },
      ],
      "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
      "@typescript-eslint/no-deprecated": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { ignoreRestSiblings: true, caughtErrors: "all" },
      ],
      "@typescript-eslint/restrict-template-expressions": ["error", {}], // Use default options instead of strict ones

      // Not included in `plugin:@typescript-eslint/*` presets, we chose to enable them
      "@typescript-eslint/consistent-type-imports": "warn",
      "@typescript-eslint/consistent-type-assertions": [
        "warn",
        { assertionStyle: "never" },
      ],
      "@typescript-eslint/explicit-module-boundary-types": "warn",
      "@typescript-eslint/naming-convention": ruleArgsForNamingConvention,
      "@typescript-eslint/no-shadow": "error",
      "@typescript-eslint/no-unused-expressions": "warn",
      "@typescript-eslint/no-use-before-define": "warn",
    },
  },

  eslintPluginImport.flatConfigs.recommended,
  eslintPluginImport.flatConfigs.typescript,
  {
    rules: {
      "import/namespace": "off", // Handled by TypeScript + see https://github.com/import-js/eslint-plugin-import/issues/3135
      "import/no-unresolved": "off", // Handled by TypeScript + see https://github.com/import-js/eslint-plugin-import/issues/3135

      "import/first": "warn",
      "import/newline-after-import": "warn",
      "import/no-default-export": "warn",
      "import/no-duplicates": ["warn", { "prefer-inline": true }],
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: false,
          optionalDependencies: false,
          peerDependencies: false,
        },
      ],
      "import/no-useless-path-segments": ["warn", { noUselessIndex: true }],
    },
  },

  eslintPluginRegexp.configs["flat/recommended"],

  {
    plugins: {
      "simple-import-sort": eslintPluginSimpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": [
        "warn",
        {
          groups: [
            [String.raw`^\u0000`], // Side effect imports
            ["^node:"], // Node.js builtins
            [String.raw`^(?!@(local|repo))@?\w`], // Imports from external packages
            ["^@(local|repo)"], // Imports from the monorepo
            [String.raw`^\.`], // Relative imports
          ],
        },
      ],
      "simple-import-sort/exports": "warn",
    },
  },

  replaceErrorWithWarn(eslintPluginUnicorn.configs.recommended),
  {
    rules: {
      "unicorn/better-regex": "off", // https://github.com/sindresorhus/eslint-plugin-unicorn/issues/1852
      "unicorn/catch-error-name": "off", // https://github.com/sindresorhus/eslint-plugin-unicorn/issues/2149
      "unicorn/expiring-todo-comments": "off", // Dates in TODOs can track when the TODO was created
      "unicorn/import-style": ruleArgsForUnicornImportStyle,
      "unicorn/no-nested-ternary": "off", // Conflicts with prettier
      "unicorn/no-useless-undefined": ["warn", { checkArguments: false }],
      "unicorn/prefer-native-coercion-functions": "off", // Blocked by https://github.com/sindresorhus/eslint-plugin-unicorn/issues/1857
      "unicorn/prefer-set-has": "off", // Using plain arrays is marginally slower but produces serializable data that can be used in more ways
      "unicorn/prefer-top-level-await": "off", // https://github.com/sindresorhus/eslint-plugin-unicorn/issues/2149
      "unicorn/prevent-abbreviations": "off", // Too opinionated (could be re-enabled with custom config)
    },
  },

  {
    files: [
      "**/*.config.ts",
      "**/*.test.{ts,tsx}",
      "scripts/**",
      "test/**",
      "tests/**",
    ],
    rules: {
      "import/no-extraneous-dependencies": [
        "error",
        {
          devDependencies: true,
          optionalDependencies: false,
          peerDependencies: false,
        },
      ],
    },
  },

  {
    files: [
      "*.config.ts",
      "**/*.d.ts",
      "**/plugin.ts", // custom ESLint plugin (following community pattern)
      "**/rules/*.ts", // custom ESLint rules (following community pattern)
    ],
    rules: {
      "import/no-default-export": "off",
    },
  },

  {
    files: ["**/*.d.ts"],
    rules: {
      "@typescript-eslint/consistent-type-definitions": "off", // Useful to extend third-party interfaces
      "@typescript-eslint/consistent-indexed-object-style": "off", // Useful to extend third-party interfaces
      "@typescript-eslint/no-empty-object-type": "off", // Useful to extend third-party interfaces
    },
  },
];

export function generateConfigsForLanguageOptions(
  dirname: string,
): Linter.Config[] {
  return [
    {
      languageOptions: {
        parser: tseslint.parser,
        parserOptions: {
          projectService: true,
          tsconfigRootDir: dirname,
        },
      },
    },
  ];
}

import eslintReactEslintPlugin from "@eslint-react/eslint-plugin";
import {
  ruleArgsForNoRestrictedSyntax as baseRuleArgsForNoRestrictedSyntax,
  ruleArgsForUnicornImportStyle as baseRuleArgsForUnicornImportStyle,
} from "@kachkaev/eslint-config-base";
import eslintPluginNext from "@next/eslint-plugin-next";
import type { Linter } from "eslint";
import eslintPluginBetterTailwindcss from "eslint-plugin-better-tailwindcss";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";

export * from "@kachkaev/eslint-config-base";

const ruleArgsForNoRestrictedSyntax = [
  ...baseRuleArgsForNoRestrictedSyntax,
  {
    selector:
      "TSQualifiedName[left.name=React][right.name=/^(FunctionComponent|VoidFunctionComponent|FC|SFC|VFC)$/]",
    message:
      "This type is not needed, see https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components/ for context. If you want to pass a component as prop, use `React.ComponentType`",
  },
  {
    selector:
      "TSUnionType[types.0.typeName.right.name=ReactNode][types.1.type=TSUndefinedKeyword]",
    message:
      "React.ReactNode includes `undefined`, so you can remove `| undefined` from the type",
  },
  {
    selector: String.raw`TSPropertySignature[key.name=/^(c|\w+C)lassName$/][optional=true] > TSTypeAnnotation > *:not(TSUnionType[types.0.type=TSStringKeyword][types.1.type=TSUndefinedKeyword])`,
    message:
      "Type of class name prop should be `string | undefined` to avoid edge cases in component props",
  },
  {
    selector: String.raw`TSPropertySignature[key.name=/^(s|\w+S)tyle$/][optional=true] > TSTypeAnnotation:has(TSQualifiedName[right.name=CSSProperties]) > *:not(TSFunctionType):not(TSUnionType[types.0.type=TSTypeReference][types.1.type=TSUndefinedKeyword])`,
    message:
      "Type of style prop should be `React.CSSProperties | undefined` to avoid edge cases in component props",
  },
  {
    selector: String.raw`JSXAttribute[name.name=className][value.value=/^\s*$/]`,
    message: "Please remove this attribute or add values to it",
  },
] as const;

const ruleArgsForUnicornImportStyle = [
  baseRuleArgsForUnicornImportStyle[0],
  {
    styles: {
      ...baseRuleArgsForUnicornImportStyle[1].styles,
      react: { namespace: true },
    },
  },
] as const;

export const configsForReact: Linter.Config[] = [
  {
    ignores: [".next/"],
  },

  {
    rules: {
      "no-restricted-syntax": [...ruleArgsForNoRestrictedSyntax],

      "unicorn/prefer-global-this": "off", // Allow window.* alongside globalThis.* (which is more practical in frontend code)
      "unicorn/import-style": [...ruleArgsForUnicornImportStyle],
    },
  },

  eslintReactEslintPlugin.configs["strict-type-checked"],
  {
    rules: {
      "@eslint-react/hooks-extra/no-direct-set-state-in-use-effect": "warn",
      "@eslint-react/no-missing-component-display-name": "warn",
    },
  },

  eslintPluginReact.configs.flat["recommended"] ?? {},
  eslintPluginReact.configs.flat["jsx-runtime"] ?? {},
  {
    rules: {
      "react/display-name": "off", // Handled by @eslint-react/no-missing-component-display-name
      "react/jsx-key": "off", // Handled by @eslint-react/no-missing-key
      "react/no-array-index-key": "off", // Handled by @eslint-react/no-array-index-key
      "react/no-render-return-value": "off", // Drops performance, no practical value
      "react/prop-types": "off", // Handled by TypeScript

      "react/function-component-definition": "warn",
      "react/jsx-boolean-value": ["warn", "always"],
      "react/jsx-curly-brace-presence": "warn",
      "react/jsx-fragments": "warn",
      "react/no-unknown-property": "warn",
      "react/self-closing-comp": "warn",
    },
    settings: { react: { version: "detect" } },
  },

  eslintPluginReactHooks.configs.flat.recommended,

  {
    files: ["**/*.tsx"],
    rules: {
      "@typescript-eslint/explicit-module-boundary-types": "off",
    },
  },
];

export const configsForNext: Linter.Config[] = [
  {
    name: "@kachkaev/eslint-config-react -> next",
    plugins: {
      "@next/next": eslintPluginNext,
    },
    rules: {
      ...eslintPluginNext.configs.recommended.rules,
      ...eslintPluginNext.configs["core-web-vitals"].rules,

      "@next/next/no-img-element": "off",
    },
  },
];

export function generateConfigsForTailwindcss(
  entryPoint: string | undefined,
): Linter.Config[] {
  return [
    {
      name: "@kachkaev/eslint-config-react -> tailwindcss",
      plugins: {
        "better-tailwindcss": eslintPluginBetterTailwindcss,
      },
      settings: {
        "better-tailwindcss": {
          attributes: [
            "^(.+C|c)lassName$",
            ["^(.+C|c)lassName$", [{ match: "string" }]],
          ],
          entryPoint,
        },
      },
      rules: {
        "better-tailwindcss/enforce-consistent-class-order": "warn",
        "better-tailwindcss/enforce-consistent-important-position": "warn",
        "better-tailwindcss/enforce-consistent-variable-syntax": "warn",
        "better-tailwindcss/enforce-shorthand-classes": "warn",
        "better-tailwindcss/no-conflicting-classes": "warn",
        "better-tailwindcss/no-deprecated-classes": "warn",
        "better-tailwindcss/no-duplicate-classes": "warn",
        "better-tailwindcss/no-restricted-classes": "error",
        "better-tailwindcss/no-unknown-classes": "error",
        "better-tailwindcss/no-unnecessary-whitespace": "warn",
      },
    },
  ];
}

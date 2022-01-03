const baseConfig = require("@kachkaev/eslint-config-base");

module.exports = {
  extends: [
    "@kachkaev/eslint-config-base",
    "plugin:react/recommended",
    "plugin:testing-library/react",
  ],
  plugins: ["react", "react-hooks"],
  rules: {
    "react-hooks/exhaustive-deps": "error",
    "react-hooks/rules-of-hooks": "error",
    "react/jsx-boolean-value": ["error", "always"],
    "react/jsx-curly-brace-presence": "error",
    "react/jsx-fragments": "error",
    "react/no-danger": "error",
    "react/no-render-return-value": "off", // Drops performance, no real value
    "react/prop-types": "off",
    "react/self-closing-comp": "error",
    "no-restricted-syntax": [
      "error",
      ...baseConfig.rules["no-restricted-syntax"].slice(1),
      {
        selector:
          "TSQualifiedName[left.name=React][right.name=/^(FunctionComponent|FC|SFC|VFC)$/]",
        message:
          "Please use `React.VoidFunctionComponent` instead. Context: https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/function_components/",
      },
      // Two rules below help us avoid this common point of confusion: https://stackoverflow.com/q/53048037
      // The selectors are inspired by https://github.com/yannickcr/eslint-plugin-react/issues/2073#issuecomment-844344470
      {
        selector:
          ":matches(JSXElement, JSXFragment) > JSXExpressionContainer > LogicalExpression[operator='&&']",
        message:
          "Please use `condition ? <Jsx /> : undefined`. Otherwise, there is a chance of rendering '0' instead of '' in some cases. Context: https://stackoverflow.com/q/53048037",
      },
      {
        selector:
          ":matches(JSXElement, JSXFragment) > JSXExpressionContainer > LogicalExpression[operator='||']",
        message:
          "Please use `value ?? fallbackValue`. Otherwise, there is a chance of rendering '0' instead of '' in some cases. Context: https://stackoverflow.com/q/53048037",
      },
    ],
    "unicorn/import-style": [
      "error",
      {
        styles: {
          ...baseConfig.rules["unicorn/import-style"][1].styles,
          react: { namespace: true },
        },
      },
    ],
  },
  settings: { react: { version: "detect" } },
  overrides: [
    {
      files: ["*.test.ts", "*.test.tsx"],
      rules: {
        "react/display-name": "off",
      },
    },
  ],
};

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

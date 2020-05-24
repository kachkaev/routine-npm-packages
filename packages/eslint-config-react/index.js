module.exports = {
  extends: ["@kachkaev/eslint-config-base"],
  plugins: ["react", "react-hooks"],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "react/prop-types": "off",
  },
  settings: {
    react: { version: "detect" },
  },
};

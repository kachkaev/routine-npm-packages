---
"@kachkaev/eslint-config-base": major
"@kachkaev/eslint-config-next": major
---

Require ESLint v10 (v9 reached end of life) and update all plugins to their latest versions

- `eslint-plugin-import` and `eslint-plugin-react` do not have ESLint 10-compatible releases on npm yet (see [import-js/eslint-plugin-import#3278](https://github.com/import-js/eslint-plugin-import/issues/3278) and [jsx-eslint/eslint-plugin-react#3977](https://github.com/jsx-eslint/eslint-plugin-react/issues/3977)), so they are temporarily installed from git snapshots hosted in [kachkaev/eslint-plugin-import](https://github.com/kachkaev/eslint-plugin-import) (upstream `main`, which already supports ESLint 10) and [kachkaev/eslint-plugin-react](https://github.com/kachkaev/eslint-plugin-react) (community pull request [jsx-eslint/eslint-plugin-react#4022](https://github.com/jsx-eslint/eslint-plugin-react/pull/4022)).
- `eslint-plugin-unicorn` v74: `prevent-abbreviations` was renamed to `name-replacements` (still disabled), and new rules from its `recommended` preset are enabled as warnings.
- `@eslint-react/eslint-plugin` v5: rule names lost their `hooks-extra/`, `dom/`, `web-api/` and similar prefixes; `set-state-in-effect` is now part of the `strict-type-checked` preset.
- `@eslint/js` v10 `recommended`: enables `no-unassigned-vars`, `no-useless-assignment` and `preserve-caught-error`.

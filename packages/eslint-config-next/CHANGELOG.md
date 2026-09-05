# @kachkaev/eslint-config-next

## 2.0.0

### Major Changes

- [#331](https://github.com/kachkaev/reusable-stuff/pull/331) [`f8c01ae`](https://github.com/kachkaev/reusable-stuff/commit/f8c01ae1828f8ee2a7047d275d441f97dc852452) - Require ESLint v10 (v9 reached end of life) and update all plugins to their latest versions

  - `eslint-plugin-import` and `eslint-plugin-react` do not have ESLint 10-compatible releases on npm yet (see [import-js/eslint-plugin-import#3278](https://github.com/import-js/eslint-plugin-import/issues/3278) and [jsx-eslint/eslint-plugin-react#3977](https://github.com/jsx-eslint/eslint-plugin-react/issues/3977)), so they are temporarily installed from git snapshots hosted in [kachkaev/eslint-plugin-import](https://github.com/kachkaev/eslint-plugin-import) (upstream `main`, which already supports ESLint 10) and [kachkaev/eslint-plugin-react](https://github.com/kachkaev/eslint-plugin-react) (community pull request [jsx-eslint/eslint-plugin-react#4022](https://github.com/jsx-eslint/eslint-plugin-react/pull/4022)).
  - `eslint-plugin-unicorn` v74: `prevent-abbreviations` was renamed to `name-replacements` (still disabled), and new rules from its `recommended` preset are enabled as warnings.
  - `@eslint-react/eslint-plugin` v5: rule names lost their `hooks-extra/`, `dom/`, `web-api/` and similar prefixes; `set-state-in-effect` is now part of the `strict-type-checked` preset.
  - `@eslint/js` v10 `recommended`: enables `no-unassigned-vars`, `no-useless-assignment` and `preserve-caught-error`.

### Minor Changes

- [#341](https://github.com/kachkaev/reusable-stuff/pull/341) [`4caf113`](https://github.com/kachkaev/reusable-stuff/commit/4caf1137620599addd8049d20df8fca8ddd5ed00) - Allow default exports in more Next.js file conventions: `forbidden`, `global-not-found`, `template`, `unauthorized`, `mdx-components` and the metadata routes (`apple-icon`, `icon`, `manifest`, `opengraph-image`, `robots`, `sitemap`, `twitter-image`, including numbered variants such as `icon0.tsx`)

- [#343](https://github.com/kachkaev/reusable-stuff/pull/343) [`220d5b4`](https://github.com/kachkaev/reusable-stuff/commit/220d5b40ab3ff80b07a09e3e26e30c812a02336f) - Scope all generated config blocks to `**/*.{ts,tsx}` (via `defineConfig` + `extends`), so that configs for other languages can be added alongside without JavaScript rules crashing on them. When `tailwindcssEntryPoint` is set, `@kachkaev/eslint-config-next` now also lints Tailwind classes in `@apply` directives inside `*.css` files

### Patch Changes

- [#345](https://github.com/kachkaev/reusable-stuff/pull/345) [`d68c237`](https://github.com/kachkaev/reusable-stuff/commit/d68c237c43e2a9e814ca09a69edd1cdfaffe5b48) - Simplify README setup examples (no more spreading into `defineConfig`) and fix mistakes in the Next.js README (wrong package name in the install command, wrong function name in the `tsconfigRootDir` and `tailwindcssEntryPoint` snippets)

- [#335](https://github.com/kachkaev/reusable-stuff/pull/335) [`b3f6cff`](https://github.com/kachkaev/reusable-stuff/commit/b3f6cff164995fa1838ef58fcfeb9766eb9cecf9) - Document how to use the configs with TypeScript 7 (keep the TypeScript 6 JavaScript API under the `typescript` name for typescript-eslint, as recommended in the TypeScript 7 announcement)
- Updated dependencies [[`d68c237`](https://github.com/kachkaev/reusable-stuff/commit/d68c237c43e2a9e814ca09a69edd1cdfaffe5b48), [`f8c01ae`](https://github.com/kachkaev/reusable-stuff/commit/f8c01ae1828f8ee2a7047d275d441f97dc852452), [`220d5b4`](https://github.com/kachkaev/reusable-stuff/commit/220d5b40ab3ff80b07a09e3e26e30c812a02336f), [`b3f6cff`](https://github.com/kachkaev/reusable-stuff/commit/b3f6cff164995fa1838ef58fcfeb9766eb9cecf9)]:
  - @kachkaev/eslint-config-base@2.0.0

## 1.2.0

### Patch Changes

- Updated dependencies [[`e885ad0`](https://github.com/kachkaev/reusable-stuff/commit/e885ad0147ba5c04f6045ecceea909bdb5662d68)]:
  - @kachkaev/eslint-config-base@1.2.0

## 1.1.1

### Patch Changes

- [`f3570fd`](https://github.com/kachkaev/reusable-stuff/commit/f3570fd00eb7d0fafdc1ae985d159a15f51a4d1a) - Rename GitHub repository from routine-npm-packages to reusable-stuff

- Updated dependencies [[`f3570fd`](https://github.com/kachkaev/reusable-stuff/commit/f3570fd00eb7d0fafdc1ae985d159a15f51a4d1a)]:
  - @kachkaev/eslint-config-base@1.1.1

## 1.1.0

### Minor Changes

- [`6938a67`](https://github.com/kachkaev/reusable-stuff/commit/6938a67501b5b78b00d44ec96698da80409895db) - Update dependencies
  - #125
  - #137

### Patch Changes

- Updated dependencies [[`6938a67`](https://github.com/kachkaev/reusable-stuff/commit/6938a67501b5b78b00d44ec96698da80409895db), [`3159082`](https://github.com/kachkaev/reusable-stuff/commit/3159082f02d8ed80ca5b2daf1daf566a1e3321b7)]:
  - @kachkaev/eslint-config-base@1.1.0

## 1.0.1

### Patch Changes

- [`63fbf89`](https://github.com/kachkaev/reusable-stuff/commit/63fbf89a05dd044ba064d64ffeb50dff6e2d8260) - Add "types" field to package.json

- Updated dependencies [[`63fbf89`](https://github.com/kachkaev/reusable-stuff/commit/63fbf89a05dd044ba064d64ffeb50dff6e2d8260)]:
  - @kachkaev/eslint-config-base@1.0.1

## 1.0.0

### Major Changes

- [#51](https://github.com/kachkaev/reusable-stuff/pull/51) [`9be6837`](https://github.com/kachkaev/reusable-stuff/commit/9be68370ad306d326214ac25fa7f952a4e241769) - Update ESLint rules, switch to Flat config

### Patch Changes

- [#42](https://github.com/kachkaev/reusable-stuff/pull/42) [`fe1e75c`](https://github.com/kachkaev/reusable-stuff/commit/fe1e75c47454df6effb4034a9e321f78220b2987) - Configure release process and CHANGELOG generation via https://github.com/changesets/changesets

- Updated dependencies [[`65f398b`](https://github.com/kachkaev/reusable-stuff/commit/65f398bd55a60dff080f5771d2b90ee8be70712d), [`9be6837`](https://github.com/kachkaev/reusable-stuff/commit/9be68370ad306d326214ac25fa7f952a4e241769)]:
  - @kachkaev/eslint-config-base@1.0.0

# [@kachkaev](https://github.com/kachkaev) → eslint config (Next.js)

A collection of carefully picked ESLint rules and plugins for Next.js 16 projects (with Rect 19 and TailwindCSS 4).

Compatible with [ESLint](https://www.npmjs.com/package/eslint) v10+ (Flat config).
Requires [TypeScript](https://www.npmjs.com/package/typescript) to be present as a dependency.

Built atop [@kachkaev/eslint-config-base](https://www.npmjs.com/package/@kachkaev/eslint-config-base).

## Principles

This configuration uses warnings for rules that are related to code style (the ones that are not likely to prevent runtime errors), and errors otherwise.
This looks less noisy than using errors for all rules.
Both severity levels fail CI when `eslint` is called with `--max-warnings=0`.

It is assumed that all files are written in TypeScript and use ESM (not CommonJS).

## Adding to project

1.  Ensure your `package.json` contains `"type": "module"`.

1.  Ensure your project has a `tsconfig.json` file.

1.  Install these packages as dev dependencies:

    ```sh
    ## If you use NPM
    npm install -D eslint @kachkaev/eslint-config-base
    
    ## If you use PNPM
    pnpm add -D eslint @kachkaev/eslint-config-base
    
    ## If you use Yarn
    yarn add -D eslint @kachkaev/eslint-config-base
    ```

    > If you don't keep your Node.js runtime up-to-date, you might need to install `jiti` to enable `*.ts` files -- see [ESLint docs](https://eslint.org/docs/latest/use/configure/configuration-files#typescript-configuration-files) for details.

    > If you use TypeScript 7 (the native compiler), keep the TypeScript 6 JavaScript API installed under the `typescript` name, because [typescript-eslint](https://typescript-eslint.io) depends on it.
    > The aliases recommended in the [TypeScript 7 announcement](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/) make `tsc` run the native compiler while ESLint keeps working:
    >
    > ```json
    > {
    >   "devDependencies": {
    >     "@typescript/native": "npm:typescript@^7.0.2",
    >     "typescript": "npm:@typescript/typescript6@^6.0.2"
    >   }
    > }
    > ```

    > By default, this package installs the latest version of `@next/eslint-plugin-next`.
    > If you want the version of this plugin to match the version of Next.js you are using, you can pin this dependency in `package.json` and run `[npm/pnpm/yarn] dedupe`.
    > Example:
    >
    > ```json
    > {
    >   "dependencies": {
    >     "next": "x.y.z"
    >   },
    >   "devDependencies": {
    >     "@kachkaev/eslint-config-next": "a.b.c",
    >     "@next/eslint-plugin-next": "x.y.z"
    >   }
    > }
    > ```

1.  Create `eslint.config.ts` with the following contents:

    ```js
    import { defineConfig } from "eslint/config";
    import { generateNextConfigs } from "@kachkaev/eslint-config-next";

    export default defineConfig([
      ...generateNextConfigs(),

      // ... Place additional configs here if needed ...
    ]);
    ```

    > If you work in a monorepo, you may need to specify [`tsconfigRootDir`](https://typescript-eslint.io/packages/parser/#tsconfigrootdir) for some rules to work correctly:
    >
    > ```diff
    > - generateBaseConfigs();
    > + generateBaseConfigs({ tsconfigRootDir: import.meta.dirname });
    > ```

    > If you use TailwindCSS, you can specify `tailwindcssEntryPoint` to enable rules from [`eslint-plugin-better-tailwindcss`](https://www.npmjs.com/package/eslint-plugin-better-tailwindcss).
    > Class names are checked both in TSX attributes and in `@apply` directives inside `*.css` files (via [`@eslint/css`](https://www.npmjs.com/package/@eslint/css) and [`tailwind-csstree`](https://www.npmjs.com/package/tailwind-csstree)):
    >
    > ```diff
    > - generateBaseConfigs();
    > + generateBaseConfigs({ tailwindcssEntryPoint: 'path/to/global.css' });
    > ```

1.  Add `package.json` scripts:

    ```json
    {
      "...": "...",
      "scripts": {
        "...": "...",
        "fix:eslint": "eslint --max-warnings=0 --fix",
        "...": "...",
        "lint:eslint": "eslint --max-warnings=0",
        "...": "..."
      }
    }
    ```

You can now run `[npm/pnpm/yarn] run fix:eslint` to lint your code and `[npm/pnpm/yarn] run lint:eslint` to fix linting errors.

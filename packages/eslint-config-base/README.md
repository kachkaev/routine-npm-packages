# [@kachkaev](https://github.com/kachkaev) → eslint config (base)

A collection of carefully picked ESLint rules and plugins for TypeScript projects.

Compatible with [ESLint](https://www.npmjs.com/package/eslint) v10+ (Flat config).
Requires [TypeScript](https://www.npmjs.com/package/typescript) to be present as a dependency.

See also [@kachkaev/eslint-config-next](https://www.npmjs.com/package/@kachkaev/eslint-config-next).

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

1.  Create `eslint.config.ts` with the following contents:

    ```ts
    import { generateBaseConfigs } from "@kachkaev/eslint-config-base";

    export default generateBaseConfigs();
    ```

    > To add project-specific configs, wrap the result in [`defineConfig`](https://eslint.org/docs/latest/use/configure/configuration-files#configuration-file) from ESLint.
    > The generated configs are scoped to `*.ts` and `*.tsx` files, so configs for other languages can be added alongside:
    >
    > ```ts
    > import { generateBaseConfigs } from "@kachkaev/eslint-config-base";
    > import { defineConfig } from "eslint/config";
    >
    > export default defineConfig([
    >   generateBaseConfigs(),
    >   {
    >     rules: {
    >       "no-console": "off",
    >     },
    >   },
    > ]);
    > ```

    > If you work in a monorepo, you may need to specify [`tsconfigRootDir`](https://typescript-eslint.io/packages/parser/#tsconfigrootdir) for some rules to work correctly:
    >
    > ```diff
    > - generateBaseConfigs();
    > + generateBaseConfigs({ tsconfigRootDir: import.meta.dirname });
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

You can now run `[npm/pnpm/yarn] run lint:eslint` to lint your code and `[npm/pnpm/yarn] run fix:eslint` to fix linting errors.

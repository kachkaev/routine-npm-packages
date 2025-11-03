# [@kachkaev](https://github.com/kachkaev) → eslint config (base)

A collection of carefully picked ESLint rules and plugins for TypeScript projects.

Compatible with [ESLint](https://www.npmjs.com/package/eslint) v9+ (Flat config).
Requires [TypeScript](https://www.npmjs.com/package/typescript) to be present as a dependency.

See also [@kachkaev/eslint-config-react](https://www.npmjs.com/package/@kachkaev/eslint-config-react).

## Principles

This configuration uses warnings for rules that are related to code style (the ones that are not likely to prevent runtime errors), and errors otherwise.
Both severity levels fail CI when `eslint` is called with `--max-warnings=0`.

## Adding to project

1.  Ensure your `package.json` contains `"type": "module"`.

1.  Ensure your project has a `tsconfig.json` file.

1.  Install these packages as dev dependencies:

    ```sh
    ## If you use NPM
    npm install -D jiti eslint @kachkaev/eslint-config-base
    
    ## If you use PNPM
    pnpm add -D jiti eslint @kachkaev/eslint-config-base
    
    ## If you use Yarn
    yarn add -D jiti eslint @kachkaev/eslint-config-base
    ```

    > `jiti` enables `*.ts` files -- see [ESLint docs](https://eslint.org/docs/latest/use/configure/configuration-files#typescript-configuration-files).

1.  Create `eslint.config.ts` with the following contents:

    ```js
    import { baseConfigObjects } from "@kachkaev/eslint-config-base";

    export default [
      ...baseConfigObjects,

      // ... add extra config objects here ...
    ];
    ```

1.  Add `package.json` scripts:

    ```json
    {
      "...": "...",
      "scripts": {
        "...": "...",
        "fix:eslint": "eslint --max-warnings=0 --fix .",
        "...": "...",
        "lint:eslint": "eslint --max-warnings=0 .",
        "...": "..."
      }
    }
    ```

You can now run `[npm/pnpm/yarn] run fix:eslint` to lint your code and `[npm/pnpm/yarn] run lint:eslint` to fix linting errors.

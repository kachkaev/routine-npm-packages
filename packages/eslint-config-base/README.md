# [@kachkaev](https://github.com/kachkaev) → eslint config (base)

Compatible with [ESLint](https://www.npmjs.com/package/eslint) v7.
Requires [TypeScript](https://www.npmjs.com/package/typescript) to be present as a dependency.

See also [@kachkaev/eslint-config-react](https://www.npmjs.com/package/@kachkaev/eslint-config-react).

## Adding to project

1.  Install the package:

    ```sh
    npm install -D @kachkaev/eslint-config-base
    ## or
    yarn add -D @kachkaev/eslint-config-base
    ```

1.  Create `.eslintrc.js` with the following contents:

    ```js
    module.exports = {
      extends: ["@kachkaev/eslint-config-base"],
    };
    ```

    If you want extra typechecking (`tsconfig.json` needs to exist in repo dir):

    ```js
    module.exports = {
      extends: [
        "@kachkaev/eslint-config-base",
        "@kachkaev/eslint-config-base/extra-type-checking",
      ],
    };
    ```

1.  Create `.eslintignore`.
    For example,

    ```ini
    #####################
    ## Specific to ESLint
    #####################
    
    ## Ignore all files (but still allow sub-folder scanning)
    *
    !*/
    
    ## Allow certain file types
    !*.cjs
    !*.cts
    !*.js
    !*.json
    !*.mjs
    !*.mts
    !*.ts
    
    ########################
    ## Same as in .gitignore
    ########################
    
    # (paste lines from .gitignore here)
    ```

1.  Optionally, configure package scripts and a [pre-commit hook](https://prettier.io/docs/en/precommit.html#__docusaurus) to make sure that all project files are always formatted.
    See example in [`njt` → `package.json`](https://github.com/kachkaev/njt/blob/master/package.json).

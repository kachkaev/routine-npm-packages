# [@kachkaev](https://github.com/kachkaev) → markdownlint config

Compatible with [markdownlint-cli](https://www.npmjs.com/package/markdownlint-cli) v0.23+.
To be used together with [`@kachkaev/prettier-config`](https://www.npmjs.com/package/@kachkaev/prettier-config).
See `index.json` for rule details.

## Adding to project

1.  Install the package:

```sh
npm install -D @kachkaev/markdownlint-config
## or
yarn add -D @kachkaev/markdownlint-config
```

1.  Create `.markdownlint.json` with the following contents:

```js
{
  "extends": "./node_modules/@kachkaev/markdownlint-config/index.json"
}

```

<!-- https://github.com/igorshubovych/markdownlint-cli/issues/97 -->

1.  Create `.markdownlintignore`.
    For example,

    ```ini
    ## extensions
    *.*
    !*.md
    !*.mdx
    
    ## same as in .gitignore
    # (paste lines from .gitignore here)
    ```

1.  Optionally, configure package scripts and a [pre-commit hook](https://prettier.io/docs/en/precommit.html#__docusaurus) to make sure that all project files are always formatted.
    See example in [`njt` → `package.json`](https://github.com/kachkaev/njt/blob/master/package.json).

# [@kachkaev](https://github.com/kachkaev) → prettier config

Works with [Prettier](https://www.npmjs.com/package/prettier) v2, Compatible with Yarn PnP ans well as Classic Yarn / NPM.
Uses default options, except for setting [`{ trailingComma: "all" }`](https://prettier.io/docs/en/options.html#trailing-commas).
Includes:

- [prettier-plugin-packagejson](https://www.npmjs.com/package/prettier-plugin-packagejson)
- [prettier-plugin-sh](https://www.npmjs.com/package/prettier-plugin-sh)

## Adding to project

1.  Install the package:

```sh
npm install -D @kachkaev/prettier-config
## or
yarn add -D @kachkaev/prettier-config
```

1.  Create `.prettierrc.js` with the following contents:

```js
module.exports = require("@kachkaev/prettier-config");
```

1.  Create `.prettierignore`.
    For example,

    ```ini
    ## extensions
    
    *.*
    Dockerfile
    LICENSE
    !*.css
    !*.graphql
    !*.js
    !*.json
    !*.md
    !*.ts
    !*.tsx
    !*.yml
    
    ## same as in .gitignore
    # (paste lines from .gitignore here)
    ```

1.  Optionally, configure package scripts and a [pre-commit hook](https://prettier.io/docs/en/precommit.html#__docusaurus) to make sure that all project files are always formatted.
    See example in [`njt` → `package.json`](https://github.com/kachkaev/njt/blob/master/package.json).

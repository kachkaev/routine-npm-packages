# React Inline JS

This package exports a React component you can use in your [Custom Next.js Document](https://nextjs.org/docs/advanced-features/custom-document).
It accepts a string with the JavaScript code and minifies it with [`terser`](https://www.npmjs.com/package/terser).
The result is memoised.

A common use case for the component would be the Google Analytics initialisation script the dark mode enabler – see [example repo](https://github.com/kachkaev/njt).

## Usage

```tsx
// pages/_document.js

import Document, { Html, Head, Main, NextScript } from "next/document";
import { InlineJs } from "@kachkaev/react-inline-js";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <InlineJs
            code={`
              // This code will be minified

              const message = "Hello world"
              console.log(message);
          `}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
```

Output for `InlineJs` component:

<!-- prettier-ignore -->
```html
<script>const message="Hello world";console.log(message);</script>
```

Note that using `<InlineJS />` is not allowed on the client, i.e. anywhere except `_document.js`.
To prevent accidental inclusion of `terser` in the client bundle, an error will be thrown.

It is not allowed to include `</script` in any part of your code as this may result a corrupt page.
If this string is

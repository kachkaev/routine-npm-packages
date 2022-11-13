// eslint-disable-next-line import/no-unresolved -- https://github.com/import-js/eslint-plugin-import/issues/2132
import mem from "mem";
import * as React from "react";
import { minify } from "terser";

const wrappedMinify = mem((rawCode: string): string => {
  const { code } = minify(rawCode);

  if (!code?.length) {
    throw new Error("Minified code is empty");
  }

  if (code.includes("</script")) {
    throw new Error(
      "Minified code contains </script, which may break the resulting page. Please rewrite your code to avoid this.",
    );
  }

  return code;
});

export const InlineJs: React.FunctionComponent<{
  code: string;
}> = ({ code }) => {
  if (typeof window !== "undefined") {
    throw new TypeError(
      "<InlineJs /> is not meant to be used on the client side. Please see documentation.",
    );
  }

  // eslint-disable-next-line react/no-danger
  return <script dangerouslySetInnerHTML={{ __html: wrappedMinify(code) }} />;
};

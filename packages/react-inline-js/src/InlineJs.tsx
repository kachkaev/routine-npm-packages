import * as React from "react";
import mem from "mem";
import { minify, MinifyOutput } from "terser";
import deasync from "deasync";

const minifySync = deasync(minify) as (code: string) => MinifyOutput;

const wrappedMinify = mem((rawCode: string): string => {
  const minifyOutput = minifySync(rawCode);

  if (!minifyOutput.code?.length) {
    throw new Error("Minified code is empty");
  }

  if (minifyOutput.code.includes("</script")) {
    throw new Error(
      "Minified code contains </script, which may break the resulting page. Please rewrite your code to avoid this.",
    );
  }

  return minifyOutput.code;
});

export const InlineJs: React.FunctionComponent<{
  code: string;
  children?: never;
}> = ({ code }) => {
  if (typeof window !== "undefined") {
    throw new Error(
      "<InlineJs /> is not meant to be used on the client side. Please see documentation.",
    );
  }

  return <script dangerouslySetInnerHTML={{ __html: wrappedMinify(code) }} />;
};

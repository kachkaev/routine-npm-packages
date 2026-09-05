import type { KnipConfig } from "knip";

export default {
  workspaces: {
    "packages/eslint-config-next": {
      ignoreDependencies: [
        "react", // Needed by eslint-config-react to detect React version
      ],
    },
    "packages/markdownlint-config": {
      ignoreDependencies: [
        "markdownlint-cli", // Needed to be mentioned in devDependencies to avoid manypkg warning (INVALID_DEV_AND_PEER_DEPENDENCY_RELATIONSHIP)
      ],
    },
  },
} satisfies KnipConfig;

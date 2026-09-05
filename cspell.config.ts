import { defineConfig } from "cspell";

export default defineConfig({
  dictionaries: ["cspell-words.txt"],
  dictionaryDefinitions: [
    {
      name: "cspell-words.txt",
      path: "./cspell-words.txt",
      addWords: true,
    },
  ],
  ignorePaths: [
    // Ignored via .git/info/exclude rather than .gitignore, which CSpell does not read
    ".claude/worktrees/**",
    ".git/**",
    ".husky/_/**",
    "dist/**",
    "node_modules/**",
    "pnpm-lock.yaml",
  ],
  language: "en",
  minWordLength: 3,
  useGitignore: true,
});

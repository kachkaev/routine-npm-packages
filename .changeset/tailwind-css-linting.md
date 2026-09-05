---
"@kachkaev/eslint-config-base": minor
"@kachkaev/eslint-config-next": minor
---

Scope all generated config blocks to `**/*.{ts,tsx}` (via `defineConfig` + `extends`), so that configs for other languages can be added alongside without JavaScript rules crashing on them. When `tailwindcssEntryPoint` is set, `@kachkaev/eslint-config-next` now also lints Tailwind classes in `@apply` directives inside `*.css` files

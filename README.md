# bitsoftex-web

MOTA ĐApp Framework ₡ore (SvelteKit, Core Blockchain, multi-chain).

## Overview

- SvelteKit + MOTA stack
- Addon CLI: `node bin/addon.mjs <repo> <generator> <action>` (applies by default; --dry-run inspects)
- Hidden addon control files supported: `prompt.js`, plain `_scripts.sh`, `_config.ejs.json5` / `_config.json5`
- **i18n** – typesafe-i18n (see [Translations](#translations))
- **Agent skills** – [skills.sh](https://skills.sh/) (MOTA Skills)
- **Template** – `https://github.com/bchainhub/mota-dapp`
- `.editorconfig`
- `CODE_OF_CONDUCT.md`, `CONTRIBUTING.md`
- `.github/ISSUE_TEMPLATE`

## Run dev server

```bash
npm install
npm run dev
```

## Addons

Inspect an addon without running its code or modifying this project:

```sh
node bin/addon.mjs owner/repo generator install --dry-run
```

Applying is the default. To apply directly to this project:

```sh
node bin/addon.mjs owner/repo generator install --answers '{"route":"account"}'
```

--dry-run performs static inspection only. --apply is an optional explicit alias for the default applying behavior; --commit SHA optionally pins the source. Without --commit, the selected repository ref or HEAD is resolved on each invocation. EJS generation is executable code. Prompts, plain hidden scripts, raw expressions, declared packages and lifecycle scripts require their respective --allow-* flags. Shell EJS interpolation and template shell/setup hooks are rejected. Runner-managed destinations are checked for traversal, symlinks and protected paths before writes.

Declare exact npm packages and migration command/argument arrays in the action's addon.json. Migration execution is a separate --run-migrations --migrations-only --migration-target NAME invocation (with optional --commit SHA or --dry-run), with no generation or install stages. DB credentials belong in server secrets, not the target name or client config. Generation does not automatically run migrations or translation tooling; review changes and then run the project's i18n:extract script when needed.

Code explicitly permitted to run retains host permissions; stage controls are not a sandbox. The resolved commit is reported; --commit optionally pins it, and source caches live outside the project keyed by repository/commit. See the [starter addon guide](https://github.com/bchainhub/dapp-starter#addon-cli) for flags, the manifest schema and older-addon migration steps.

## Resources

- [📦 MOTA addons search](https://github.com/topics/mota-addon)
- [📖 MOTA skills search](https://skills.sh)

## Translations

i18n is provided by **typesafe-i18n**.

- `npm run i18n:extract` – extract strings from the project
- `npm run i18n:watch` – watch and update translations

## License

CORE. See [LICENSE](LICENSE) in the repo root.

# AGENTS.md — Myelektra Platform

## Repo Overview

pnpm monorepo. Only `apps/website` is a real application; all other `apps/*` dirs are empty stubs. `packages/*` dirs contain only `package.json` (no `src/` yet). `legacy/` is read-only migration source.

## Commands

All root scripts delegate to Turbo:

```bash
pnpm install          # install all workspace deps
pnpm dev              # turbo run dev (website dev server)
pnpm build            # turbo run build
pnpm lint             # turbo run lint
pnpm typecheck        # turbo run typecheck
pnpm test             # turbo run test
pnpm clean            # turbo run clean
pnpm format           # prettier --write
pnpm format:check     # prettier --check
```

### Website app (`apps/website`)

```bash
cd apps/website
pnpm dev              # tinacms dev -c "astro dev" (port 3000)
pnpm build            # astro build (SSR for Cloudflare Workers)
pnpm build:local      # tinacms build && astro build (generates TinaCMS client first)
pnpm preview          # astro preview
pnpm lint             # eslint . --ext .ts,.tsx
pnpm typecheck        # tsc --noEmit
pnpm test             # vitest run
pnpm test:watch       # vitest
pnpm clean            # rm -rf dist .turbo
```

**Single package:** `pnpm --filter @myelektra/website <script>`

## Build / CI Order

CI runs lint → typecheck → test → build. Turborepo enforces `dependsOn: ["^build"]` for lint and typecheck.

## Architecture

- **Framework:** Astro 5 (SSR, output `server`) with `@astrojs/cloudflare` adapter
- **CMS:** TinaCMS (Git-based content editing). Schema in `tina/config.ts`, generated client in `tina/__generated__/client`
- **Content:** Astro Content Collections (`src/content.config.ts`). Collections live in `apps/website/content/` — pages (mdx), solutions (md), industries (md), why-myelektra (md), client-logos (md), countries (md), navigation/global/brand/footer (json)
- **Styling:** Tailwind CSS v4 via `@tailwindcss/vite`
- **Deploy:** Cloudflare Workers/Pages. `wrangler.toml` at `apps/website/wrangler.toml`
- **Routing:** file-based (Astro pages in `src/pages/`)

## Environment

- `.env.local` at repo root is gitignored (global env)
- `apps/website/.env` is gitignored (local dev). Copy from `.env.example`
- `TINA_CLIENT_ID` is safe to commit (in `wrangler.toml`). `TINA_TOKEN` must be set as a Cloudflare secret: `wrangler secret put TINA_TOKEN`
- `PUBLIC_SITE_URL` and `PUBLIC_GA_ID` are prefixed `PUBLIC_` so they're exposed to the client

## Legacy App

`legacy/website-react-vite/` is the old React+Vite+Weebly theme app. **Read-only.** Do not implement new features here. Reference only during migration.

## Deployment Flow

1. CI builds `apps/website` with `TINA_CLIENT_ID` and `TINA_TOKEN` from GitHub secrets
2. `pnpm --filter @myelektra/website build` produces `apps/website/dist/`
3. Deploy via `wrangler pages deploy dist/` (or `cloudflare/wrangler-action` in CI)
4. Staging: `develop` branch → `myelektra-staging` project. Production: `main` → `myelektra` project

## Style

- Prettier config at root `.prettierrc` (semicolons, single quotes, 2-space indent, 100 char width)
- TypeScript strict mode via `tsconfig.base.json`
- No ESLint config file found — uses defaults from `@typescript-eslint`

## Key Gotchas

- Pages use a try/catch pattern: query TinaCMS client, fall back to static data if the query fails (e.g. no `TINA_TOKEN` locally)
- `tinacms dev` must wrap `astro dev` for live content editing
- Content collections must match the schema in both `src/content.config.ts` and `tina/config.ts`
- Astro output is `server` (SSR), not static — required for TinaCMS dynamic editing

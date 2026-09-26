# woof-app

React frontend for browsing dog breeds — search, image galleries, breed descriptions.

Live: https://app.mgrzmil.dev/

## Functionality

- Search breeds with autocomplete
- Browse full breed listing
- View breed details, sub-breeds, and image gallery
- View random dog images
- Read breed descriptions (English / Polish)
- Toggle dark/light theme
- Toggle language (EN/PL)
- In-app Readme page describing the project

## Structure

```
woof-app/
├── src/
│   ├── modules/     # Feature pages (DogDetails, DogSearch, Listing, ...)
│   ├── components/  # Reusable components
│   ├── layout/      # Header, Navbar, page wrappers
│   ├── router/      # Route definitions
│   ├── hooks/       # Custom hooks (data fetching, theme, etc.)
│   ├── api/         # generated dog-api client (bun run api:generate)
│   ├── common/      # i18next, queryClient
│   └── types.ts
├── package.json
└── .env             # VITE_DOG_API_URL
```

## Local

```bash
bun install
bun run dev      # http://localhost:5173
```

## Commands

```bash
bun run dev          # Dev server with HMR
bun run build         # Typecheck + production build
bun run preview       # Preview production build
bun run typecheck    # tsc --noEmit
bun run lint           # Biome lint
bun run format        # Biome format
```

## Stack

React 19, TypeScript, Vite, Tailwind CSS, React Query, react-i18next (en/pl), Biome.

## API

Depends on [dog-api](https://github.com/g-marcin/dog-api) (`VITE_DOG_API_URL`) for breeds, images, and descriptions. dog-api's OpenAPI schema is published as `@mgrzmil-org/api-types`; `bun run api:generate` turns it into a typed axios client and React Query options in `src/api/generated` (one function per endpoint, e.g. `breedImages`, `breedImagesOptions`). The frontend never hand-writes URLs or response shapes, so a backend contract change surfaces as a compile error here instead of a runtime bug.

woof-app is the client in a larger multi-service system (dog-api, image-resizer, Postgres) — see [mgrzmil.dev](https://mgrzmil.dev) for the full architecture.

## Technical Decisions

- **Contract-first API types** — generated from dog-api's OpenAPI schema instead of hand-written, to keep the two repos from drifting apart silently.
- **yalc for local type iteration** — `dog-api/scripts/dev_push_types.sh` + `bun run api-types:link` lets a contract change be tried out here before publishing to npm.
- **Biome over ESLint + Prettier** — one tool, one config, faster.
- **Bun over npm** — faster installs and scripts for a project this size.

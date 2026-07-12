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
│   ├── queries/     # React Query hooks
│   ├── common/      # httpClient, i18next, queryClient
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

Depends on [dog-api](https://github.com/g-marcin/dog-api) (`VITE_DOG_API_URL`) for breeds, images, and descriptions.

## API Types

Response types are generated from dog-api's OpenAPI schema and published as `@mgrzmil-org/api-types`. See `dog-api/scripts/dev_push_types.sh` for the local dev loop (yalc) instead of publishing on every change.

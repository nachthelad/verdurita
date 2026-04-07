# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

**Verdurita** is a Next.js PWA (Pages Router) that shows real-time Argentine currency exchange rates (USD blue, official, BRL, EUR). It fetches from `dolarapi.com` and `bluelytics.com.ar`, proxies data through `/api/currencies`, and displays it with filtering and currency conversion.

## Commands

```bash
npm run dev          # Start dev server (uses webpack, not Turbopack)
npm run build        # Production build
npm run lint         # ESLint
npm run lint:fix     # ESLint with auto-fix
npm run format       # Prettier write
npm run format:check # Prettier check
npm test             # Jest (all tests)
npm run test:watch   # Jest watch mode
npm run test:coverage # Jest with coverage
npm run analyze      # Bundle analyzer (sets ANALYZE=true)
```

To run a single test file:

```bash
npx jest path/to/__tests__/file.test.ts
```

## Architecture

**Pages Router** (not App Router). Entry: `pages/index.tsx` → `Layout` → `MainContainer`.

### Data flow

1. `hooks/useCurrencies.ts` — SWR hook polling `/api/currencies` every 30s with exponential backoff retry.
2. `pages/api/currencies.ts` — Fetches from 3 external APIs in parallel, normalizes + sorts by `ordenMonedas`, applies rate limiting (`utils/rateLimit.ts`), sets 60s cache headers.
3. `constants/defaultResults.ts` — Fallback data shown before first fetch.

### Key directories

- `core/components/` — All UI components (CardItem, Layout, MainContainer, CurrencyModal, InternationalCalculator, etc.)
- `hooks/` — Custom React hooks (`useCurrencies`, `useDarkMode`, `useInternationalRates`, `useUserPreferences`)
- `contexts/ThemeContext.tsx` — MUI dark/light theme toggle, persisted in localStorage (default: dark)
- `theme/theme.ts` — MUI `lightTheme` / `darkTheme` objects
- `types/moneda.ts` — `Moneda` type: `{ moneda, nombre, casa, venta?, compra?, promedio? }`
- `constants/index.ts` — `API_URLS`, `SITE_CONFIG`, `EXTERNAL_LINKS`, `CURRENCY_MAPPINGS`, `ADSENSE_CONFIG`
- `utils/rateLimit.ts` — In-memory rate limiter (60 req/min per IP) used in API routes

### Styling

MUI v5 + Emotion + styled-components. Theme accessed via `useThemeMode()` from `ThemeContext`. Do not add inline styles — use MUI's `sx` prop or styled-components.

### PWA

Configured via `@ducanh2912/next-pwa` in `next.config.js`. Service worker files are generated into `public/` on build (`sw.js`, `workbox-*.js`) — these are gitignored.

## Code conventions

- Path alias `@/` maps to repo root (configured in `tsconfig.json` and `jest.config.js`).
- `@typescript-eslint/no-explicit-any` is a **warning** (not error) — avoid `any` but it won't block CI.
- `no-console` is a warning — use sparingly; `console.error` is acceptable in API error handlers.
- Husky pre-commit runs `lint-staged` (Prettier on staged files). Pre-push hook is **disabled**.
- Tests live in `__tests__/` subdirectories next to the code they test.
